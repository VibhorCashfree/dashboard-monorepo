const fs = require('fs');
const path = require('path');
const snakeCase = require('lodash/snakeCase');

const STORE_PATH = path.join(__dirname, 'validationErrors.json');
const toKey = s => snakeCase((s || '').trim());

function loadStore() {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8') || '{}');
  } catch {
    return {};
  }
}
function saveStore(obj) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(obj, null, 2));
}

export default function transformer(file, api) {
  if (!/formValidation\.js$/.test(file.path)) {
    return file.source;
  }

  const j = api.jscodeshift;
  const root = j(file.source);

  const store = loadStore(); // { key: value }
  const valueToKey = new Map(Object.entries(store).map(([k, v]) => [v, k]));
  const pendingAdd = {}; // new entries to persist
  let changed = false;

  const isInsideTranslate = p => {
    const call = j(p)
      .closest(j.CallExpression)
      .nodes()[0];
    return !!(
      call &&
      call.callee?.type === 'Identifier' &&
      call.callee.name === 'translate'
    );
  };

  const ensureTranslateImport = () => {
    const has = root
      .find(j.ImportDeclaration, {
        source: { value: '@cashfree-intl/coherent' },
      })
      .some(imp =>
        (imp.value.specifiers || []).some(
          s => s.imported?.name === 'translate',
        ),
      );
    if (!has) {
      const decl = j.importDeclaration(
        [j.importSpecifier(j.identifier('translate'))],
        j.literal('@cashfree-intl/coherent'),
      );
      const first = root.find(j.ImportDeclaration).at(0);
      if (first.size()) {
        first.insertBefore(decl);
      } else {
        root.get().node.program.body.unshift(decl);
      }
    }
  };

  const wrapWithTranslate = (nodePath, raw) => {
    const str = raw.trim();
    if (str.length <= 3) {
      return;
    }
    if (valueToKey.has(str)) {
      return;
    } // skip existing entries
    const key = toKey(str);
    if (!store[key]) {
      pendingAdd[key] = str;
    }
    j(nodePath).replaceWith(
      j.callExpression(j.identifier('translate'), [j.literal(key)]),
    );
    changed = true;
  };

  // Plain string literals
  root.find(j.Literal).forEach(p => {
    const v = p.value?.value;
    if (typeof v !== 'string') {
      return;
    }
    const parent = p.parentPath?.value;
    if (parent?.type === 'ImportDeclaration') {
      return; // skip imports
    }
    if (isInsideTranslate(p)) {
      return; // already externalised
    }
    wrapWithTranslate(p, v);
  });

  // Template literals WITHOUT expressions (pure backtick strings)
  root
    .find(j.TemplateLiteral, { expressions: arr => arr.length === 0 })
    .forEach(p => {
      if (isInsideTranslate(p)) {
        return; // already externalised
      }
      const cooked = (p.value.quasis[0]?.value?.cooked || '').trim();
      if (!cooked) {
        return; // skip empty cooked strings
      }
      wrapWithTranslate(p, cooked);
    });

  if (changed) {
    ensureTranslateImport();
  }
  if (Object.keys(pendingAdd).length) {
    saveStore({ ...store, ...pendingAdd });
  }

  return changed ? root.toSource() : file.source;
}

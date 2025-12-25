const fs = require('fs');
const path = require('path');
const snakeCase = require('lodash/snakeCase');

const STORE_PATH = path.join(__dirname, 'validationErrors.json');

const toKey = str => snakeCase(str || '');

function loadStore() {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    return JSON.parse(raw || '{}'); // { key: value }
  } catch {
    return {};
  }
}

function saveStore(obj) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(obj, null, 2));
}

export default function transformer(file, api) {
  // Act only on formValidation.js
  if (!/formValidation\.js$/.test(file.path)) {
    return file.source;
  }

  const j = api.jscodeshift;
  const root = j(file.source);

  const store = loadStore(); // { key: value }
  const valueToKey = new Map(Object.entries(store).map(([k, v]) => [v, k]));
  const pendingAdd = {}; // new key -> value

  // Utility: is node already inside translate(...) call?
  const isInsideTranslate = p => {
    const call = j(p)
      .closest(j.CallExpression)
      .nodes()[0];
    if (!call) {
      return false; // no call found
    }
    // translate('key'), optionally with params
    return (
      call.callee &&
      call.callee.type === 'Identifier' &&
      call.callee.name === 'translate'
    );
  };

  // Utility: replace a literal node with translate('key')
  const makeTranslateCall = key =>
    j.callExpression(j.identifier('translate'), [j.literal(key)]);

  let changed = false;

  // 1) Plain string literals (not already inside translate(..))
  root.find(j.Literal).forEach(p => {
    const v = p.value && p.value.value;
    if (typeof v !== 'string') {
      return;
    }

    // Skip import strings, etc.
    const parent = p.parentPath && p.parentPath.value;
    if (parent && parent.type === 'ImportDeclaration') {
      return; // skip import strings
    }

    // Skip if already translate('...')
    if (isInsideTranslate(p)) {
      return; // already inside translate
    }

    const str = v.trim();
    if (str.length <= 3) {
      return; // ignore trivial
    }

    // If this exact string already exists in store, do not modify source
    if (valueToKey.has(str)) {
      return; // already exists in store
    }

    // Generate key, record to store if not present
    const key = toKey(str);
    if (!store[key]) {
      pendingAdd[key] = str;
    }

    j(p).replaceWith(makeTranslateCall(key));
    changed = true;
  });

  // 2) Template literals WITHOUT expressions (pure strings with backticks)
  root
    .find(j.TemplateLiteral, { expressions: exprs => exprs.length === 0 })
    .forEach(p => {
      // Skip if already inside translate(`...`)
      if (isInsideTranslate(p)) {
        return;
      }

      const cooked = (p.value.quasis[0]?.value?.cooked || '').trim();
      if (!cooked || cooked.length <= 3) {
        return;
      }

      if (valueToKey.has(cooked)) {
        return; // already exists in store
      }

      const key = toKey(cooked);
      if (!store[key]) {
        pendingAdd[key] = cooked;
      }

      j(p).replaceWith(makeTranslateCall(key));
      changed = true;
    });

  // Do NOT touch template literals with expressions, or `${translate('...')}`

  if (Object.keys(pendingAdd).length) {
    const merged = { ...store, ...pendingAdd };
    saveStore(merged);
  }

  return changed ? root.toSource() : file.source;
}

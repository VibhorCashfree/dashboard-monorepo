// ...existing code...
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// Custom error logging function
function logError(message) {
  fs.appendFileSync(path.join(SCRIPT_ROOT, 'error.log'), `${message}\n`);
}

const APP_ROOT = path.resolve(__dirname, '../app');
const SCRIPT_ROOT = path.resolve(__dirname);

// Canonicalize roots (resolve symlinks)
const CANON_APP_ROOT = fs.realpathSync.native(APP_ROOT);
const CANON_SCRIPT_ROOT = fs.realpathSync.native(SCRIPT_ROOT);

// Helper: ensure child is inside parent (after resolving symlinks)
function isRealPathInside(parent, child) {
  try {
    const parentReal = fs.realpathSync.native(parent);
    const childReal = fs.realpathSync.native(child);
    const rel = path.relative(parentReal, childReal);
    return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
  } catch {
    return false;
  }
}

function runTransformer(transformerPath, appFolderPath) {
  const validationFiles = [];

  function findValidationFiles(dir) {
    let absDir;
    try {
      absDir = fs.realpathSync.native(dir);
    } catch {
      return;
    }
    if (!isRealPathInside(CANON_APP_ROOT, absDir)) {
      return; // skip anything outside app root
    }

    let files;
    try {
      files = fs.readdirSync(absDir, { withFileTypes: true });
    } catch {
      return;
    }

    files.forEach(entry => {
      const entryPath = path.join(absDir, entry.name);

      // Never follow symlinks
      if (entry.isSymbolicLink?.()) {
        return;
      }

      if (entry.isDirectory?.()) {
        findValidationFiles(entryPath);
        return;
      }

      // Whitelist the exact filename
      if (entry.isFile?.() && entry.name === 'formValidation.js') {
        try {
          const real = fs.realpathSync.native(entryPath);
          if (isRealPathInside(CANON_APP_ROOT, real)) {
            validationFiles.push(real);
          }
        } catch {
          // skip unreadable paths
        }
      }
    });
  }

  findValidationFiles(appFolderPath);

  // Only allow transformers inside SCRIPT_ROOT
  let absTransformer;
  try {
    absTransformer = fs.realpathSync.native(path.resolve(transformerPath));
  } catch {
    throw new Error('Invalid transformer path');
  }
  if (!isRealPathInside(CANON_SCRIPT_ROOT, absTransformer)) {
    throw new Error('Invalid transformer path');
  }

  validationFiles.forEach(validationFile => {
    let absTarget;
    try {
      absTarget = fs.realpathSync.native(validationFile);
    } catch {
      return; // skip unreadable
    }

    if (!isRealPathInside(CANON_APP_ROOT, absTarget)) {
      return; // skip outside
    }

    try {
      execFileSync('npx', ['jscodeshift', '-t', absTransformer, absTarget], {
        stdio: 'inherit',
        cwd: CANON_SCRIPT_ROOT,
      });
    } catch (error) {
      logError(`Error processing ${absTarget}: ${error?.message || error}`);
    }
  });
}

const appFolderPath = CANON_APP_ROOT;

const createJsonFileTransformerPath = path.join(SCRIPT_ROOT, 'transformer.js');
runTransformer(createJsonFileTransformerPath, appFolderPath);

const replaceErrorStringsTransformerPath = path.join(
  SCRIPT_ROOT,
  'replaceStringsTransformer.js',
);
runTransformer(replaceErrorStringsTransformerPath, appFolderPath);

const consoleErrorJsonFileTransformerPath = path.join(
  SCRIPT_ROOT,
  'console.js',
);
runTransformer(consoleErrorJsonFileTransformerPath, appFolderPath);

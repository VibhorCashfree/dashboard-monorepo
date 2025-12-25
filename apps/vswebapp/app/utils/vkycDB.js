const DB_NAME = 'cashfreeVKYC';
const DB_VERSION = 1;
const QUESTIONS_STORE = 'securityQuestions';

// Initialize the database
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = event => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };

    request.onupgradeneeded = event => {
      const db = event.target.result;

      // Create an object store for security questions if it doesn't exist
      if (!db.objectStoreNames.contains(QUESTIONS_STORE)) {
        // Use id as keyPath to maintain unique identifiers
        db.createObjectStore(QUESTIONS_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };
  });
};

// Save security questions to IndexedDB
export const saveSecurityQuestions = async questions => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([QUESTIONS_STORE], 'readwrite');
      const store = transaction.objectStore(QUESTIONS_STORE);

      // Clear existing questions first
      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        // Add each question with its original ID, adding an explicit order property
        questions.forEach((question, index) => {
          // Ensure each question has a valid ID (including 0)
          const questionToStore = {
            ...question,
            // Only set ID if it's undefined - NEVER override existing IDs (even 0)
            id: question.id === undefined ? index : question.id,
            // Add explicit order property
            order: index,
          };
          store.put(questionToStore);
        });
      };

      transaction.oncomplete = () => {
        resolve(true);
      };

      transaction.onerror = event => {
        reject('Error saving questions: ' + event.target.error);
      };
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    return false;
  }
};

export const getSecurityQuestions = async () => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([QUESTIONS_STORE], 'readonly');
      const store = transaction.objectStore(QUESTIONS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const questions = request.result || [];

        // First sort by order if it exists, then by ID
        questions.sort((a, b) => {
          // If both questions have order, use that first
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          // Otherwise fall back to ID-based sorting
          return a.id - b.id;
        });

        resolve(questions);
      };

      request.onerror = event => {
        reject('Error retrieving questions: ' + event.target.error);
      };
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    return [];
  }
};

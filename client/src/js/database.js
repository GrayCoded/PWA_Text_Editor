import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'jate';

const initdb = async () => {
  try {
    const jateDb = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          console.log(`${DB_NAME} database already exists`);
          return;
        }
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log(`${DB_NAME} database created`);
      },
    });
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getAllFromDb = async () => {
  try {
    console.log(`Get all data from ${DB_NAME} database`);
    const jateDb = await openDB(DB_NAME, DB_VERSION);
    const tx = jateDb.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const allData = await store.getAll();
    console.log(`All data from ${DB_NAME} database:`, allData);
    return allData;
  } catch (error) {
    console.error('Error getting data from database:', error);
    throw error; // Propagate the error to the caller
  }
};

export const putDb = async (id, val) => {
  try {
    console.log(`Put data to ${DB_NAME} database`);
    const jateDb = await openDB(DB_NAME, DB_VERSION);
    const tx = jateDb.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    await store.put({ id: id, value: val });
    console.log(`Data successfully saved to ${DB_NAME} database`);
  } catch (error) {
    console.error('Error putting data into database:', error);
    throw error; // Propagate the error to the caller
  }
};

initdb();

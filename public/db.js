// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

// The basic pattern that IndexedDB encourages is the following:

// Open a database.
// Create an object store in the database. 
// Start a transaction and make a request to do some database operation, like adding or retrieving data.
// Wait for the operation to complete by listening to the right kind of DOM event.
// Do something with the results (which can be found on the request object).

const dbName = "budget"

const request = indexedDB.open(dbName, 1);



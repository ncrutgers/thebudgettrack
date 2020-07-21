let db;
// create a new db request for a budget database
const request = indexedDB.open("budgetDB", 1);
// onupgradeneeded create object store called "pending" and set autoIncrement to true
request.onupgradeneeded = function(event) {   
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};
// onsuccess save result to db and check if app is online before reading from database
request.onsuccess = function(event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};
// print errorCode if there is an error on db request
request.onerror = function(event) {
  console.log("Error! " + event.target.errorCode);
};
// saveRecord saves transaction to indexedDB by creading transaction on pending db with readwrite access, access object store, & add record to store
function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  store.add(record);
}
// checkDatabase checks for pending transactions, adds to object store, & gets all records from store
function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();
  // onsuccess get all results and send post request to route
  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      // Open a transaction on your "pending" db, access object store, and clear all items from store
      .then(() => {
        const transaction = db.transaction(["pending"], "readwrite");
        const store = transaction.objectStore("pending");
        store.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
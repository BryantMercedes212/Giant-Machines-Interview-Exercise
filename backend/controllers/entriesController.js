const express = require("express");

const {
  getAllEntries,
  getHours,
  getBillableAmount,
  getRowCount,
  createOne,
  getAllClients,
  getAllEntriesFromClient,
  getClientHours,
  getClientBillableAmount,
  getClientRowCount,
} = require("../queries/entries");

// Configuration
const entries = express.Router({ mergeParams: true });

// GET all entries
// entries.get("/", async (request, response) => {
// const hours = await getHours();
// const billableAmount = await getBillableAmount();
//   const allEntries = await getAllEntries();
//   response.status(200).json(allEntries, hours, billableAmount,);
// });

entries.get("/", async (request, response) => {
  //get the count of the rows from the DataBse
  const rowCount = await getRowCount();
  // setting default behavior for my queries
  let { start = 0, end = rowCount.count } = request.query;
  //get the total amount of hours in the DataBase
  const hours = await getHours();
  //get the total amount of billable hours in the DataBase
  const billableAmount = await getBillableAmount();
  //get 25 entries from start and end if given, if not get them all in the DataBase
  const allEntries = await getAllEntries(start, end);
  //get all different clients from the Database
  const allClients = await getAllClients();

  response
    .status(200)
    .json({ allEntries, hours, billableAmount, rowCount, allClients });
});

//Post request to create a new entry
entries.post("/", async (request, response) => {
  const newEntry = await createOne(request.body.entry);
  response.status(200).json(newEntry);
});

//Get request for specific clients information
entries.post("/client", async (request, response) => {
  //get the client count of the rows from the DataBse
  const clientRowCount = await getClientRowCount(request.body.client);

  let { start = 0, end = clientRowCount.count } = request.query;
  //get the total amount of hours for the client in the DataBase
  const clientHours = await getClientHours(request.body.client);
  //get the total amount of billable hours for that client in the DataBase
  const clientBillableAmount = await getClientBillableAmount(
    request.body.client
  );
  //get all the entries from that clients from the Database
  const allEntries = await getAllEntriesFromClient(
    request.body.client,
    start,
    end
  );
  //get all different clients from the Database
  const allClients = await getAllClients();

  response.status(200).json({
    allEntries,
    clientHours,
    clientBillableAmount,
    clientRowCount,
    allClients,
  });
});

//Export
module.exports = entries;

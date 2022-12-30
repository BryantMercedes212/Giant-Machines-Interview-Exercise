const express = require("express");

const {
  getAllEntries,
  getHours,
  getBillableAmount,
  getRowCount,
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
  const rowCount = await getRowCount();
  let { start = 0, end = rowCount.count } = request.query;
  const hours = await getHours();
  const billableAmount = await getBillableAmount();
  const allEntries = await getAllEntries(start, end);
  const allClients = await getAllClients();

  response
    .status(200)
    .json({ allEntries, hours, billableAmount, rowCount, allClients });
});

entries.post("/client", async (request, response) => {
  const clientRowCount = await getClientRowCount(request.body.client);
  let { start = 0, end = clientRowCount.count } = request.query;

  const clientHours = await getClientHours(request.body.client);
  const clientBillableAmount = await getClientBillableAmount(
    request.body.client
  );
  const allEntries = await getAllEntriesFromClient(
    request.body.client,
    start,
    end
  );
  response
    .status(200)
    .json({ allEntries, clientHours, clientBillableAmount, clientRowCount });
});

//Export
module.exports = entries;

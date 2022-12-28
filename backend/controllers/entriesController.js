const express = require("express");

const { getAllEntries } = require("../queries/entries");

// Configuration
const entries = express.Router({ mergeParams: true });

// GET all products buyer's view
entries.get("/", async (request, response) => {
  const allEntries = await getAllEntries();
  response.status(200).json(allEntries);
});

//Export
module.exports = entries;

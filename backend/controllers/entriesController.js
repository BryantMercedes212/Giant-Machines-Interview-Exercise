const express = require("express");

const { getAllEntries } = require("../queries/entries");

// Configuration
const entries = express.Router({ mergeParams: true });

// GET all entries
entries.get("/", async (request, response) => {
  const allEntries = await getAllEntries();
  response.status(200).json(allEntries);
});

//Export
module.exports = entries;

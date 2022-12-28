const db = require("../db/dbConfig.js");

const getAllEntries = async () => {
  try {
    const allEntries = await db.any("SELECT * FROM entries");
    return allEntries;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllEntries,
};

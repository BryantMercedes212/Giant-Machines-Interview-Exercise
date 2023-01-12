const db = require("../db/dbConfig.js");

const getAllEntries = async (start, end) => {
  try {
    const allEntries = await db.any(
      "SELECT * FROM entries LIMIT $1 OFFSET $2",
      [end - start, start]
    );
    return allEntries;
  } catch (error) {
    return error;
  }
};

const getHours = async () => {
  try {
    const hours = await db.one("SELECT SUM(hours) FROM entries");
    return hours;
  } catch (error) {
    return error;
  }
};

const getBillableAmount = async () => {
  try {
    const billableAmount = await db.one(
      "SELECT SUM(hours * billableRate) FROM entries WHERE billable = 'Yes' "
    );
    return billableAmount;
  } catch (error) {
    return error;
  }
};

const getRowCount = async () => {
  try {
    const rowCount = await db.one("SELECT COUNT(*) FROM entries");
    return rowCount;
  } catch (error) {
    return error;
  }
};

const createOne = async (entry) => {
  const splitedDate = entry.date.split("-");
  let formatedDate = ``;

  if (splitedDate[1][0] === "0") {
    formatedDate = `${splitedDate[1][1]}/`;
  } else {
    formatedDate = `${splitedDate[1]}/`;
  }

  if (splitedDate[2][0] === "0") {
    formatedDate += `${splitedDate[2][1]}/`;
  } else {
    formatedDate += `${splitedDate[2]}/`;
  }

  formatedDate += splitedDate[0].slice(2, 4);
  console.log(formatedDate, splitedDate, entry.date);
  try {
    let {
      client,
      project,
      projectCode,
      hours,
      billable,
      firstName,
      lastName,
      billableRate,
    } = entry;

    const newOne = await db.one(
      "INSERT INTO entries (date, client, project, projectCode, hours, billable, firstName, lastName ,billableRate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ",
      [
        formatedDate,
        client,
        project,
        projectCode,
        Number(hours),
        billable,
        firstName,
        lastName,
        Number(billableRate),
      ]
    );
    return newOne;
  } catch (error) {
    return error;
  }
};

const getAllClients = async () => {
  try {
    const allClients = await db.any("SELECT DISTINCT client FROM entries");
    return allClients;
  } catch (error) {
    return error;
  }
};

const getAllEntriesFromClient = async (client, start, end) => {
  try {
    const allEntriesFromClient = await db.any(
      "SELECT * FROM entries WHERE client=$1 LIMIT $2 OFFSET $3",
      [client, end - start, start]
    );
    return allEntriesFromClient;
  } catch (error) {
    return error;
  }
};

const getClientHours = async (client) => {
  try {
    const hours = await db.one(
      "SELECT SUM(hours) FROM entries WHERE client=$1 ",
      client
    );
    return hours;
  } catch (error) {
    return error;
  }
};

const getClientBillableAmount = async (client) => {
  try {
    const billableAmount = await db.one(
      "SELECT SUM(hours * billableRate) FROM entries WHERE  client=$1 AND billable = 'Yes'",
      client
    );
    return billableAmount;
  } catch (error) {
    return error;
  }
};

const getClientRowCount = async (client) => {
  try {
    const rowCount = await db.one(
      "SELECT COUNT(*) FROM entries WHERE client=$1",
      client
    );
    return rowCount;
  } catch (error) {
    return error;
  }
};
module.exports = {
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
};

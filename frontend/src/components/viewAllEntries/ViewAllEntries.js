import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewAllEntries.css";
import OneEntry from "../oneEntry/OneEntry";
import input from "../input/input";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Button,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ViewAllEntries() {
  const URL = process.env.REACT_APP_API_URL;
  const [allEntries, setAllEntries] = useState([]);
  const [hoursTracked, setHoursTracked] = useState(0);
  const [billableAmount, setBillableAmount] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(25);
  const navigate = useNavigate();
  const [lastPage, setLastPage] = useState(0);
  const [allClients, setAllClients] = useState([]);
  const selectsForAllClients = [];
  const [selectedClient, setSelectedClient] = useState("");
  const [hourError, setHourError] = useState(false);
  const [billableRateError, setBillableRateError] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: "",
    client: "",
    project: "",
    projectCode: "",
    hours: "",
    billable: "",
    firstName: "",
    lastName: "",
    billableRate: "",
  });
  const [addNew, setAddNew] = useState(false);

  //initial fetch to get all of the entries and information to run the project
  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${URL}/entries?start=${start}&end=${end}`);
      navigate(`/entries?start=${start}&end=${end}`);
      setAllEntries(res.data.allEntries);
      setHoursTracked(res.data.hours.sum);
      setBillableAmount(res.data.billableAmount.sum);
      setLastPage(res.data.rowCount.count);
      setAllClients(res.data.allClients);
    } catch (error) {
      console.log(error);
      setAllEntries([]);
    }
  };

  // if a filter is picked fetch to get all
  // of the entries and information to run the project

  const fetchClientEntries = async () => {
    try {
      axios
        .post(`${URL}/entries/client?start=${start}&end=${end}`, {
          client: selectedClient,
        })
        .then((res) => {
          navigate(`/entries?start=${start}&end=${end}`);
          setAllEntries(res.data.allEntries);
          setHoursTracked(res.data.clientHours.sum);
          setBillableAmount(res.data.clientBillableAmount.sum);
          setLastPage(res.data.clientRowCount.count);
          setAllClients(res.data.allClients);
        });
    } catch (error) {
      console.log(error);
      setAllEntries([]);
    }
  };

  //Post request to create a new entry
  const createNewEntry = async () => {
    const {
      date,
      client,
      project,
      projectCode,
      hours,
      billable,
      firstName,
      lastName,
    } = newEntry;

    //making sure that all the information thats needed to create a new entry is filled in
    if (
      client === "" ||
      project === "" ||
      projectCode === "" ||
      hours === "" ||
      billable === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      alert(
        "All required fields must filled in before trying to create a new Entry "
      );
    } else {
      axios.post(`${URL}/entries`, { entry: newEntry }).then(() => {
        setNewEntry({
          date: "",
          client: "",
          project: "",
          projectCode: "",
          hours: "",
          billable: "",
          firstName: "",
          lastName: "",
          billableRate: "",
        });

        setAddNew(false);
      });
    }
  };

  for (let client of allClients) {
    selectsForAllClients.push(
      <MenuItem value={client.client}>{client.client}</MenuItem>
    );
  }

  const handleFilterChange = (evt) => {
    setSelectedClient(evt.target.value);
  };

  useEffect(() => {
    if (selectedClient.length !== 0) {
      fetchClientEntries();
    } else {
      fetchEntries();
    }
  }, [end, selectedClient, addNew]);

  const handlePageChange = (event, value) => {
    if (value === 1) {
      setStart(0);
      setEnd(25);
    } else {
      setStart(value * 25 - 25);
      setEnd(value * 25);
    }
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    //making sure that only numbers are allowed in the hours input box
    if (name === "hours" && !/^[1-9][\.\d]*(,\d+)?$/.test(value)) {
      if (newEntry.hours.length === 1) {
        setNewEntry({
          ...newEntry,
          [name]: "",
        });
        setHourError(false);
      } else {
        setHourError(true);
      }
    } else if (
      //making sure that only numbers are allowed in the billaBleRate input box
      name === "billableRate" &&
      !/^[1-9][\.\d]*(,\d+)?$/.test(value)
    ) {
      if (newEntry.billableRate.length === 1) {
        setNewEntry({
          ...newEntry,
          [name]: "",
        });
        setBillableRateError(false);
      } else {
        setBillableRateError(true);
      }
    } else {
      //Input for hours is actually number removing my error
      if (name === "hours" && hourError) {
        setHourError(false);
      }
      //Input for billableRate is actually number removing my error
      if (name === "billableRate" && billableRateError) {
        setBillableRateError(false);
      }
      setNewEntry({
        ...newEntry,
        [name]: value,
      });
    }
  };

  return addNew ? (
    <div className="newEntryContainer">
      <div className="addNewEntryTitle"> Adding a New Entry</div>
      <div className="allInputs">
        <div className="date">
          <input type="date" name="date" onClick={handleInputChange}></input> *
        </div>

        {input("Client", "client", newEntry.client, handleInputChange)}
        {input("Project", "project", newEntry.project, handleInputChange)}
        {input(
          "Project Code",
          "projectCode",
          newEntry.projectCode,
          handleInputChange
        )}
        {input("Hours", "hours", newEntry.hours, handleInputChange, hourError)}
        <div className="billableContainer">
          <div className="billableTitle"> Billable? *</div>
          <div className="options">
            <div className="option">
              <input
                type="radio"
                class="checkbox-round"
                name="billable"
                onChange={handleInputChange}
                value={"Yes"}
              />
              Yes
            </div>
            <div className="option">
              <input
                type="radio"
                class="checkbox-round"
                name="billable"
                onChange={handleInputChange}
                value={"No"}
              />
              No
            </div>
          </div>
        </div>
        {input(
          "First Name",
          "firstName",
          newEntry.firstName,
          handleInputChange
        )}
        {input("Last Name", "lastName", newEntry.lastName, handleInputChange)}
        {newEntry.billable === "Yes" &&
          input(
            "Billable Rate",
            "billableRate",
            newEntry.billableRate,
            handleInputChange,
            billableRateError
          )}
      </div>

      <div className="buttons">
        {" "}
        <Button
          sx={{
            height: 50,
          }}
          variant="contained"
          size="large"
          color="error"
          onClick={() => setAddNew(!addNew)}
        >
          Exit Add A New Entry
        </Button>{" "}
        <Button
          sx={{
            height: 50,
          }}
          variant="contained"
          size="large"
          onClick={createNewEntry}
        >
          Add A New Entry
        </Button>
      </div>
    </div>
  ) : (
    <div className="allEntriesContainer">
      <div className="trackedAmounts">
        <div>
          <div className="trackedAmountsHeaders">Hours Tracked</div>
          <div className="trackedAmount">
            {Number(hoursTracked).toLocaleString()}
          </div>
        </div>
        <div>
          <div className="trackedAmountsHeaders">Billable Amount</div>
          <div className="trackedAmount">
            ${Number(billableAmount).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="tableHeadersContainer">
        <div className="adjustments">
          {" "}
          <Button
            sx={{
              height: 50,
            }}
            variant="contained"
            size="large"
            onClick={() => setAddNew(!addNew)}
          >
            Add A New Entry
          </Button>
          <label>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                <div className="state">Clients</div>
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                label="State j"
                name="state"
                value={selectedClient}
                onChange={handleFilterChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {selectsForAllClients}
              </Select>
            </FormControl>
          </label>
          <div className="pages">
            <Pagination
              count={Math.ceil(lastPage / 25)}
              size="large"
              onChange={handlePageChange}
            />
          </div>
        </div>
        <div className="tableHeaders">
          <div className="header">
            <div className="headerName left">Name</div>
          </div>
          <div className="header">
            <div className="headerName left ">Clients</div>
          </div>
          <div className="header">
            <div className="headerName right">Hours</div>
          </div>
          <div className="header">
            <div className="headerName right">Billable Hours</div>
          </div>
          <div className="header">
            <div className="headerName right">Billable Amount</div>
          </div>
        </div>
      </div>
      <div className="allEntries">
        {" "}
        {allEntries.map((entry) => {
          return <OneEntry entry={entry} />;
        })}{" "}
      </div>
    </div>
  );
}

export default ViewAllEntries;

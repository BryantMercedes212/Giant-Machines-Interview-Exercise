import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewAllEntries.css";
import OneEntry from "../oneEntry/OneEntry";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
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
        });
    } catch (error) {
      console.log(error);
      setAllEntries([]);
    }
  };

  for (let client of allClients) {
    selectsForAllClients.push(
      <MenuItem value={client.client}>{client.client}</MenuItem>
    );
  }

  const handleChange = (evt) => {
    setSelectedClient(evt.target.value);
  };

  useEffect(() => {
    if (selectedClient.length !== 0) {
      fetchClientEntries();
    } else {
      fetchEntries();
    }
  }, [end, selectedClient]);

  const handlePageChange = (event, value) => {
    if (value === 1) {
      setStart(0);
      setEnd(25);
    } else {
      setStart(value * 25 - 25);
      setEnd(value * 25);
    }
  };

  return (
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
                onChange={handleChange}
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

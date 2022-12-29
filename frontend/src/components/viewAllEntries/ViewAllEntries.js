import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewAllEntries.css";
import OneEntry from "../oneEntry/OneEntry";

function ViewAllEntries() {
  const URL = process.env.REACT_APP_API_URL;
  const [allEntries, setAllEntries] = useState([]);
  const [hoursTracked, setHoursTracked] = useState(0);
  const [billableAmount, setBillableAmount] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${URL}/entries`);
      setAllEntries(res.data);
    } catch (error) {
      console.log(error);
      setAllEntries([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="allEntriesContainer">
      <div className="trackedAmounts">
        <div>
          <div className="trackedAmountsHeaders">Hours Tracked</div>
          <div className="trackedAmount">xxx.00</div>
        </div>
        <div>
          <div className="trackedAmountsHeaders">Billable Amount</div>
          <div className="trackedAmount">xxx.00</div>
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

      <div className="allEntries">
        {" "}
        {allEntries.map((entry) => {
          return (
            <OneEntry
              entry={entry}
              hoursTracked={hoursTracked}
              setHoursTracked={setHoursTracked}
              billableAmount={billableAmount}
              setBillableAmount={setBillableAmount}
            />
          );
        })}{" "}
      </div>
    </div>
  );
}

export default ViewAllEntries;

import React from "react";
import "./OneEntry.css";

function OneEntry({
  entry,
  hoursTracked,
  setHoursTracked,
  billableAmount,
  setBillableAmount,
}) {
  console.log(entry);
  const { project, client, hours, billable, billablerate } = entry;
  return (
    <div className="entry">
      <div className="entryInfo">
        <div className="name left blue"> {entry.project}</div>
      </div>
      <div className="entryInfo">
        <div className="blue left">{client}</div>
      </div>
      <div className="entryInfo">
        <div className="blue right">{hours}</div>
      </div>
      <div className="entryInfo">
        <div className=" right">
          {billable === "Yes" ? `${hours} (100%)` : "0.00 (0%)"}
        </div>
      </div>
      <div className="entryInfo">
        <div className=" right">
          {" "}
          {billable === "Yes"
            ? `$${(Number(hours) * Number(billablerate)).toFixed(2)}`
            : "-"}
        </div>
      </div>
    </div>
  );
}

export default OneEntry;

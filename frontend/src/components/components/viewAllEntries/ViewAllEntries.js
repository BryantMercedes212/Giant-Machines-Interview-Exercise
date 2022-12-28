import { useState, useEffect } from "react";
import axios from "axios";

function ViewAllEntries() {
  const URL = process.env.REACT_APP_API_URL;
  const [allEntries, setAllEntries] = useState([]);
  return <div>ViewAllEntries</div>;
}

export default ViewAllEntries;

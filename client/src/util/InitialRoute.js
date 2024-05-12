import React from "react";
import axios from "axios";
async function InitialRoute() {
  const id = localStorage.getItem("id");
  let x = await axios.get(`http://localhost:8080/store/user/${id}`);
  console.log("asazsasasa", x);
}

export default InitialRoute;

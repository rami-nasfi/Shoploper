import React, { useState, useEffect, useContext } from "react";
import emailjs from "emailjs-com";
import axios from "axios";

import { useStoreID } from "../App";
import Team from "./Team";

const AddTeam = () => {
  const { storeID } = useContext(useStoreID);
  const [teams, setTeams] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeID: "",
  });
  async function userStore() {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_API}
/store/${storeID}`);
      setFormData({ ...formData, storeID: res.data.name }); // Update formData
    } catch (error) {
      console.error("Error fetching store data:", error);
      throw error;
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("firstformData", formData);
  };
  const generatePassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let generatedPassword = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setFormData({ ...formData, password: generatedPassword });
  };
  async function fetchTeams() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}
/user/store/${storeID}`);
      console.log("res.data.users", res.data.users);
      setTeams(res.data.users);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userStore();
      await signup(); // Wait for signup to finish
      await sendEmail(); // Wait for email sending to finish
      console.log("Form data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    fetchTeams();
  };

  const sendEmail = async () => {
    try {
      const emailResponse = await emailjs.send("service_6fh9lyr", "template_qjhwsi2", formData, "_zXp3UHlraCXBEQ1O");
      console.log("Email sent successfully:", emailResponse.status, emailResponse.text);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Propagate the error for better error handling
    }
  };

  const signup = async () => {
    try {
      const userData = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: "staff",
        storeID: storeID,
      };
      console.log("userData ddd", userData);
      console.log("dataaaaa", formData);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}
/user/signup`,
        userData
      );
      console.log("User signed up successfully:", res.data);
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error; // Propagate the error for better error handling
    }
  };
  useEffect(() => {
    generatePassword();
  }, []);
  useEffect(() => {
    if (storeID) {
      fetchTeams();
    }
  }, [storeID]);
  return (
    <div className="container ">
      <div className=" container d-flex flex-column w-100 border rounded p-4">
        <h3>Team</h3>
        <div className="mb-3">
          <form onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-6">
                <label>Name:</label>
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label>Email:</label>
                <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>
        </div>
        <Team fetchTeams={fetchTeams} teams={teams} />
      </div>
    </div>
  );
};

export default AddTeam;

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
      let res = await axios.get(`http://localhost:8080/store/${storeID}`);
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
      const res = await axios.get(`http://localhost:8080/user/store/${storeID}`);
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
      const res = await axios.post(`http://localhost:8080/user/signup`, userData);
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Send</button>
      </form>
      <Team fetchTeams={fetchTeams} teams={teams} />
    </>
  );
};

export default AddTeam;

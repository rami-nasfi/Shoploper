import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../config";
import { FaRegTrashCan } from "react-icons/fa6";
import { useStoreID } from "../App";
import Modal from "./Modal";

function Team({ fetchTeams, teams }) {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { storeID } = useContext(useStoreID);

  const dataModal = {
    msgModal: "Are you sure you want to delete this from the team?",
    titleModal: "Warning",
    colorModalBtn: "btn-danger",
    textModalBtn: "Delete",
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseURL}/user/${id}`);
      fetchTeams();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (storeID) {
      fetchTeams();
    }
  }, [storeID]);
  return (
    <div className=" ">
      <div className="border rounded p-2 ">
        <div className="container d-flex justify-content-center align-items-center  ">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col col-3">Name</th>
                <th scope="col col-3">Email</th>
                <th scope="col col-2" colSpan={2}>
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    There are no products available.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id}>
                    <td className="align-middle col-3">{team.name}</td>
                    <td className="align-middle">{team.email}</td>
                    <td className="align-middle">{team.role}</td>
                    <td className="align-middle text-center">
                      <div className="d-flex justify-content-evenly">
                        <a
                          href=""
                          className="d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setDeleteItemId(team._id)}
                        >
                          <FaRegTrashCan className="" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal dataModal={dataModal} action={() => handleDelete(deleteItemId)} />
    </div>
  );
}

export default Team;

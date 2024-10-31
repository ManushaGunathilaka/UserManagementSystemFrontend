import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setISEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:8080/api/v1/getusers")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Axios Error: ", error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };
    axios
      .post("http://localhost:8080/api/v1/adduser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setISEdit(false);
      })
      .catch((error) => {
        console.log("Axios Error: ", error);
      });
  };

  const updateUSer = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
    };
    axios
      .put("http://localhost:8080/api/v1/updateuser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setISEdit(false);
      })
      .catch((error) => {
        console.log("Axios Error: ", error);
      });
  };

  const deleteUser = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
    };
    axios
      .delete(`http://localhost:8080/api/v1/deleteuser/${data.id}`)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.log("Axios Error: ", error);
      });
  };

  return (
    <>
      <UserForm
        addUser={addUser}
        submitted={submitted}
        updateUser={updateUSer}
        data={selectedUser}
        isEdit={isEdit}
      />
      <UserTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setISEdit(true);
        }}
        deleteUser={(data) =>
          window.confirm("Are you sure") && deleteUser(data)
        }
      />
    </>
  );
};

export default Users;

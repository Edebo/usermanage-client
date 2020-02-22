import React, { useState, useEffect, useReducer } from "react";
import { getUsers } from "../../api/userApi";
import { Eclipse, Ball } from "react-loading-io";
import avatar from "../../images/avatar.png";
import { Link } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [connect, setConnect] = useState({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
  });

  const { isSuccess, isError, isLoading, message, redirect } = connect;
  const allUsers = () => {
    setConnect({ ...connect, isLoading: true, error: false });
    getUsers()
      .then(result => {
        console.log(result.data);
        const { status, users, message } = result.data;
        if (status === "success" && status !== undefined) {
          setConnect({
            ...connect,
            isLoading: false,
            error: false,
            isSuccess: true
          });

          setUsers(users);
        } else {
          setConnect({
            ...connect,
            isLoading: false,
            isError: true,
            isSuccess: false,
            message
          });
        }
      })
      .catch(err => {});
  };
  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className='container pt-3'>
      <h1>List of Users</h1>
      {isLoading ? (
        <div className='mt-5'>
          <Eclipse size={100} color={"orange"} />
        </div>
      ) : null}
      {isError ? (
        <div className='alert alert-danger'>
          {" "}
          Cannot get all User<Link>Refresh to load again</Link>
        </div>
      ) : null}
      <div className='row cards'>
        {users &&
          users.map((user, i) => {
            return (
              <div
                className='card-block h-100 col-md-3 py-1 m-2 single-card '
                key={i}
              >
                <img
                  className='card-img-top'
                  src={!user.profileImg ? avatar : useReducer.profileImg}
                  alt='user picture'
                />
                <div className='card-body bg-warning mt-2'>
                  <p className='card-text'>Email: {user.email}</p>
                  <p className='card-text'>username: {user.username}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Users;

import React, { useState } from "react";
import Layout from "../Layout";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eclipse, Ball } from "react-loading-io";
import { isAuth, authenticate } from "../../api/authApi";
import { editUser } from "../../api/userApi";
import { stat } from "fs";

// const FILE_SIZE = 1024 * 1024;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
// const editSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(3, "Username must be 3 characters at minimum")
//     .required("Username is required"),
//   profileImg: Yup.mixed()
//     .required("A file is required")
//     .test(
//       "fileSize",
//       "File too large",
//       value => value && value.size <= FILE_SIZE
//     )
//     .test(
//       "fileFormat",
//       "Unsupported Format",
//       value => value && SUPPORTED_FORMATS.includes(value.type)
//     )
// });
const Edit = () => {
  // let formData = new FormData();
  const { _id, email, profileImg, username, token } = isAuth();

  const [user, setUser] = useState({
    email,
    profileImg,
    username
  });

  const [connect, setConnect] = useState({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    redirect: false
  });
  const { isSuccess, isError, isLoading, message, redirect } = connect;

  const update = () => {
    setConnect({
      ...connect,
      isLoading: true,
      isError: false,
      isSuccess: false
    });
    editUser(user, _id, token)
      .then(result => {
        const { status, message, data } = result;
        console.log(result);
        if (status === "success" && status !== undefined) {
          authenticate(
            { username: data.username, token, email, profileImg, _id },
            () => {
              setConnect({
                ...connect,
                isSuccess: true,
                isLoading: false,
                isError: false
              });
              setTimeout(() => {
                setConnect({
                  ...connect,
                  isSuccess: false,
                  isLoading: false,
                  isError: false,
                  redirect: true
                });
              }, 2000);
            }
          );
        } else {
          setConnect({
            ...connect,
            isError: true,
            isLoading: false,
            isSuccess: false,
            message
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = nm => event => {
    const value =
      nm === "profileImg" ? event.target.files[0] : event.target.value;
    setUser({ ...user, [nm]: value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    update();
  };

  return (
    <Layout>
      <div className='container '>
        <div className='one my-5 mx-auto bg-light'>
          {isSuccess ? (
            <div className='alert alert-success' role='alert'>
              <span role='img' aria-label='happy face'>
                😊
              </span>{" "}
              Update successful
            </div>
          ) : null}
          {isError ? (
            <div className='alert alert-danger'> {message} </div>
          ) : null}

          {isLoading ? (
            <div className='mt-5'>
              <Eclipse size={100} color={"orange"} />
            </div>
          ) : null}

          {redirect ? <Redirect to='/' /> : null}

          <form className='mb-3'>
            <div className='signup-form container'>
              <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                  className='form-control'
                  type='email'
                  value={email}
                  readOnly
                />
              </div>
              <div className='form-group'>
                <label className='text-muted'>Username</label>
                <input
                  className='form-control'
                  type='text'
                  onChange={handleChange("username")}
                  placeholder={username}
                  required
                />
              </div>

              <button className='btn btn-outline-primary' onClick={clickSubmit}>
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;

{
  /* <div className='form-group'>
                <label className='btn btn-secondary'>
                  <input
                    className='form-control'
                    type='file'
                    name='profileImg'
                    onChange={handleChange("profileImg")}
                    accept='image/*'
                    required
                  />
                </label>
              </div> */
}

import React, { useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../Loader/Loader";
import { signin, authenticate } from "../../api/authApi";
import { Redirect } from "react-router-dom";

//   .matches(
//  /^(?=.{8,}$)(?=.?[a-z])(?=.?[A-Z])(?=.?[0-9])(?=.?\W).*$/,
//       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
// ),
const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Please Enter your password")
});
// component register
const Signin = () => {
  //set connection state
  const [connect, setConnect] = useState({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    redirect: false
  });
  //destructure connect
  const { isSuccess, isError, isLoading, message, redirect } = connect;
  //function to connect with signup function
  const register = user => {
    setConnect({ ...connect, isLoading: true, error: false });
    signin(user)
      .then(result => {
        let { status, data } = result.data;
        if (status !== undefined && status === "success") {
          authenticate(data, () => {
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
            }, 3000);
          });

          //show the signin is successful with a modal
        } else {
          setConnect({
            ...connect,
            isError: true,
            isLoading: false,
            isSuccess: false,
            message
          });
        }
        //<link href
      })
      .catch(error => {
        setConnect({
          ...connect,
          isError: true,
          isLoading: false,
          isSuccess: false,
          message
        });
      });
  };
  return (
    <Layout>
      {/* design */}
      <div className="container ">
        <div className="one my-5 mx-auto bg-light">
          {/* end of design */}
          {isSuccess ? (
            <div className="alert alert-success" role="alert">
              <span role="img" aria-label="happy face">
                😊
              </span>{" "}
              Signin successful
            </div>
          ) : null}
          {isError ? (
            <div className="alert alert-danger"> {message} </div>
          ) : null}

          {redirect ? <Redirect to="/" /> : null}

          <div className="signup-form container">
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={signinSchema}
              onSubmit={(values, { setSubmitting }) => {
                register(values);
                console.log(values);
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <h2 className="py-3">Create Account</h2>
                  <p className="lead">
                    It's free and hardly takes more than 30 seconds.
                  </p>

                  <div>
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-paper-plane"></i>
                        </span>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          className={`form-control ${
                            touched.email && errors.email ? "is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback ml-4"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-lock"></i>
                        </span>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          className={`form-control ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback ml-4"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="text-center py-4 ">
              Already have an account? <Link to="/signup">Signup here</Link>.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Signin;

import React, { Fragment, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../api/authApi";
import { deleteUser } from "../api/userApi";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [connect, setConnect] = useState({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
  });

  const { isSuccess, isError, isLoading, message, redirect } = connect;

  const logout = () => {
    signout(() => {
      window.location.reload(false);
      history.push("/");
    });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(false);
    setConnect({
      ...connect,
      isLoading: true,
      isError: false,
      isSuccess: false
    });

    deleteUser(isAuth()._id).then(result => {
      console.log(result);
      const { status, message } = result;

      if (status === "success" && status !== undefined) {
        setConnect({
          ...connect,
          isLoading: false,
          isError: false,
          isSuccess: true
        });
        logout();
      } else {
        setConnect({
          ...connect,
          isLoading: false,
          isError: true,
          isSuccess: false
        });
      }
    });
  };
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar className='nav'>
        <Link className='text-link' to='/'>
          Manage user
        </Link>
      </Navbar>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          {!isAuth() && (
            <Fragment>
              <Nav className='mx-1 nav'>
                <Link to='/signin' className='text-link'>
                  Signin
                </Link>
              </Nav>

              <Nav className='mx-1 nav'>
                <Link to='/signup' className='text-link'>
                  Signup
                </Link>
              </Nav>
            </Fragment>
          )}

          {isAuth() && (
            <Fragment>
              <div className='dropdown'>
                <button className='dropbtn mx-2'>
                  {isAuth()
                    .email.substring(0, 1)
                    .toUpperCase()}
                </button>
                <div className='dropdown-content'>
                  <Link to='/edit'>Edit profile</Link>
                  <div onClick={handleShow}>Delete Account</div>
                </div>
              </div>

              <Nav className='mx-1 nav'>
                <button className='btn btn-warning' onClick={logout}>
                  Logout
                </button>
              </Nav>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;

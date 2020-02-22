import { API } from "../config";
import axios from "axios";

export const signup = async data => {
  try {
    let response = await axios.post(`${API}/auth/signup`, data);
    return response;
  } catch (err) {
    alert(err);
  }
};

export const signin = async data => {
  try {
    let response = await axios.post(`${API}/auth/signin`, data);
    return response;
  } catch (err) {
    return err;
  }
};

export const signout = next => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/auth/signout`, {
      method: "GET"
    })
      .then(res => {
        console.log("signout", res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuth = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

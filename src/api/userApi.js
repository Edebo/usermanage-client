import { API } from "../config";
import axios from "axios";

const encodeFormData = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
export const getUsers = async () => {
  try {
    let response = await axios.get(`${API}/users/`);
    return response;
  } catch (err) {
    console.log(err);
  }
  // console.log(API);
  // fetch(`${API}/users/`)
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(myJson => {
  //     console.log(myJson);
  //   });
};

export const editUser = async (data, id, token) => {
  console.log(id);
  return fetch(`${API}/users/profile/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteUser = async id => {
  return fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${isAuth().token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
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

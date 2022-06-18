import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseURL";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const User = (user, dispatch) => {
  fetch(`${baseURL}importers/`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  logoutUser(dispatch);
};

export const getImporterProfile = (id) => {
  fetch(`${baseURL}importers/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  // AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    // payload: decoded,
    userProfile: user,
  };
};

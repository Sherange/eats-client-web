import axios from "axios";
import {
  SHOPS,
  SELECTED_SHOP,
  SELECTED_SHOP_FOODS,
  // SHOP_PHOTOS,
  USER_SHOPS,
  SHOP_REGISTRATION_SUCCESS,
  // SHOP_PHOTO_UPLOAD_SUCCESS,
  SHOP_REGISTRATION_ERROR,
  // SHOP_PHOTO_UPLOAD_ERROR,
  IS_FETCHING,
  DONE_FETCHING
} from "./types";

export const fetchShops = () => dispatch => {
  dispatch({ type: IS_FETCHING });
  return axios
    .get(process.env.REACT_APP_API_URL + "shop", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      dispatch({ type: SHOPS, payload: response.data.data });
      dispatch({ type: DONE_FETCHING });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING });
    });
};

export const getSelectedShop = data => dispatch => {
  dispatch({ type: IS_FETCHING });
  axios
    .get(process.env.REACT_APP_API_URL + "shop/" + data.id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      dispatch({ type: SELECTED_SHOP, payload: response.data.data });
      dispatch({ type: DONE_FETCHING });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING });
    });
};

export const getSelectedShopFoods = data => dispatch => {
  dispatch({ type: SELECTED_SHOP_FOODS, payload: "" });
  axios
    .get(process.env.REACT_APP_API_URL + "shop-foods/" + data.id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      dispatch({ type: SELECTED_SHOP_FOODS, payload: response.data.data });
    })
    .catch(error => {
      console.log("error", error);
    });
};

export const updateShop = data => dispatch => {
  return axios
    .put(process.env.REACT_APP_API_URL + "shop/" + data.id, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      if (response.data.error) {
        dispatch({
          type: SHOP_REGISTRATION_ERROR,
          payload: response.data.message
        });
      } else {
        dispatch(getUserShops());
        dispatch({
          type: SHOP_REGISTRATION_SUCCESS,
          payload: response.data.message
        });
      }
    })
    .catch(error => {
      dispatch({
        type: SHOP_REGISTRATION_ERROR,
        payload: error.response.data.message
      });
    });
};

export const deleteShop = id => dispatch => {
  return axios
    .delete(process.env.REACT_APP_API_URL + "shop/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      if (!response.data.error) {
        dispatch(getUserShops());
      }
    });
};

export const getUserShops = () => dispatch => {
  dispatch({ type: IS_FETCHING });
  axios
    .get(process.env.REACT_APP_API_URL + "user-shops", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      dispatch({ type: USER_SHOPS, payload: response.data.data });
      dispatch({ type: DONE_FETCHING });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING });
    });
};

export const registerShop = data => dispatch => {
  return axios
    .post(process.env.REACT_APP_API_URL + "shop", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.access_token
      }
    })
    .then(response => {
      if (response.data.error) {
        dispatch({
          type: SHOP_REGISTRATION_ERROR,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: SHOP_REGISTRATION_SUCCESS,
          payload: response.data.message
        });
      }
    })
    .catch(error => {
      if (error.response.data.error) {
        dispatch({
          type: SHOP_REGISTRATION_ERROR,
          payload: error.response.data.message
        });
      }
    });
};

export const uploadShopPhotos = (formData, id) => dispatch => {
  dispatch({ type: IS_FETCHING });
  return axios
    .post(process.env.REACT_APP_API_URL + "shop-photos", formData, {
      headers: {
        Authorization: localStorage.access_token,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      dispatch(getSelectedShop({ id: id }));
      dispatch({ type: DONE_FETCHING });
    })
    .catch(error => {
      dispatch({ type: DONE_FETCHING });
    });
};

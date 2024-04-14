import { HandlError } from "../components/Auth/HandlerError";
import axios from "axios";
import setAuthHeader from "../components/Auth/axiosUtils";
import Swal from "sweetalert2";

export const LOGIN_USER = "LOGIN_USER";
export const ISN_AUTH = "ISN_AUTH";
export const ALL_USERS = "ALL_USERS";
export const USER_BY_IDFY = " USER_BY_IDFY";
export const USER_BY_ID = "USER_BY_ID";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const ALL_CARS = "ALL_CARS";
export const CAR_PAT = "CAR_PAT";
export const CAR_BY_ID = "CAR_BY_ID";
export const ALL_SERVICES = "ALL_SERVICES";
export const SERV_BY_CAR = "SERV_BY_CAR";
export const SERV_BY_ID = "SERV_BY_ID";
export const ISMYCOMMERCE = "ISMYCOMMERCE";
export const POST_FAVORITES = "POSTFAV";
export const GET_ALL_TIPS = "GET_ALL_TIPS";
export const ALL_PROVINCES = "ALL_PROVINCES";
export const UPDATE_COMMERCE = "UPDATE_COMMERCE";

//?%%%%%%%%%%% commerce %%%%%%%%%%%%%%%%%%%%%%%%%%
export const isMyCommerce = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/commerce?active=true");
      return dispatch({
        type: ISMYCOMMERCE,
        payload: data[0],
      });
    } catch (error) {
      //si la petición falla enviar un objeto básico
      const dataError = {
        razonsocial: "...",
        fantasia: "Boscarol Hnos.",
        direccion: "...",
        ciudad: "...",
        telefono: "...",
        celular: "",
        email: "",
        instagram: "",
        facebook: "",
        otro: "",
        idProvince: 21,
        Province: {
          descProvince: "...",
        },
      };
      return dispatch({
        type: ISMYCOMMERCE,
        payload: dataError,
      });
    }
  };
};

export const updateCommerce = (idCommerce, updateData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch("/Commerce/" + idCommerce, updateData);
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos actualizados",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return dispatch({
        type: UPDATE_COMMERCE,
        payload: data,
      });
    } catch (error) {
      console.error("Error al actualizar Commerce (action updateCommerce)");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos actualizar el Comercio",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
};
//?%%%%%%%%%%% commerce end %%%%%%%%%%%%%%%%%%%%%%%%%%

//!%%%%%%%%%%% provinces  %%%%%%%%%%%%%%%%%%%%%%%%%%
export const getProvinces = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/province");
      return dispatch({ type: ALL_PROVINCES, payload: data });
    } catch (error) {
      console.error("Error al obtener las provincias (action getProvinces)");
      return dispatch({
        type: ALL_PROVINCES,
        payload: [{ idProvince: 0, descProvince: "Reload Please" }],
      });
    }
  };
};

//!%%%%%%%%%%% provinces end %%%%%%%%%%%%%%%%%%%%%%%%%%

//%%%%%%%%%%% post/tips/consejos %%%%%%%%%%%%%%%%%%%%%%%%%%
export const postFav = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/postfav?total=3");
      return dispatch({
        type: POST_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener los post Favoritos");
    }
  };
};

//%%%%%%%%%%% post/tips/consejos end %%%%%%%%%%%%%%%%%%%%%%%%%%

export const loginUser = (payload) => (dispatch) => {
  return dispatch({
    type: LOGIN_USER,
    payload: payload,
  });
};
export const isNotAuth = () => (dispatch) => {
  return dispatch({
    type: ISN_AUTH,
    payload: [],
  });
};
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const data = await axios("/user", setAuthHeader());
      return dispatch({
        type: ALL_USERS,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};
export const userBynumId = (numberId) => async (dispatch) => {
  try {
    const data = await axios(`/user?numberId=${numberId}`, setAuthHeader());
    return dispatch({
      type: USER_BY_IDFY,
      payload: data.data,
    });
  } catch (error) {
    HandlError(error);
  }
};
export const getById = (id) => async (dispatch) => {
  try {
    const data = await axios(`/user/${id}`, setAuthHeader());
    return dispatch({
      type: USER_BY_ID,
      payload: data.data,
    });
  } catch (error) {
    HandlError(error);
  }
};
export const cleanDetails = () => (dispatch) => {
  return dispatch({
    type: CLEAN_DETAILS,
    payload: [],
  });
};

//?%%%%%%%%%%% cars  %%%%%%%%%%%%%%%%%%%%%%%%%%

export const getAllCars = () => {
  return async (dispatch) => {
    try {
      const data = await axios("/car", setAuthHeader());
      return dispatch({
        type: ALL_CARS,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};

export const carById = (id) => async (dispatch) => {
  try {
    const data = await axios(`/car/${id}`, setAuthHeader());
    return dispatch({
      type: CAR_BY_ID,
      payload: data.data,
    });
  } catch (error) {
    HandlError(error);
  }
};

export const carByPat = (patent) => async (dispatch) => {
  try {
    const data = await axios(`/car?patent=${patent}`, setAuthHeader());
    return dispatch({
      type: CAR_PAT,
      payload: data.data,
    });
  } catch (error) {
    HandlError(error);
  }
};

export const getAllServices = () => {
  return async (dispatch) => {
    try {
      const data = await axios("/service", setAuthHeader());
      return dispatch({
        type: ALL_SERVICES,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};
export const getMyServices = (carId) => {
  return async (dispatch) => {
    try {
      const data = await axios(`/service?search=${carId}`, setAuthHeader());
      return dispatch({
        type: SERV_BY_CAR,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};
export const servicesById = (id) => async (dispatch) => {
  try {
    const myServ = await axios(`/service/${id}`);
    const data = myServ.data;
    return dispatch({
      type: SERV_BY_ID,
      payload: data,
    });
  } catch (error) {
    HandlError(error);
  }
};

/////get post

export const getAllTips = () => {
  return async (dispatch) => {
    try {
      const data = await axios("/postpublish");
      return dispatch({
        type: GET_ALL_TIPS,
        payload: data.data,
      });
    } catch (error) {
      HandlError(error);
    }
  };
};

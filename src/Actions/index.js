import axios from "axios";
import {
  ALL_LAUNCHES,
  START_PAGE,
  GET_MODAL,
  REMOVE_MODAL,
  SET_FILTER,
} from "../type";

//get all launches
export const getAllLaunches = () => async (dispatch) => {
  try {
    const res = await axios.get("https://api.spacexdata.com/v3/launches");

    dispatch({ type: ALL_LAUNCHES, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//get  launch by flight no
export const getLaunch = (no, orb) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.spacexdata.com/v3/launches?flight_number=${no}`
    );

    dispatch({ type: GET_MODAL, payload: { launches: res.data, orbit: orb } });
  } catch (error) {
    console.log(error);
  }
};

//remove modal
export const removemodal = () => {
  try {
    return { type: REMOVE_MODAL };
  } catch (error) {
    console.log(error);
  }
};

//set status
export const setStatus = (filter) => {
  try {
    return { type: SET_FILTER, payload: filter };
  } catch (error) {
    console.log(error);
  }
};

//start page
export const startpage = (start) => async (dispatch) => {
  try {
    dispatch({ type: START_PAGE, payload: start });
  } catch (error) {
    console.log(error);
  }
};

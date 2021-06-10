import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_CALENDARS,
  FETCH_CALENDAR,
  CREATE_CALENDAR,
  EDIT_CALENDAR,
  DELETE_CALENDAR,
} from "./types";

import history from "../history";
import calendars from "../apis/calendars";

export function signIn(userId, userName, signOut) {
  return {
    type: SIGN_IN,
    payload: { userId, userName, signOut },
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function fetchCalendars(callback) {
  return async function (dispatch) {
    const response = await calendars.get("/calendars");
    dispatch({ type: FETCH_CALENDARS, payload: response.data });
    if (callback) {
      callback(response);
    }
  };
}

export function fetchCalendar(id, callback) {
  return async function (dispatch) {
    const response = await calendars.get("/calendars/" + id);
    dispatch({ type: FETCH_CALENDAR, payload: response.data });
    if (callback) {
      callback(response);
    }
  };
}

export function createCalendar(formValues, callback) {
  return async function (dispatch, getState) {
    const { userId } = getState().auth;
    const response = await calendars.post("/calendars", {
      ...formValues,
      userId,
    });
    dispatch({ type: CREATE_CALENDAR, payload: response.data });
    if (callback) {
      callback(response);
    }

    history.push("/");
  };
}

export function updateCalendar(id, formValues, callback) {
  return async function (dispatch) {
    const response = await calendars.patch("/calendars/" + id, formValues);
    dispatch({ type: EDIT_CALENDAR, payload: response.data });
    if (callback) {
      callback(response);
    }

    history.push("/");
  };
}

export function deleteCalendar(id, callback) {
  return async function (dispatch) {
    const response = await calendars.delete("/calendars/" + id);
    dispatch({ type: DELETE_CALENDAR, payload: id });
    if (callback) {
      callback(response);
    }

    history.push("/");
  };
}

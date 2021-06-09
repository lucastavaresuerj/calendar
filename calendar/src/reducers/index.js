import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import calendarReducer from "./calendarReducer";

export default combineReducers({
  auth: authReducer,
  calendars: calendarReducer,
  form: formReducer,
});

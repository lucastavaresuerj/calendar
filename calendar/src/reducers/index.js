import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import calendarReducer from "./calendarReducer";
import atualCalendarReducer from "./atualCalendarReducer";

export default combineReducers({
  auth: authReducer,
  calendars: calendarReducer,
  atualCalendar: atualCalendarReducer,
  form: formReducer,
});

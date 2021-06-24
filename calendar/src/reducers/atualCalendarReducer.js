import {
  SELECT_ATUAL_CALENDAR,
  EDIT_ATUAL_CALENDAR,
  DESSELECT_ATUAL_CALENDAR,
} from "../actions/types";

export default function atualCalendarReducer(state = null, action) {
  switch (action.type) {
    case SELECT_ATUAL_CALENDAR:
      if (!action.payload.id) throw new Error("Not a calendar");
      return action.payload;
    case EDIT_ATUAL_CALENDAR:
      if (!state.id) throw new Error("Calendar not selected");
      return { ...state, ...action.payload };
    case DESSELECT_ATUAL_CALENDAR:
      return null;
    default:
      return state;
  }
}

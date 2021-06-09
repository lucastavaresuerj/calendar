import { FETCH_CALENDARS, FETCH_CALENDAR } from "../actions/types";

export default function calendarReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CALENDARS:
      const calendars = action.payload.reduce(
        (calendars, calendar) => ({ ...calendars, [calendar.id]: calendar }),
        {}
      );
      return { ...state, ...calendars };
    case FETCH_CALENDAR:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}

import React from "react";
import { connect } from "react-redux";

import { createCalendar } from "../../actions";

class CalendarCreate extends React.Component {
  render() {
    return <div>Create calendar</div>;
  }
}

export default connect(null, { createCalendar })(CalendarCreate);

import React from "react";
import { connect } from "react-redux";

import { fetchCalendar, updateCalendar } from "../../actions";

class CalendarEdit extends React.Component {
  componentDidMount() {
    if (!this.props.calendar) {
      this.props.fetchCalendar(this.props.match.params.id);
    }
  }

  render() {
    return <div>Edit calendar</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return { calendar: state.calendars[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchCalendar, updateCalendar })(
  CalendarEdit
);

import React from "react";
import { connect } from "react-redux";
import { Tab, Form } from "semantic-ui-react";

import BasicInformation from "./calendarForms/BasicInformation";
import {
  updateCalendar,
  selectAtualCalendar,
  editAtualCalendar,
  desselectAtualCalendar,
} from "../../actions";

class CalendarEdit extends React.Component {
  constructor(props) {
    super(props);

    this.onBasicSubmint = this.onBasicSubmint.bind(this);
  }

  componentDidMount() {
    this.props.selectAtualCalendar(this.props.calendar);
  }

  componentWillUnmount() {
    this.props.desselectAtualCalendar();
  }

  onBasicSubmint(formValues) {
    console.log("submit", formValues);
    Object.keys(formValues).length && this.props.editAtualCalendar(formValues);
  }

  render() {
    const { calendar } = this.props;
    return (
      <div className="calendar-edit">
        <BasicInformation calendar={calendar} onSubmit={this.onBasicSubmint} />
      </div>
    );
  }
}

/*
function mapStateToProps(state, ownProps) {
  return { calendar: state.calendars[ownProps.match.params.id] };
}
*/

export default connect(null, {
  updateCalendar,
  selectAtualCalendar,
  editAtualCalendar,
  desselectAtualCalendar,
})(CalendarEdit);

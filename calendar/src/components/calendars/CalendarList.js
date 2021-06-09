import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import { fetchCalendars } from "../../actions";
import CalendarCard from "./CalendarCard";

class CalendarList extends React.Component {
  componentDidMount() {
    this.props.fetchCalendars();
  }

  renderCalendars(calendars) {
    return calendars.map((calendar) => {
      return (
        <Grid.Column width={4} key={calendar.id}>
          <CalendarCard calendar={calendar} />
        </Grid.Column>
      );
    });
  }

  render() {
    return <Grid stackable>{this.renderCalendars(this.props.calendars)}</Grid>;
  }
}

function mapStateToProps(state) {
  return { calendars: Object.values(state.calendars) };
}

export default connect(mapStateToProps, { fetchCalendars })(CalendarList);

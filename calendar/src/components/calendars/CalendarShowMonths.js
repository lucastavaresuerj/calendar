import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Container, Button } from "semantic-ui-react";

import { fetchCalendar } from "../../actions";
import CalendarMonth from "./CalendarMonth";
import history from "../../history";
import { Lang } from "../lang";

class CalendarShow extends React.Component {
  renderMonths(rows, columns, months) {
    const gridRows = [];
    for (var r = 0; r < rows; r++) {
      const gridColumns = [];
      for (var c = 0; c < columns; c++) {
        const month = r * columns + c;
        gridColumns.push(
          <Grid.Column key={month}>
            <Link to={`${history.location.pathname}/${month}`}>
              <h2 className="month-name center">{months.full[month]}</h2>
            </Link>
            <CalendarMonth month={month} year={this.props.calendar.year} />
          </Grid.Column>
        );
      }
      gridRows.push(
        <Grid.Row key={r} columns={columns}>
          {gridColumns}
        </Grid.Row>
      );
    }
    return gridRows;
  }

  componentDidMount() {
    if (!this.props.calendar) {
      this.props.fetchCalendar(this.props.match.params.id);
    }
  }

  render() {
    const { calendar } = this.props;
    if (!calendar) {
      return <div>Loading...</div>;
    }
    return (
      <div className="calendar-months">
        <Lang>
          {({ months }) => {
            return (
              <Container>
                <Link to={`/calendars/edit/${calendar.id}`}>
                  <Button className="edit-button" floated="right">
                    edit
                  </Button>
                </Link>
                <h1 className="center">{calendar.year}</h1>
                <h2 className="center">{calendar.title}</h2>
                <Grid stackable>{this.renderMonths(4, 3, months)}</Grid>
              </Container>
            );
          }}
        </Lang>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { calendar: state.calendars[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchCalendar })(CalendarShow);

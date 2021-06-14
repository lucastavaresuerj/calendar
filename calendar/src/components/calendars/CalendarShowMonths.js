import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Card, Container, Button } from "semantic-ui-react";

import { fetchCalendar } from "../../actions";
import CalendarMonth from "./CalendarMonth";
import CalendarEdit from "./CalendarEdit";
import history from "../../history";
import { Lang } from "../lang";

class CalendarShowMonths extends React.Component {
  constructor(props) {
    super(props);

    this.state = { edit: false };
    this.renderEdit = this.renderEdit.bind(this);
  }

  renderMonths(rows, columns, months) {
    const gridRows = [];
    for (var r = 0; r < rows; r++) {
      const gridColumns = [];
      for (var c = 0; c < columns; c++) {
        const month = r * columns + c;
        gridColumns.push(
          <Grid.Column key={month}>
            <Card color="red">
              <Link to={`${history.location.pathname}/${month}`}>
                <h2 className="month-name center">{months.full[month]}</h2>
              </Link>
              <CalendarMonth month={month} year={this.calendar.year} />
            </Card>
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.edit !== prevState.edit) {
      this.calendar = this.state.edit
        ? this.props.calendarEdited
        : this.props.calendar;
    }
  }

  renderEdit() {
    return this.state.edit && <CalendarEdit calendar={this.props.calendar} />;
  }

  render() {
    this.calendar = this.props.calendar;
    if (!this.calendar) {
      return <div>Loading...</div>;
    }
    return (
      <div className="calendar-months">
        <Lang>
          {({ months }) => {
            return (
              <Container>
                <Button
                  className="edit-button"
                  floated="right"
                  onClick={() => this.setState({ edit: !this.state.edit })}
                >
                  Edit
                </Button>
                <br />
                {this.renderEdit()}
                <h1 className="center">{this.calendar.year}</h1>
                <h2 className="center">{this.calendar.title}</h2>
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
  return {
    calendar: state.calendars[ownProps.match.params.id],
    calendarEdited: state.atualCalendar,
  };
}

export default connect(mapStateToProps, { fetchCalendar })(CalendarShowMonths);

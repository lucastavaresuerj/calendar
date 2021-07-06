import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Card, Container, Button } from "semantic-ui-react";

import { fetchCalendar, selectAtualCalendar } from "../../actions";
import CalendarMonth from "./CalendarMonth";
import CalendarEdit from "./CalendarEdit";
import history from "../../history";
import { Lang } from "../lang";

class CalendarShowMonths extends React.Component {
  constructor(props) {
    super(props);

    this.state = { edit: false, calendar: null };
    this.renderEdit = this.renderEdit.bind(this);
    this.renderMonths = this.renderMonths.bind(this);
  }

  renderMonths(rows, columns, months) {
    const gridRows = [];
    for (var r = 0; r < rows; r++) {
      const gridColumns = [];
      for (var c = 0; c < columns; c++) {
        const month = r * columns + c;
        gridColumns.push(
          <Grid.Column key={month}>
            <Card
              fluid
              className="month-card"
              style={{
                backgroundColor: this.calendar.color.months[month].background,
              }}
            >
              <Link to={`${history.location.pathname}/${month}`}>
                <h2 className="month-name center">{months.full[month]}</h2>
              </Link>
              <CalendarMonth
                month={month}
                year={this.calendar.year}
                color={this.calendar.color.months[month].table}
              />
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
    if (this.state.edit !== prevState.edit && this.state.edit === true) {
      this.props.selectAtualCalendar(this.props.calendar);
    }
  }

  renderEdit() {
    if (this.state.edit) {
      return <CalendarEdit calendar={this.calendar} />;
    }
    return null;
  }

  render() {
    this.calendar = this.state.edit
      ? this.props.calendarEdited
      : this.props.calendar;

    if (!this.calendar) {
      return <div>Loading...</div>;
    }
    return (
      <Lang>
        {({ months }) => {
          return (
            <div className="calendar-months">
              <Container>
                <Button
                  className="edit-button"
                  floated="right"
                  onClick={() => this.setState({ edit: !this.state.edit })}
                >
                  Edit
                </Button>
                {this.renderEdit()}
                <br />
                <h1 className="center">{this.calendar.year}</h1>
                <h2 className="center">{this.calendar.title}</h2>
                <Grid stackable>{this.renderMonths(4, 3, months)}</Grid>
              </Container>
            </div>
          );
        }}
      </Lang>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    calendar: state.calendars[ownProps.match.params.id],
    calendarEdited: state.atualCalendar,
  };
}

export default connect(mapStateToProps, { fetchCalendar, selectAtualCalendar })(
  CalendarShowMonths
);

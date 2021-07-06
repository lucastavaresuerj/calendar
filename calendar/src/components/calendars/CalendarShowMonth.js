import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Menu, Button, Icon } from "semantic-ui-react";

import { Lang } from "../lang";
import history from "../../history";
import CalendarMonth from "./CalendarMonth";
import { fetchCalendar } from "../../actions";

class CalendarShowMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.props.match.params.month,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { month }) {
    history.replace(`/calendars/${this.props.calendar.id}/${month}`);
    this.setState({ month });
  }

  renderMenu(months, back) {
    const { month } = this.state;
    let menuItens = [];
    for (let m = 0; m < 12; m++) {
      menuItens.push(
        <Menu.Item
          key={`menu${m}`}
          name={months.abr[m]}
          month={m}
          active={m === month}
          onClick={this.handleItemClick}
        />
      );
    }
    return (
      <Menu tabular>
        {menuItens}
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to={`/calendars/${this.props.calendar.id}`}>
              <Button animated>
                <Button.Content visible>{back}</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }

  componentDidMount() {
    if (!this.props.calendar) {
      this.props.fetchCalendar(this.props.match.params.id);
    }
  }

  render() {
    if (!this.props.calendar) {
      return <div>Loading...</div>;
    }
    return (
      <div className="calendar-month">
        <Lang>
          {({ months, back }) => {
            return (
              <React.Fragment>
                {this.renderMenu(months, back)}
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <h1 className="month-name center">
                        {months.full[this.state.month]}
                      </h1>
                      <CalendarMonth
                        month={this.state.month}
                        year={this.props.calendar.year}
                        color={
                          this.props.calendar.color.months[this.state.month]
                            .table
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </React.Fragment>
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

export default connect(mapStateToProps, { fetchCalendar })(CalendarShowMonth);

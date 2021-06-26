import React from "react";
import { connect } from "react-redux";
import { Tab, Button } from "semantic-ui-react";

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

    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.createPane = this.createPane.bind(this);
    this.saveUpdates = this.saveUpdates.bind(this);
  }

  saveUpdates() {
    this.props.updateCalendar(this.props.calendar.id, this.state);
  }

  createPane() {
    const { calendar } = this.props;
    const panes = [
      {
        menuItem: "Basic",
        pane: <BasicInformation calendar={calendar} onSubmit={this.onSubmit} />,
      },
    ];

    return panes.map((pane) => {
      pane.render = () => (
        <Tab.Pane key={pane.menuItem}>
          {pane.pane}
          <Button onClick={this.saveUpdates}>Save</Button>
        </Tab.Pane>
      );
      return pane;
    });
  }

  componentDidMount() {
    this.props.selectAtualCalendar(this.props.calendar);
  }

  componentWillUnmount() {
    this.props.desselectAtualCalendar();
  }

  onSubmit(formValues) {
    console.log("submit", formValues);
    for (let field in formValues) {
      this.setState({ [field]: formValues[field] });
      this.props.editAtualCalendar(formValues);
    }
  }

  render() {
    return (
      <div className="calendar-edit">
        <Tab panes={this.createPane()} />
      </div>
    );
  }
}

export default connect(null, {
  updateCalendar,
  selectAtualCalendar,
  editAtualCalendar,
  desselectAtualCalendar,
})(CalendarEdit);

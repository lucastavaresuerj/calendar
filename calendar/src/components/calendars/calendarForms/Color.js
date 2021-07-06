import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";

import { RenderDropdown, RenderColorPiker } from "./renderFields";
import { hexToName } from "../../colorPiker/convertColor";
import Lang from "../../lang/Lang";

const form = "ChoseColorForm";

class ChoseColor extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  makeOptions(options) {
    return options.map((month, index) => {
      return { value: index, text: month };
    });
  }

  handleSubmit({
    monthBackGround,
    monthBackGroundPiker,
    monthColor,
    monthColorPiker,
  }) {
    const { calendar } = this.props;
    const sendValues = {};

    monthColorPiker = hexToName(monthColorPiker).toLowerCase();
    sendValues.months = {};
    for (let month in calendar.color.months) {
      month = parseInt(month);
      let background =
        monthBackGround &&
        monthBackGroundPiker &&
        monthBackGround.indexOf(month) > -1
          ? monthBackGroundPiker
          : calendar.color.months[month].background;

      let table =
        monthColor && monthColorPiker && monthColor.indexOf(month) > -1
          ? monthColorPiker
          : calendar.color.months[month].table;

      sendValues.months[month] = {
        background,
        table,
      };
    }

    this.props.onSubmit({ color: sendValues });
  }

  render() {
    const { calendar } = this.props;
    const piker = {
      type: "Twitter",
      blockInput: true,
      colors: [
        "red",
        "orange",
        "yellow",
        "olive",
        "green",
        "teal",
        "blue",
        "violet",
        "purple",
        "pink",
        "brown",
        "white",
        "grey",
        "black",
      ],
    };

    return (
      <Lang>
        {({ months: { full } }) => {
          return (
            <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <Form.Group>
                <Field
                  name="monthBackGround"
                  label={"Change month backgournd"}
                  width={6}
                  component={RenderDropdown}
                  options={this.makeOptions(full)}
                />
                <Field
                  name="monthBackGroundPiker"
                  label={"Chose the month's background"}
                  type="text"
                  width={6}
                  component={RenderColorPiker}
                />
              </Form.Group>
              <Form.Group>
                <Field
                  name="monthColor"
                  label={"Change month color"}
                  width={6}
                  component={RenderDropdown}
                  options={this.makeOptions(full)}
                />
                <Field
                  name="monthColorPiker"
                  label={"Chose the month's color"}
                  type="text"
                  width={6}
                  component={RenderColorPiker}
                  piker={piker}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit">Apply</Button>
              </Form.Group>
            </Form>
          );
        }}
      </Lang>
    );
  }
}

function warn(formValues, props) {
  const warning = {};

  return warning;
}

function validate(formValues, props) {
  const error = {};

  return error;
}

const ChoseColorForm = reduxForm({
  form,
  validate,
  warn,
})(ChoseColor);

export default connect(null)(ChoseColorForm);

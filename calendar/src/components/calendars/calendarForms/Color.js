import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";

import { RenderInput, RenderIncrementInput } from "./renderFields";
import ColorPiker from "../../ColorPiker";

const form = "BasicInformationForm";

class BasicInformation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ title, description, year }) {
    const { calendar } = this.props;
    const sendValues = {};

    this.props.onSubmit(sendValues);
  }

  render() {
    const { calendar } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Form.Group>
          <ColorPiker />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Apply</Button>
        </Form.Group>
      </Form>
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

const BasicInformationForm = reduxForm({
  form,
  validate,
  warn,
})(BasicInformation);

export default connect(null)(BasicInformationForm);

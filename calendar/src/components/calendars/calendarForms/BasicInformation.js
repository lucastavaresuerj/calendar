import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button } from "semantic-ui-react";

import { renderInput } from "./renderFields";

class BasicInformation extends React.Component {
  renderYear({ input, placeholder, label, meta: { touched, error } }) {
    return (
      <Form.Field width="5">
        <Form.Input placeholder={placeholder} label={label}>
          <input />
          <Button.Group>
            <Button icon="plus" />
            <Button icon="minus" />
          </Button.Group>
        </Form.Input>
      </Form.Field>
    );
  }

  render() {
    const { calendar } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group widths="equal">
          <Field
            name="title"
            label="Change Title"
            type="text"
            placeholder={calendar.title}
            component={renderInput}
          />
          <Field
            name="description"
            label="Change Description"
            type="text"
            placeholder={calendar.description}
            component={renderInput}
          />
          <Field
            name="year"
            label="Change Year"
            placeholder={calendar.year}
            component={this.renderYear}
          />
        </Form.Group>
      </Form>
    );
  }
}

function validateForm(formValues) {
  const error = {};
  return error;
}

BasicInformation = reduxForm({
  form: "BasicInformationForm",
  validate: validateForm,
})(BasicInformation);

export default connect(null)(BasicInformation);

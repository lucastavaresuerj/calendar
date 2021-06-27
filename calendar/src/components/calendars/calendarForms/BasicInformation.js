import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";

import { RenderInput, RenderIncrementInput } from "./renderFields";

const form = "BasicInformationForm";

class BasicInformation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ title, description, year }) {
    const { calendar } = this.props;
    const sendValues = {};

    sendValues.year = (year || calendar.year).toString();
    sendValues.title = title || calendar.title;
    sendValues.description = description || calendar.description;
    this.props.onSubmit(sendValues);
  }

  render() {
    const { calendar } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Form.Group>
          <Field
            name="title"
            label="Change Title"
            type="text"
            width={6}
            placeholder={calendar.title}
            component={RenderInput}
          />
          <Field
            name="description"
            label="Change Description"
            type="text"
            width={6}
            placeholder={calendar.description}
            component={RenderInput}
          />
          <Field
            name="year"
            label="Change Year"
            type="text"
            width={4}
            placeholder={calendar.year}
            component={RenderIncrementInput}
          />
          <Button type="submit">Apply</Button>
        </Form.Group>
      </Form>
    );
  }
}

function warn(formValues, props) {
  const warning = {};

  if (formValues.title && formValues.title.length < 4) {
    warning.title = "title to short";
  }

  if (formValues.year && !/^(19|20)\d{2}$/g.test(formValues.year)) {
    warning.year = "The year must be between 1900 and 2099";
  }

  return warning;
}

function validate(formValues, props) {
  const error = {};

  if (formValues.year && isNaN(formValues.year)) {
    error.year = "The year must be a number";
  }

  if (props.edit && true) {
    if (!formValues.title) {
      error.title = "Must enter a title";
    }
  }
  return error;
}

const BasicInformationForm = reduxForm({
  form,
  validate,
  warn,
})(BasicInformation);

export default connect(null)(BasicInformationForm);

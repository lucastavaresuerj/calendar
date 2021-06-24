import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button } from "semantic-ui-react";

import { RenderInput, RenderYear } from "./RenderFields";

class BasicInformation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { calendar } = this.props;
    if (!values.title) values.title = calendar.title;
    if (!values.description) values.description = calendar.description;
    this.props.onSubmit(values);
  }

  render() {
    const { calendar } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Form.Group widths="equal">
          <Field
            name="title"
            label="Change Title"
            type="text"
            placeholder={calendar.title}
            component={RenderInput}
          />
          <Field
            name="description"
            label="Change Description"
            type="text"
            placeholder={calendar.description}
            component={RenderInput}
          />
          <Button type="submit">Apply</Button>
        </Form.Group>
      </Form>
    );
  }
}

{
  /** 
          <RenderYear
            name="year"
            label="Change Year"
            placeholder={calendar.year}
          />
          */
}

function warn(formValues, props) {
  const warning = {};

  if (formValues.title && formValues.title.length < 4) {
    warning.title = "title to short";
  }
  return warning;
}

function validate(formValues, props) {
  const error = {};

  if (props.edit && true) {
    if (!formValues.title) {
      error.title = "Must enter a title";
    }
  }
  return error;
}

const BasicInformationForm = reduxForm({
  form: "BasicInformationForm",
  validate,
  warn,
})(BasicInformation);

export default connect(null)(BasicInformationForm);

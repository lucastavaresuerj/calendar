import React from "react";
import { Form, Label, Input, Button } from "semantic-ui-react";

function RenderError({ meta: { touched, error, warning }, pointing }) {
  if (touched && (error || warning)) {
    return (
      <Label basic color={warning ? "yellow" : "red"} pointing={pointing}>
        {warning || error}
      </Label>
    );
  }
  return null;
}

export function RenderInput({
  input,
  label,
  placeholder,
  type,
  disabled,
  meta: { touched, error, warning },
  meta,
}) {
  if (disabled) return null;
  return (
    <Form.Field error={error && touched && !warning}>
      <label>{label}</label>
      <Input>
        <input {...input} type={type} placeholder={placeholder} />
      </Input>
      <RenderError meta={meta} pointing />
    </Form.Field>
  );
}

export class RenderYear extends React.Component {
  render() {
    const { input, placeholder, label } = this.props;
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
}

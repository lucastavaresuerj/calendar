import React from "react";
import { Form, Input } from "semantic-ui-react";

import RenderError from "./RenderError";

export default function RenderInput({
  input,
  label,
  placeholder,
  type,
  width,
  disabled,
  meta: { touched, error, warning },
  meta,
}) {
  if (disabled) return null;
  return (
    <Form.Field width={width} error={error && touched && !warning}>
      <label>{label}</label>
      <Input>
        <input {...input} type={type} placeholder={placeholder} />
      </Input>
      <RenderError meta={meta} pointing />
    </Form.Field>
  );
}

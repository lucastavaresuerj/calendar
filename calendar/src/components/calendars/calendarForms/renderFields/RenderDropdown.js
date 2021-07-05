import React, { useState } from "react";
import { change, blur } from "redux-form";
import { Form, Dropdown } from "semantic-ui-react";

import RenderError from "./RenderError";

export default function RenderDropdown({
  input: { value, ...restInput },
  options,
  label,
  placeholder,
  type,
  width,
  disabled,
  meta: { touched, error, warning },
  meta,
}) {
  const [months, setMonths] = useState([]);
  if (disabled) return null;

  function handleChange(e, { value }) {
    setMonths(value);
    meta.dispatch(change(meta.form, restInput.name, value));
  }

  return (
    <Form.Field width={width} error={error && touched && !warning}>
      <label>{label}</label>
      <Dropdown
        {...restInput}
        clearable
        fluid
        multiple
        search
        selection
        options={options}
        value={months}
        onBlur={() => meta.dispatch(blur(meta.form, restInput.name, months))}
        onChange={handleChange}
      />
      <RenderError meta={meta} pointing />
    </Form.Field>
  );
}

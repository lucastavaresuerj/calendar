import { change } from "redux-form";
import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

import RenderError from "./RenderError";

export default function RenderIncrementInput({
  input,
  label,
  placeholder,
  type,
  width,
  disabled,
  meta: { touched, error, warning },
  meta,
}) {
  const [year, setYear] = useState(null);

  function handleChange({ target: { value } }) {
    const newYear = isNaN(value) ? value : parseInt(value) || null;
    setYear(newYear);
    meta.dispatch(change(meta.form, input.name, newYear));
  }

  function handleButtons(num) {
    const newYear = isNaN(year) && year ? year : (year || placeholder) + num;
    setYear(newYear);
    meta.dispatch(change(meta.form, input.name, newYear));
  }

  return (
    <Form.Field width={width} error={error && touched && !warning}>
      <label>{label}</label>
      <Input>
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <Button.Group>
          <Button type="button" icon="plus" onClick={() => handleButtons(1)} />
          <Button
            type="button"
            icon="minus"
            onClick={() => handleButtons(-1)}
          />
        </Button.Group>
      </Input>
      <RenderError meta={meta} pointing />
    </Form.Field>
  );
}

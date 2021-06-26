import { change } from "redux-form";
import React, { useState } from "react";
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

export function RenderIncrementInput({
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

  function handleButtons(num) {
    const newYear = (year || placeholder) + num;
    setYear(newYear);
    meta.dispatch(change(meta.form, input.name, newYear));
  }

  return (
    <Form.Field width={width} error={error && touched && !warning}>
      <label>{label}</label>
      <Input>
        <input {...input} type={type} placeholder={placeholder} />
        <Button.Group>
          <Button type="button" icon="plus" onClick={() => handleButtons(1)} />
          <Button
            type="button"
            icon="minus"
            onClick={() => handleButtons(-1)}
          />
        </Button.Group>
      </Input>
    </Form.Field>
  );
}

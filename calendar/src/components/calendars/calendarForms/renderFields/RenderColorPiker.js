import React from "react";
import { Form, Input } from "semantic-ui-react";

import RenderError from "./RenderError";
import * as colorPikers from "../../../colorPiker";

export default function RenderColorPiker({
  input,
  label,
  placeholder,
  type,
  width,
  piker,
  disabled,
  meta: { touched, error, warning },
  meta,
}) {
  if (disabled) return null;
  const Piker = colorPikers[piker || "Sketch"];
  return (
    <Form.Field width={width} error={error && touched && !warning}>
      <label>{label}</label>
      <Piker {...input} />
      <RenderError meta={meta} pointing />
    </Form.Field>
  );
}

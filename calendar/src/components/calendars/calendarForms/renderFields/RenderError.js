import React from "react";
import { Label } from "semantic-ui-react";

export default function RenderError({
  meta: { touched, error, warning },
  pointing,
}) {
  if (touched && (error || warning)) {
    return (
      <Label basic color={error ? "red" : "yellow"} pointing={pointing}>
        {error || warning}
      </Label>
    );
  }
  return null;
}

import { Form, Label, Input } from "semantic-ui-react";

export function renderInput({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error, warning },
}) {
  return (
    <Form.Field error={error && touched}>
      <label>{label}</label>
      {error && touched && (
        <Label basic color="red" pointing="below">
          {error}
        </Label>
      )}
      <Input icon>
        <input {...input} type={type} placeholder={placeholder} />
      </Input>
    </Form.Field>
  );
}

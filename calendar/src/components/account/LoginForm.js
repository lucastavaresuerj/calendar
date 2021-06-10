import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  Message,
  Progress,
  Label,
  Input,
  Icon,
} from "semantic-ui-react";

import calendars from "../../apis/calendars";
import { signIn, signOut } from "../../actions";

class loginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: 0, isPasswordVisible: false, isLoading: false };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onError = this.onError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderProgessBar = this.renderProgessBar.bind(this);
    this.renderIconPassword = this.renderIconPassword.bind(this);
  }

  onError(status) {
    this.setState({ error: status });
    this.setState({ isLoading: false });
  }

  async logout() {
    await calendars.post("users/logout", this.id);
    this.props.signOut();
  }

  async login({ email, password, userName }) {
    try {
      const {
        status,
        data: { id, name },
      } = await calendars.post(
        `users/${this.props.signin ? "signin" : "login"}`,
        { email, password, name: userName }
      );

      console.log(id, name);
      if (status === 200) {
        this.props.signIn(id, name, this.logout);
        this.props.onLogin();
      } else {
        this.onError(status);
      }
    } catch (error) {
      console.log(error);
      this.onError(error.response.status);
    }
  }

  onSubmit(formValues) {
    this.setState({ isLoading: true });
    this.login(formValues);
  }

  renderMessage() {
    const messages = {
      403: "Sorry, but the email or password are wrong",
      409: "Sorry, but this email already is registered",
    };
    return (
      <Message
        warning
        visible={(this.state.error && true) || false}
        header={messages[this.state.error]}
      />
    );
  }

  renderIconPassword() {
    return (
      <Icon
        name={this.state.isPasswordVisible ? "eye slash" : "eye"}
        link
        onClick={(e) => {
          this.setState({
            isPasswordVisible: !this.state.isPasswordVisible,
          });
        }}
      />
    );
  }

  renderProgessBar(str) {
    if (!this.props.signin) {
      return null;
    }
    var warnings = [];
    const colors = ["grey", "orange", "yellow", "teal", "olive", "green"];

    if (!/[a-z]/g.test(str)) {
      warnings.push("You must add low case characters");
    }
    if (!/[A-Z]/g.test(str)) {
      warnings.push("You must add upper case characters");
    }
    if (!/\d/g.test(str)) {
      warnings.push("You must add digits characters");
    }
    if (!/\W/g.test(str)) {
      warnings.push("You must add special characters");
    }
    if (!/.{8,}/g.test(str)) {
      warnings.push("You must add at least 8 characters");
    }
    const color = colors[5 - warnings.length + (str.length >= 20)];

    const renderedWarnins = warnings.map((warn, index) => {
      return (
        <div key={`warn#${index}`}>
          {warn}
          <br />
        </div>
      );
    });
    return (
      <Progress
        percent={(5 - warnings.length) * 17 + Math.min(15, str.length)}
        disabled={warnings && !str.length}
        className="progress-password"
        color={color}
        progress
      >
        {renderedWarnins.length ? renderedWarnins : "All done"}
      </Progress>
    );
  }

  renderField({
    input,
    label,
    placeholder,
    type,
    disabled,
    isPassword,
    meta: { touched, error, warning },
  }) {
    if (disabled) return null;
    return (
      <>
        <Form.Field error={error && touched}>
          <label className="label-input">{label}</label>
          {error && touched && (
            <Label basic color="red" pointing="below">
              {error}
            </Label>
          )}
          <Input icon>
            <input
              className="text-line"
              {...input}
              type={type}
              placeholder={placeholder}
            />
            {isPassword && this.renderIconPassword()}

            {input.name === "password" && this.renderProgessBar(input.value)}
          </Input>
        </Form.Field>
      </>
    );
  }

  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        loading={this.state.isLoading}
        className="login-form"
        id={this.props.name}
      >
        <Field
          name="userName"
          type="text"
          placeholder="Your Name"
          component={this.renderField}
          label="User Name"
          disabled={!this.props.signin}
        />
        <Field
          name="email"
          type="text"
          placeholder="your.email@email.com"
          component={this.renderField}
          label="Email"
        />
        <Field
          name="password"
          type={this.state.isPasswordVisible ? "text" : "password"}
          isPassword
          placeholder="Password"
          component={this.renderField}
          label="Password"
        />
        <Field
          name="passwordSignin"
          type={this.state.isPasswordVisible ? "text" : "password"}
          isPassword
          placeholder="Same password"
          component={this.renderField}
          label="Repet Password"
          disabled={!this.props.signin}
        />
        {this.renderMessage()}
        <Button circular>{this.props.signin ? "Sign In" : "Login"}</Button>
      </Form>
    );
  }
}

function validateForm(formValues, props) {
  const error = {};
  if (formValues.email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    error.email = re.test(String(formValues.email).toLowerCase())
      ? null
      : "Please, enter a valid email";
  } else {
    error.email = "Please, enter an email";
  }
  if (!formValues.password) {
    error.password = "You must enter a password";
  }
  if (props.signin) {
    if (!formValues.userName || formValues.userName.length < 3) {
      error.userName = "You must enter at least 3 characters";
    }
    if (formValues.password) {
      const str = formValues.password;
      error.password =
        !/\W/g.test(str) +
        !/[A-Z]/g.test(str) +
        !/[a-z]/g.test(str) +
        !/\d/g.test(str) +
        !/.{8,}/g.test(str)
          ? "Password requisites not attended"
          : null;
    }
    if (formValues.password && formValues.password.length < 8) {
      error.password = "You must enter at least 8 characters";
    }
    if (!formValues.passwordSignin) {
      error.passwordSignin = "Please, repeat the password";
    }
    if (formValues.passwordSignin !== formValues.password) {
      error.passwordSignin = "The passwords must be the same";
    }
  }
  return error;
}

const loginFormRedux = reduxForm({
  form: "loginForm",
  validate: validateForm,
})(loginForm);

export default connect(null, { signIn, signOut })(loginFormRedux);

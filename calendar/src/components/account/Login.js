import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Divider, Header } from "semantic-ui-react";

import CalendarMonth from "../calendars/CalendarMonth";
import GoogleAuth from "../authentication/GoogleAuth";
import history from "../../history";
import LoginForm from "./LoginForm";
import { Lang } from "../lang";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onFormSubmit(formValues) {
    console.log("values", formValues);

    this.setState(formValues);
  }

  onLogin() {
    history.push("/");
  }

  render() {
    const [month, year] = new Date()
      .toLocaleDateString("pt-BR")
      .split("/")
      .slice(1);
    return (
      <Lang>
        {({ months }) => {
          return (
            <div className="login">
              <Grid columns={2} stackable centered>
                <Grid.Column
                  width={7}
                  verticalAlign="middle"
                  className="login-form "
                >
                  <Header
                    as="h3"
                    icon
                    textAlign="center"
                    disabled
                    className="login-header"
                  >
                    <Header.Content>Wellcome To Calendars</Header.Content>
                  </Header>
                  <LoginForm onLogin={this.onLogin} />
                  <Divider horizontal className="disable login-divider">
                    Or
                  </Divider>
                  <GoogleAuth />

                  <div className="create-account">
                    <br />
                    New to Calendars? {"  "}
                    <Link to="/signin">Create Account</Link>
                  </div>
                </Grid.Column>

                <Grid.Column
                  className="calendar"
                  width={9}
                  only="computer tablet"
                >
                  <h1 className="month-name center">
                    {`${months.full[month - 1]} ${year}`}
                  </h1>
                  <CalendarMonth {...{ month: month - 1, year }} />
                </Grid.Column>
              </Grid>
            </div>
          );
        }}
      </Lang>
    );
  }
}

function mapStateToProps(state) {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps)(Login);

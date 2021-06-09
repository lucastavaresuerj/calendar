import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Divider, Header, Segment } from "semantic-ui-react";

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
    return (
      <Lang>
        {({ months }) => {
          return (
            <div className="signin">
              <Grid columns={2} centered stackable>
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
                  <LoginForm signin onLogin={this.onLogin} />
                </Grid.Column>
                <Grid.Column width={9} verticalAlign="middle">
                  <GoogleAuth />
                  <div className="create-account">
                    New to Calendars? {"  "}
                    <Link to="/signin">Create Account</Link>
                  </div>
                </Grid.Column>
              </Grid>
              <Divider vertical className="signin-divider">
                Or
              </Divider>
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

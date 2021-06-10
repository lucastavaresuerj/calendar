import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { signIn, signOut } from "../../actions";
import history from "../../history";

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.onAuthChange = this.onAuthChange.bind(this);
    this.onSignInClick = this.onSignInClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "97695584522-2kb8tlds5hv84p36058sq40989cljrdh.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange(isSignedIn) {
    if (isSignedIn) {
      this.props.signIn(
        ...this.auth.currentUser.get().getId(),
        ...this.auth.currentUser.get().getBasicProfile().getName(),
        this.auth.signOut
      );
      console.log(
        "Name ",
        this.auth.currentUser.get().getBasicProfile().getName()
      );
      history.push("/");
    } else {
      this.props.signOut();
    }
  }

  onSignInClick() {
    this.auth.signIn();
  }

  onSignOutClick() {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.auth.isSignedIn === null) {
      return null;
    } else if (this.props.auth.isSignedIn) {
      return (
        <Button onClick={this.onSignOutClick} className="ui red google button">
          <Icon className="google icon" /> Sign Out
        </Button>
      );
    }
    return (
      <Button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" /> Sign In
      </Button>
    );
  }

  render() {
    return this.renderAuthButton();
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

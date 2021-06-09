import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends React.Component {
  render() {
    const { children, component, onRedirect, redirectTo, ownProps, ...rest } =
      this.props;

    if (this.props.auth.isSignedIn === null) {
      return <div>Loading</div>;
    } else if (!this.props.auth.isSignedIn) {
      if (onRedirect) onRedirect(rest);
      return <Redirect to={redirectTo || "/"} />;
    }
    if (component) {
      return <Route {...rest} component={component} />;
    }
    return <Route {...rest}> {children} </Route>;
  }
}

function mapStateToProps(state, ownProps) {
  return { auth: state.auth, ownProps };
}

export default connect(mapStateToProps)(PrivateRoute);

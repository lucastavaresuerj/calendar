import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends React.Component {
  render() {
    const { children, component, onRedirect, redirectTo, ownProps, ...rest } =
      this.props;
    if (
      this.props.calendar &&
      this.props.auth.userId === this.props.calendar.userId
    ) {
      if (component) {
        return <Route {...rest} component={component} />;
      }
      return <Route {...rest}> {children} </Route>;
    }
    if (onRedirect) onRedirect(rest);
    return <Redirect to={redirectTo || "/"} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    ownProps,
    calendar: state.calendars[ownProps.computedMatch.params.id],
  };
}

export default connect(mapStateToProps)(PrivateRoute);

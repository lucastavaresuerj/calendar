import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import "../scss/App.scss";
import history from "../history";
import PrivateRoute from "./PrivateRoute";

import Header from "./Header";
import { LangSet } from "./lang";
import locale from "../locale";

import Login from "./account/Login";
import SignIn from "./account/SignIn";
import CalendarCreate from "./calendars/CalendarCreate";
import CalendarList from "./calendars/CalendarList";
import CalendarShowMonths from "./calendars/CalendarShowMonths";
import CalendarShowMonth from "./calendars/CalendarShowMonth";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { language: "pt", warning: null };
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
  }

  onRedirect(route) {
    if (route.path === "/calendars/new") {
    }
  }

  componentDidMount() {
    const language = (
      window.navigator.userLanguage || window.navigator.language
    ).replace(/-.+/g, "");
    if (Object.keys(locale).indexOf(language) > -1) {
      this.setState({ language });
    }
  }

  onLanguageChange(language) {
    this.setState({ language });
  }

  render() {
    return (
      <LangSet value={this.state.language}>
        <div className="ui container ">
          <Router history={history}>
            <Header
              history={history}
              onLanguageChange={this.onLanguageChange}
            />
            <Switch history={history}>
              <Route path="/" exact component={CalendarList} />
              <Route path="/login" exact component={Login} />
              <Route path="/signin" exact component={SignIn} />
              <PrivateRoute
                path="/calendars/new"
                exact
                component={CalendarCreate}
                onRedirect={this.onRedirect}
              />
              <Route
                path="/calendars/:id/:month"
                component={CalendarShowMonth}
              />
              <Route path="/calendars/:id" component={CalendarShowMonths} />
            </Switch>
          </Router>
        </div>
      </LangSet>
    );
  }
}

export default App;

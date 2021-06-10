import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { Lang } from "./lang";
import SelectLang from "./SelectLang";
import ButtonAdmin from "./ButtonAdmin";

class Header extends React.Component {
  constructor(props) {
    super(props);
    const activeItem = this.props.history.location.pathname.replace(
      /(\/?.+?)($|\/.*)/g,
      "$1"
    );
    this.state = { activeItem };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  renderAccountMenu() {
    if (this.props.auth.isSignedIn) {
      return <Menu.Item name="Logout" onClick={this.props.auth.signOut} />;
    }
    return (
      <Menu.Item
        name="Login"
        to="/login"
        active={
          this.state.activeItem === "/login" ||
          this.state.activeItem === "/signin"
        }
        onClick={this.handleItemClick}
      />
    );
  }

  handleItemClick(e, { to }) {
    this.props.history.replace(to);
    this.setState({ activeItem: to });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Lang>
        {({ all }) => {
          return (
            <Menu stackable pointing secondary>
              <Menu.Item
                name={all}
                to="/"
                active={activeItem === "/"}
                onClick={this.handleItemClick}
              />
              <Menu.Menu position="right">
                <Menu.Item>
                  <ButtonAdmin to="/calendars/new">Create Calendar</ButtonAdmin>
                </Menu.Item>
                <Menu.Item>
                  <SelectLang onLanguageChange={this.props.onLanguageChange} />
                </Menu.Item>
                {this.renderAccountMenu()}
              </Menu.Menu>
            </Menu>
          );
        }}
      </Lang>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);

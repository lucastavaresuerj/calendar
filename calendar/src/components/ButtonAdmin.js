import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";

class ButtonAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    if (this.props.isSignedIn) {
      return <Button {...this.props.ownPorps}>{this.props.children}</Button>;
    }
    return (
      <Modal
        closeIcon
        size="small"
        open={this.state.isOpen}
        trigger={<Button>{this.props.children}</Button>}
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
      >
        <Modal.Header>{this.props.header || "Please, login"}</Modal.Header>
        <Modal.Content>
          {this.props.content || (
            <p>Please, login to access this and many others functions</p>
          )}
        </Modal.Content>
        <Modal.Actions>
          Login with:{" "}
          <Link to="/login">
            <Button onClick={() => this.setState({ isOpen: false })}>
              Login
            </Button>
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownPorps) {
  return { isSignedIn: state.auth.isSignedIn, ownPorps };
}

export default connect(mapStateToProps)(ButtonAdmin);

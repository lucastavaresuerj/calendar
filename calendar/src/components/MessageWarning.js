import React from "react";
import { Message } from "semantic-ui-react";

class MessageWarning extends React.Component {
  render() {
    return (
      <Message attached="bottom" warning>
        <Message.Header>
          <p>You must register before you can do that!</p>
        </Message.Header>
      </Message>
    );
  }
}

export default MessageWarning;

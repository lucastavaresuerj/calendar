import React from "react";

import LanguageContext from "../../contexts/LanguageContext";
import locale from "../../locale";

class Lang extends React.Component {
  render() {
    if (this.props.lang && locale[this.props.lang]) {
      return this.props.children(locale[this.props.lang]);
    }
    return (
      <LanguageContext.Consumer>{this.props.children}</LanguageContext.Consumer>
    );
  }
}

export default Lang;

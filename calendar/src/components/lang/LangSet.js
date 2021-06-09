import React from "react";

import LanguageContext from "../../contexts/LanguageContext";
import locale from "../../locale";

class LangSet extends React.Component {
  render() {
    return (
      <LanguageContext.Provider value={locale[this.props.value]}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export default LangSet;

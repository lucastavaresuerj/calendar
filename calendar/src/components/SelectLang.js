import React from "react";
import { Dropdown } from "semantic-ui-react";

import { Lang } from "./lang";

class SelectLang extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = { lang: null };

    this.languageOptions = {
      en: { key: "English", text: "English", value: "en" },
      pt: { key: "Português", text: "Português", value: "pt" },
    };
  }

  onChange(event, { value }) {
    this.setState({ lang: this.languageOptions[value].text });
    this.props.onLanguageChange(value);
  }

  render() {
    return (
      <Lang>
        {({ selectLang, lang }) => {
          return (
            <Dropdown
              button
              className="icon"
              floating
              labeled
              icon="world"
              options={Object.values(this.languageOptions)}
              search
              text={this.state.lang || selectLang}
              onChange={this.onChange}
            />
          );
        }}
      </Lang>
    );
  }
}

export default SelectLang;

import React from "react";
import { SketchPicker } from "react-color";
import { Input, Label } from "semantic-ui-react";

class ColorPiker extends React.Component {
  constructor(props) {
    super(props);

    this.state = { background: "#000", displayPiker: false };
    this.ref = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.ref.current.contains(event.target)) {
      this.setState({ displayPiker: false });
    }
  }

  handleChange(color) {
    this.setState({ background: color.hex });
  }

  renderColor() {
    return (
      <div ref={this.ref}>
        <div
          className="color"
          style={{ background: this.state.background || "#000" }}
          onClick={() =>
            this.setState({ displayPiker: !this.state.displayPiker })
          }
        />

        {this.state.displayPiker && this.renderColorPiker()}
      </div>
    );
  }

  renderColorPiker() {
    return (
      <div className="popover">
        <SketchPicker
          color={this.state.background}
          onChange={this.handleChange}
          onChangeComplete={() => console.log("cabo")}
          className="piker"
        />
      </div>
    );
  }

  render() {
    return (
      <Input
        className="color-piker"
        labelPosition="right"
        type="text"
        placeholder="Pick a Color"
      >
        <input
          value={this.state.background.toUpperCase()}
          onChange={({ target: { value } }) =>
            this.setState({
              background: value.replace(/#(.+)?|(.+)/g, "#$1$2"),
            })
          }
        />
        <Label>{this.renderColor()}</Label>
      </Input>
    );
  }
}

export default ColorPiker;

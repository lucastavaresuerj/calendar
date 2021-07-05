import React from "react";
import { SketchPicker } from "react-color";
import { Input, Label } from "semantic-ui-react";

class ColorPikerControler extends React.Component {
  constructor(props) {
    super(props);

    this.state = { background: "", displayPiker: false };
    this.ref = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.renderColorPiker = this.renderColorPiker.bind(this);
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
    this.setState({ background: color.hex.toUpperCase() });
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
    const Component = this.props.component;
    return (
      <div className="popover">
        <Component
          color={this.state.background}
          colors={this.props.colors || undefined}
          onChange={this.handleChange}
          onChangeComplete={({ hex }) => this.props.onChange(hex)}
          className="piker"
        />
      </div>
    );
  }

  render() {
    const { onBlur, onDragStart, onDrop, onFocus } = this.props;
    return (
      <Input
        className="color-piker"
        labelPosition="right"
        type="text"
        placeholder="Pick a Color"
        {...{ onBlur, onDragStart, onDrop, onFocus }}
      >
        <input
          value={this.state.background}
          onChange={({ target: { value } }) =>
            this.setState({
              background: value.replace(/#(.+)?|(.+)/g, "#$1$2").toUpperCase(),
            })
          }
        />
        <Label>{this.renderColor()}</Label>
      </Input>
    );
  }
}

export default ColorPikerControler;

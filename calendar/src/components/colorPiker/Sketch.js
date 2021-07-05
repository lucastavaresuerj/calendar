import { SketchPicker } from "react-color";

import ColorPikerControler from "./ColorPikerControler";

export default function Sketch({ component, ...props }) {
  return <ColorPikerControler component={SketchPicker} {...props} />;
}

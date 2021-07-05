import { TwitterPicker } from "react-color";

import ColorPikerControler from "./ColorPikerControler";

export default function Twitter({ component, ...props }) {
  return <ColorPikerControler component={TwitterPicker} {...props} />;
}

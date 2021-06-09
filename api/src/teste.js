const crypto = require("crypto");

const senha =
  "45514dc0df8faf15224c1b2d84633d083d6698d6d82f65ba350d8b02866c58a9";

const checkPassword = crypto.createHash("sha256");
const hashed = checkPassword.update("minha senha").digest("hex");
console.log(hashed);
console.log(hashed === senha);

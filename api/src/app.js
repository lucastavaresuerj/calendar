const express = require("express");
const cors = require("cors");
const port = 3001;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;

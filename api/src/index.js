const app = require("./app");
const usersRouter = require("./routes/users");
const collectionsRouter = require("./routes/collections");
const privateCollectionRouter = require("./routes/privateCollection");

app.use("/users", usersRouter);
app.use("/calendars", privateCollectionRouter, collectionsRouter);

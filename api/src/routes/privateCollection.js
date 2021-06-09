const express = require("express");
const router = express.Router();

const db = require("../db");
const { GET } = require("./types");

router.use(async function (req, res, next) {
  const collectionName = req.baseUrl.slice(1);
  try {
    req.belongsToUser =
      ((
        await db.find(collectionName, {
          userId: req.body.userId,
          id: req.params.id,
        })
      ).length &&
        true) ||
      false;
    if (req.body.userId) {
      req.isUserOnline = (
        await db.find("users", { id: req.body.userId })
      )[0].isOnline;
    } else {
      req.isUserOnline = false;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
  next();
});

router.route("/:id").all(async function (req, res, next) {
  const { method, belongsToUser, isUserOnline } = req;

  if ((belongsToUser && isUserOnline) || method == GET) {
    next();
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

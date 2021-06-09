const crypto = require("crypto");
const express = require("express");
const router = express.Router();

const db = require("../db");
const { GET, POST, PUT, DELETE } = require("./types");

const responses = {
  403: "Email or password wrong",
  409: "Email already registered",
};

function hash(algorithm) {
  return crypto.createHash(algorithm);
}

router.route("/login").all(async function (req, res, next) {
  const { password } = req.body,
    emailB = req.body.email;
  switch (req.method) {
    case POST:
      try {
        var user = (await db.find("users", { email: emailB }))[0];
        var { id } = user;
      } catch (error) {
        res.status(403);
        break;
      }

      const hashPassword = hash("sha256").update(password).digest("hex");
      if (hashPassword == user.password) {
        await db.update("users", { id }, { isOnline: true });
        res.status(200).send({ id });
      } else {
        res.status(403);
      }
      break;
    default:
      res.status(405);
  }
  next();
});

router.route("/logout").all(async function (req, res, next) {
  const { id } = req.body;
  switch (req.method) {
    case POST:
      try {
        await db.update("users", { id }, { isOnline: false });
      } catch (error) {
        res.status(403);
        break;
      }
      res.status(200);
      break;
    default:
      res.status(405);
  }
  next();
});

router.route("/signin").all(async function (req, res, next) {
  const { email, password } = req.body;
  switch (req.method) {
    case POST:
      try {
        const user = (await db.find("users", { email }))[0];
        if (user) {
          res.status(409);
          break;
        }
      } catch (error) {
        res.status(500);
      }
      const hashPassword = hash("sha256").update(password).digest("hex");
      const { id } = await db.insert("users", {
        email,
        password: hashPassword,
        isOnline: true,
      });
      res.status(200).send({ id });
      break;
    default:
      res.status(405);
  }
  next();
});

router.use(function (req, res, next) {
  if (!res.headersSent) {
    if (responses[res.statusCode]) {
      res.send(responses[res.statusCode]);
    } else {
      res.sendStatus(res.statusCode);
    }
  }
});

module.exports = router;

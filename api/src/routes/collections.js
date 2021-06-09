const express = require("express");
const router = express.Router();

const db = require("../db");
const { GET, POST, PUT, PATCH, DELETE } = require("./types");

const responses = {};

router.use(async function (req, res, next) {
  req.collectionName = req.baseUrl.slice(1);
  next();
});

router.route("/").all(async function (req, res, next) {
  const { collectionName } = req;
  switch (req.method) {
    case GET:
      try {
        const collections = await db.find(collectionName, {});
        res.status(200).send(collections);
      } catch (error) {
        res.status(404);
      }
      break;
    case POST:
      try {
        const collection = await db.insert(collectionName, req.body);
        res.status(200).send(collection);
      } catch (error) {
        res.status(500);
      }
      break;
    case DELETE:
      try {
        const collection = await db.delete(collectionName, {}, true);
        res.status(200).send(collection);
      } catch (error) {
        res.status(404);
      }
      break;
    default:
      res.status(405);
  }
  next();
});

router.route("/:id").all(async function (req, res, next) {
  const id = parseInt(req.params.id);
  const { collectionName } = req;
  const body = Object.keys(req.body).reduce(
    (bodyArray, field) => [...bodyArray, { [field]: req.body[field] }],
    []
  );
  switch (req.method) {
    case GET:
      try {
        const collection = await db.find(collectionName, { id });
        res.status(200).send(collection);
      } catch (error) {
        res.status(404);
      }
      break;
    case PUT:
      try {
        await db.delete(collectionName, { id });
        const collection = await db.insert(collectionName, { ...req.body, id });
        res.status(200).send(collection);
      } catch (error) {
        res.status(404);
      }
      break;
    case PATCH:
      try {
        const collection = await db.update(collectionName, { id }, body);
        res.status(200).send(collection);
      } catch (error) {
        res.status(404);
      }
      break;
    case DELETE:
      try {
        const collection = await db.delete(collectionName, { id });
        res.status(200).send(collection);
      } catch (error) {
        res.status(404);
      }
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

const express = require("express");
const Holidays = require("date-holidays");

const router = express.Router();
const hd = new Holidays("BR", "PR");

function getAllHellidaysCountry(country) {}

console.log(hd.getHolidays(2020));

const { GET } = require("./types");

router.route("/:country").all(async function (req, res, next) {
  const { collectionName } = req;
  switch (req.method) {
    case GET:
      try {
        const collections = await db.find(collectionName, {});
        res.status(200).send(collections);
      } catch (error) {
        res.status(404).send("Not found");
      }
      break;
    default:
      next();
  }
});

router.use(function (req, res, next) {
  res.status(405).send("Method not allowed");
});

module.exports = router;

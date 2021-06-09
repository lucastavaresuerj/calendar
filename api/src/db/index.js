let db = require("simple-node-jsondb");
const path = require("path");

db.init(path.join(__dirname, "db.json"));
const json = require(path.join(__dirname, "db.json"));

db = { i: db.insert, u: db.update, d: db.delete, ...db };

db.meta = Object.keys(json).reduce((meta, collection) => {
  const { id } = json[collection].slice(-1)[0] || { id: 0 };
  return { [collection]: { lastId: id }, ...meta };
}, {});

db.meta.idException = ["user"];

db.insert = async function (collection, data) {
  if (db.meta.idException.indexOf(collection) > -1) {
    if (db.meta[collection]) {
      db.meta[collection].lastId += 1;
    } else {
      db.meta[collection] = { lastId: 1 };
    }
    data.id = db.meta[collection].lastId;
  }
  await db.i(collection, data);
  return data;
};

db.update = async function (collection, filter, data) {
  await db.u(collection, filter, data);
  return await db.find(collection, filter);
};

db.delete = async function (collection, filter, confirm) {
  await db.d(collection, filter, confirm);
  return await db.find(collection, filter);
};

module.exports = db;

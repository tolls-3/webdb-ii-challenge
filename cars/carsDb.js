const db = require("../data/dbConfig");

function insert(car) {
  return db("cars").insert(car);
}

function get() {
  return db("cars");
}

function update(id, changes) {
  return db("cars")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("cars")
    .where("id", id)
    .del();
}

module.exports = {
  insert,
  get,
  update,
  remove
};

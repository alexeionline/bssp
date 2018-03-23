const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const app = express();

const adapter = new FileSync("./db.json");
const db = low(adapter);

app.get("/api/objects/", function(req, res) {
  res.json(db.get("objects"));
});

app.get("/api/objects/:objectID", function(req, res) {
  const currentObject = db
    .get("objects")
    .find({ id: +req.params.objectID })
    .value();
  res.json(currentObject);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Example app listening on port 3000!"));

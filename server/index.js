const express = require("express");
const fileSystem = require("fs");
const app = express();
const objectsJSON = fileSystem.readFileSync("./db.json");
const objects = JSON.parse(objectsJSON).objects;

app.get("/api/objects/", function(req, res) {
  res.json(objects);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Example app listening on port 3000!"));

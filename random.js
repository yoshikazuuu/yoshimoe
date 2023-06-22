const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.get("/random-image", (req, res) => {
  fs.readdir("public/img", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      const randomImage = files[Math.floor(Math.random() * files.length)];
      res.send({ imagePath: "/img/" + randomImage });
    }
  });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

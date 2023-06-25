const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const dotenv = require("dotenv");

// Read the environment variable
dotenv.config();
const PORT = process.env.PORT || 3069;

const app = express();

app.get("/random-image", (req, res) => {
  fs.readdir("public/img", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      const randomImage = files[Math.floor(Math.random() * files.length)];
      res.send({
        imagePath: "/img/" + randomImage,
        imagePathSmall: "/img-small/" + randomImage.replace(".", "_small."),
      });
    }
  });
});

app.use(express.static("public"));

// Create the server
// Checking if the server does utilize https or not
if (process.env.HTTPS && process.env.HTTPS.toLowerCase() === "true") {
  // Bind the credentials
  const certsDir = process.env.CERTS_DIR;
  const pkey = fs.readFileSync(`${certsDir}/${process.env.PRIVATEKEY}`);
  const certificate = fs.readFileSync(`${certsDir}/${process.env.CERT}`);
  const ca = fs.readFileSync(`${certsDir}/${process.env.CA}`);

  const credentials = { key: pkey, cert: certificate, ca: ca };

  // Launch it
  console.log("Running on HTTPS.");
  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
  });
} else {
  // Normal http server
  console.log("Running on HTTP.");
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

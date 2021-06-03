const functions = require("firebase-functions");
const admin = require("firebase-admin");
const argon2 = require("argon2");
admin.initializeApp();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

app.post("/", (req, res) => {
  const { email, password, country, timezone } = req.body.data;
  argon2
    .hash(password)
    .then((result) =>
      admin
        .firestore()
        .collection("users")
        .add({
          email,
          password: result,
          country,
          timezone,
        })
    )
    .catch((err) => res.send("something went wrong with api"));
});

exports.widgets = functions.https.onRequest(app);

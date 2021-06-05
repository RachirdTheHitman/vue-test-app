import { https } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import { hash } from "argon2";
import express from "express";
import cors from "cors";
import { verifyUser } from "../src/firebase";

initializeApp();
const app = express();

app.use(cors({ origin: true }));

// A post api for signup users
app.post("/users", async (req, res) => {
  const { email, password, country, timezone } = req.body.data;
  const hashedPassword = await hash(password);
  try {
    // Save user to firestore
    const userDoc = await firestore()
      .collection("users")
      .add({
        email,
        password: hashedPassword,
        country,
        timezone,
      });
    verifyUser();
    res.status(204).send(userDoc);
  } catch (error) {
    res.status(500).send(`something went wrong with api ${error.message}`);
  }
});

// get api for get the users collections from firestore
app.get("/users", async (req, res) => {
  let users = [];
  try {
    firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

export const widgets = https.onRequest(app);

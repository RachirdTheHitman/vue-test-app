import { Request, Response } from "express";
import { hash } from "argon2";
import firebase from "firebase";
import { firestore, initializeApp } from "firebase-admin";
import { UserResponse } from "../types";
import logging from "../config/logging";

initializeApp();

const NAMESPACE = "users controller";

const serverHealthCheck = (_req: Request, res: Response): unknown => {
  logging.info(NAMESPACE, "sample health check route called");
  return res.status(200).json({
    message: "pong",
  });
};

// Signup users
const createUser = async (req: Request, res: Response): Promise<unknown> => {
  logging.info(NAMESPACE, "sing up user and save to firestore");

  const { email, password, country, timezone } = req.body;

  // continue url setting
  const actionCodeSettings = {
    url: "https://vue-test-app-ef47d.web.app/",
  };

  // send email verification to current user
  const user = firebase.auth().currentUser;
  if (user) {
    user.reload().then(() => {
      user
        .sendEmailVerification(actionCodeSettings)
        .then(function() {
          console.log("sent Email Verification");
        })
        .catch(function(error: any) {
          // An error happened.
          console.log(error);
        });
    });
  }
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
        verified: false,
      });

    // Retrieve added user
    const addedUser = await firestore()
      .collection("users")
      .doc(userDoc.id)
      .get();
    if (addedUser.exists) {
      return res.status(201).json({ id: userDoc.id, ...addedUser.data() });
    } else {
      return res.status(500);
    }
  } catch (error) {
    return res
      .status(500)
      .json(`something went wrong with api ${error.message}`);
  }
};

// Get the users collections from firestore
const getUsers = async (_: Request, res: Response): Promise<unknown> => {
  logging.info(NAMESPACE, "retrieve the users collection documents");

  const users: UserResponse[] = [];
  try {
    firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          return users.push({ id: doc.id, ...doc.data() } as UserResponse);
        });
      });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

export default { serverHealthCheck, createUser, getUsers };

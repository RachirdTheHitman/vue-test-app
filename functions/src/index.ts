import { https } from "firebase-functions";
import express from "express";
// import cors from "cors";
import logging from "./config/logging";
import routes from "./routes";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBNMmkDkLya2jvbraV5Y18OrCv-WRDf5W0",
  authDomain: "vue-test-app-ef47d.firebaseapp.com",
  projectId: "vue-test-app-ef47d",
  storageBucket: "vue-test-app-ef47d.appspot.com",
  messagingSenderId: "998288743386",
  appId: "1:998288743386:web:2eb881f4ee5a2544d73ee3",
  measurementId: "G-LE8JEGFDYJ",
};

firebase.initializeApp(config);

const NAMESPACE = "Server";
const app = express();
// const main = express();

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}]
     - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - 
      STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes */
app.use("/", routes);
// app.get("/", (req, res, next) => {
//   return res.status(200).send({
//     message: "hello",
//   });
// });

/** Error handling */
app.use((_, res) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

// const httpServer = http.createServer(app);

// httpServer.listen(config.server.port, () =>
// logging.info(NAMESPACE, `Server is running
//  ${config.server.hostname}:${config.server.port}`));
export const widgets = https.onRequest(app);

// app.get("/", (req, res, next) => {
//   return res.status(200).json({
//     message: "hello",
//   });
// });

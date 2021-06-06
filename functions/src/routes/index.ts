import express from "express";
import controller from "../controllers";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/ping", controller.serverHealthCheck);

router.post("/users", controller.createUser);

router.get("/users", controller.getUsers);

export = router;

import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/validate", UserController.validateToken);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/get/all", UserController.getAllUsers);

export = router;

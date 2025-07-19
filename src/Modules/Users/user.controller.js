import { Router } from "express";
import * as userServices from "./user.service.js"
const userController = Router();

userController.post("/signup", userServices.signupUsers)
userController.put("/update/:id", userServices.updateUsers)
userController.get("/by-email", userServices.findEmail)
userController.get("/:id", userServices.excludeRole)

export default userController;
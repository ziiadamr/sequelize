import { Router } from "express";
import * as commentServices from "./comment.service.js"

const commentController = Router();

commentController.post("/addcomment", commentServices.addCommet)
commentController.patch("/update/:id", commentServices.updateComment)
commentController.post("/find-or-create", commentServices.findComment)
commentController.get("/search/:word", commentServices.searchComment)
commentController.get("/newest/:postId", commentServices.mostRecent)
commentController.get("/details/:id", commentServices.specificComment)

export default commentController;
import { Router } from "express";
import * as postServices from './post.service.js'
const postController = Router();

postController.post("/addnew", postServices.addPost)
postController.delete("/deletePost/:id", postServices.deletePost)
postController.get("/details", postServices.allPosts)
postController.get("/comment-count", postServices.commentCount)

export default postController;
import express from "express";
import {dbConnection} from "./DB/Models/db.connection.js"
import userController from "./Modules/Users/user.controller.js";
import commentController from "./Modules/Comments/comment.controller.js";
import postController from "./Modules/Posts/post.controller.js";

const app = express();
app.use(express.json());
app.use("/users",userController);
app.use("/posts", postController);
app.use("/comments",commentController);

dbConnection();

app.use((req,res,next)=>{
    res.status(404).json({
        message: "Router Not Found"
    })
})
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({
        message: "Something Went Wrong"
    })
})

app.listen(3000, ()=>{
    console.log("Server is running on port 300");
})

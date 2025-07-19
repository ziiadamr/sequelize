import { Op } from "sequelize"
import Comment from "../../DB/Models/Comments/comment.model.db.js"
import Post from "../../DB/Models/Posts/post.model.db.js";
import User from "../../DB/Models/Users/user.model.db.js";

export const addCommet = async(req, res)=>{
   try{

    const {Content, postId, userId}=req.body;
    const addComment = new Comment ({Content, postId, userId});
    const savedComment = await addComment.save();

         return res.status(200).json({
        message : "Comment created", savedComment
     })

   }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
   } 
}

export const updateComment = async(req, res)=>{
    try{
        const{Content, userId}=req.body
        const {id}=req.params

        const commentId = await Comment.findByPk(id)
        if(!commentId){
            return res.status(404).json({
                message: "Comment Not Found !"
            })
        }

        if(commentId.userId!=userId){
            return res.status(401).json({  //error 401  >> unauthorized 
                message : "You are unauthorized to update this comment ! "
            })
        }

        if(Content) commentId.Content = Content;
        await commentId.save();

        return res.status(200).json({
            Message : "Comment updated successfully" 
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}

export const findComment = async(req, res)=>{
    try{

        const {Content, postId, userId}= req.body    

    const existingComment = await Comment.findOne({where: {
        Content,
        postId,
        userId}});

        if(existingComment){
            return res.status(200).json({
                message :  existingComment
            })
        }

    const newComment = await Comment.create({ Content, postId, userId });
    return res.status(200).json({
      message: "New comment created",
      data: newComment
    });
    }

    catch(err){
             console.log(err);
        return res.status(500).json({
        message : err
    })   
    }
}

export const searchComment = async(req, res)=>{
    try{

        const {word} = req.params

        const search = await Comment.findAll({
        where: {
            Content: {
                [Op.like]: `%${word}%`
            }
      }
        })

        if (search.length === 0) {
            return res.status(404).json({
            message: "No comments found!"
        });
        }
        
    return res.status(200).json({
      message: `Found ${search.length} comment(s)`,
      results: search
    });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}

export const mostRecent = async(req, res)=>{
    try{

        const {postId}= req.params;
        
        const recent = await Comment.findAll({
            where: {
            postId: postId
            },
            attributes:["id","Content", "created_at"],
            order:[["created_at","DESC"]],
            limit:3,
            offset:0
        })

        return res.status(200).json({
            message: recent
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}

export const specificComment = async(req, res)=>{
    try{

        const { id }=req.params
        const specificId = await Comment.findByPk(id, {
        attributes: ["id", "Content"],
        include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"]
        },
        {
          model: Post,
          as: "post",
          attributes: ["id", "title", "content"]
        }
        ]
        });
        
        if(!specificId){
            return res.status(404).json({
                message: "No Comment Found !"
            })
        }

        return res.status(200).json({
            message: specificId
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}
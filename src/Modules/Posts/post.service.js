import { fn, col } from "sequelize" 
import Comment from "../../DB/Models/Comments/comment.model.db.js"
import Post from "../../DB/Models/Posts/post.model.db.js"
import User from "../../DB/Models/Users/user.model.db.js"

export const addPost = async(req,res)=>{

    try{
     const {title, content, userId} = req.body

     const newPost = new Post({title, content, userId})
     const savedPost  = await newPost.save()

     return res.status(200).json({
        message : "New Post Added", New: savedPost
     })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}

export const deletePost = async(req, res)=>{

    try{
        const{id}= req.params
        const{userId}=req.body

        const post = await Post.findByPk(id);
        
        if(!post){
            return res.status(404).json({
                message: "Post Not Found"
            })
        }

        if (post.userId !== userId) {
            return res.status(401).json({ //401 >> unauthorized
            message: "You are unauthorized to delete this post"
        });
        }
        
        await post.destroy();
        return res.status(200).json({
            message: "Post Deleted Successfully"
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}

export const allPosts = async(req, res)=>{
    try{

        const allPosts = await Post.findAll({
        attributes: ["id", "title"],
        include: [
        {
          model: User,
          as: "author",
          attributes: ["name"]
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "content"]
        }
        ]
        });
        
        if(!allPosts){
            return res.status(404).json({
                message: "No Post Found !"
            })
        }

        return res.status(200).json({
            message: allPosts
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}
export const commentCount = async(req, res)=>{
    try{

    const allPosts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [fn("COUNT", col("comments.id")), "commentCount"]
      ],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: []
        }
      ],
      group: ["Post.id"]
    });

    return res.status(200).json(allPosts);
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err  
    })
}
}
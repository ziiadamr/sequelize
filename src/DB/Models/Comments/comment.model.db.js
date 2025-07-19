import { Model, DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";
import Post from "../Posts/post.model.db.js";
import User from "../Users/user.model.db.js";

class Comment extends Model {}

Comment.init({
Content:{
    type: DataTypes.TEXT,
    allowNull:false,
    validate:{
        len:[2,200]
    }
},
postId:{
    type: DataTypes.INTEGER,
    allowNull: false
},
userId:{
    type: DataTypes.INTEGER,
    allowNull: false
}
},{
    sequelize: sequelize_config,
    modelName :"Comment", 

    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'

})

export default Comment;

Comment.belongsTo(Post,{
    foreignKey: {
        name:"postId"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as:"post"
})

Post.hasMany(Comment,{
    foreignKey:{
        name:"postId"
    },
    onDelete: "CASCADE",
    onUpdate:"CASCADE",
    as: "comments"
})

Comment.belongsTo(User,{
    foreignKey: {
        name:"userId"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as:"user"
})

User.hasMany(Comment,{
    foreignKey:{
        name:"userId"
    },
    onDelete: "CASCADE",
    onUpdate:"CASCADE",
    as: "comments"
})


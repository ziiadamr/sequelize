import { Model, DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";
import User from "../Users/user.model.db.js";

class Post extends Model{}

Post.init({
    title:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            len:[2,100]
        }
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
         len:[2,1000]   
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize:sequelize_config,
    modelName: "Post",

    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

export default Post;

Post.belongsTo(User,{
    foreignKey:{
        name:"userId"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as:"author"
})

User.hasMany(Post,{
    foreignKey:{
        name:"userId"
    },
    onDelete: "CASCADE",
    onUpdate:"CASCADE",
    as: "userPosts"
})
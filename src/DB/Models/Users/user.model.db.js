import { DataTypes } from "sequelize";
import { sequelize_config } from "../db.connection.js";

const User = sequelize_config.define(
  'User',
  {
    // Model attributes are defined here
    name: {
        
      type: DataTypes.STRING,
      allowNull: false,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:'idx_email_unique',
      comment: 'email address',
      
      validate:{
      notEmpty: true,
      isEmail: true  // built-in validation - Part 1 - 1
    }
    },
password: {
  type: DataTypes.STRING,
  allowNull: false,
  set(value) {
    const randomPassword = Math.random().toString().substring(2);
    this.setDataValue("password", `${randomPassword}_${value}`);
  },
  validate: {
    notEmpty: true,
    len: [6, 100]
  }
},
    role:{
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue:'user'
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    //freezeTableName: true
    // Other model options go here
    paranoid: true,       //part 1 -1

    hooks: {
      beforeCreate: (user) => {
        if (user.name.length <= 2) {
          throw new Error("Name must be longer than 2 characters"); // part 1 - 3
        }
      }
    }
  },
);

export default User;
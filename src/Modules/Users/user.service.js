import User from "../../DB/Models/Users/user.model.db.js"

export const signupUsers = async(req,res)=>{

    try{
        const {name, email, password, role} = req.body
        
        const isEmailExist = await User.findOne({where:{email:email}})
        if(isEmailExist){
            return res.status(400).json({
                message:"Email Already Exist !"
            })
        }
        
        const user = await User.create(
            {name, email, password, role}
        )
        return res.status(200).json({
            message : "User Added Successfully", user
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message : err
        })
    }
}

export const updateUsers= async(req,res)=>{
    try{
        const {name, email, password, role} = req.body
        const{id}=req.params


        const user = await User.findByPk(id)
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        if(name) user.name = name;
        if(email){
            const isEmailExist = await User.findOne({where:{email:email}})
            if(isEmailExist){
            return res.status(400).json({
                message:"Email Already Exist !"
            })
        }
        user.email=email   
        }

        if(password) user.password = password;
        if(role) user.role = role;

        await user.save()
        
        return res.status(200).json({
            message:"User Updated or Created Successfully"
        })
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err
        })
    }
}

export const findEmail= async(req, res)=>{
    try{
        const {email} = req.query


        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(400).json({
                message:"no user found"
            })
        }
        return res.status(200).json({
        message: user
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err
        })
    }
}

export const excludeRole= async(req, res)=>{
    try{
        const{id}=req.params
        
        const user = await User.findByPk(id, {
            attributes:{exclude: ["role"]}
        })   
        
        if(!user){
            return res.status(404).json({
                message: "user not found !"
            })
        }
        if(user){
        return res.status(200).json({
            message: user
        })
        }

    }

    catch(err){
        console.log(err);
        return res.status(500).json({
        message : err
        })
    }

}
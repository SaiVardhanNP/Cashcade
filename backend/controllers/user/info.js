import { User } from "../../db.js";

const info=async(req,res)=>{

    try{
    const userId=req.userId;

    const user=await User.findOne({_id:userId});

    if(!user){
        return res.status(403).json({msg:"user not found!"})
    }

    res.json(user);

    }
    catch(err){
        res.json({msg:"Something went wrong"})
    }
}

export default info;
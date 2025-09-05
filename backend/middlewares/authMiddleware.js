import jwt from 'jsonwebtoken';


const authMiddleware=(req,res,next)=>{
    try{
    const header=req.headers.authorization;
    // console.log(header);

    if(!header || !header.startsWith("Bearer")){
         res.status(403).json({
            msg:"Invalid Token!"
        })
        return;
    }

    const token=header.split(" ")[1];

    const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
    // console.log(user);
    if(!user){
    res.json({
            msg:"Invalid Token!"
        })
        return;
    }
    req.userId=user.userId;
        next();
    
    }
    catch(err){
        res.status(500).json({
            msg:"Something went wrong!"
        })
    }
}

export default authMiddleware
const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    try{
        const token=req.headers.cookie.split("=")[1]
        const decode=jwt.verify(token,'123shant123098')
        req.user=decode.user
        next()
    }
    catch(error){
        res.cookie("token", "", { httpOnly: true });
        res.status(400).json(error)
    }
}

module.exports=authenticate
const jwt=require('jsonwebtoken')

const setCookie=(res,user, returnItem)=>{
    let token = jwt.sign({user}, "123shant123098", {
        expiresIn: "30m",
      });
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json(returnItem);
}

module.exports=setCookie
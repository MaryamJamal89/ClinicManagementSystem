const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
        let token,decode;
    try{
        token=request.get("Authorization").split(" ")[1];
        decode=jwt.verify(token,"ITI")
    }catch(error)
    {
        error.message="No Authorized";
        error.status=403;
        next(error);
    }
    if(decode!==undefined)
    {
       request.id=token.id;
       request.userName=token.userName;
      next();              
    }


}
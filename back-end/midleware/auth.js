import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const authenticate = (req,res,next)=>{
    const cookie = req.headers.cookie
    // console.log(cookie);
    if(cookie){
        const [name,token] = cookie.trim().split("=")
        if(name=="authToken"){
            const verifyed = jwt.verify(token,"akhil")
            console.log("insside auth");
            req.name = verifyed.UserName
            req.role = verifyed.UserRole

            console.log("name ",req.name);
            console.log("role ",req.role);


            
            console.log(req.role);
            
            next()
        }
    }else{
        console.log("cookie not found");
        res.status(404).json({msg:"cookie not found"})
    }
    
}

export default authenticate




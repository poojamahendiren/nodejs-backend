import { compare } from 'bcrypt';
import e from 'express';
import jwt from 'jsonwebtoken'

//Authentication
export async function authenticateUser (req,res,next) {
    //to validate whether access token exist in header
    if(!req.headers.accesstoken){
        return res.status(400).send({msg:"Token not found"})
    }

    //verification of token

    try {
        const user = await jwt.verify(req.headers.accesstoken,process.env.SECRECT_KEY);
        req.body.currentuser=user;
        console.log(user);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).send({msg:"Unauthorised"});
    }

};


//Authorisation
export function authorisedUser (req,res,next) {
    if(req.body.currentuser.role === "admin")
    next();
    else
    return res.status(400).send({msg:"Forbidden: No permission to access the API"});
};
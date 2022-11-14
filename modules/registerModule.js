
import {ObjectId} from 'mongodb';
import {createConnection} from '../index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';

export async function signup  (req,res)  { 
    console.log("signup");
    try {
        const client=await createConnection()
        //email id validation
        const existUser =await client.db("guvi").collection("users").findOne({email:req.body.email});
        console.log(req.body);
        if(existUser){
           return res.status(400).send({msg:"You are already a exist user"});
        }

        //confirm password validation
        const isSamePassword = checkPassword(req.body.password,req.body.confirmPassword);
        if(!isSamePassword){
            return res.status(400).send({msg:"Password doesn't match "});
        }
        else delete req.body.confirmPassword;

        //password hash
        const randomString = await bcrypt.genSalt(10)
        req.body.password=await bcrypt.hash(req.body.password,randomString)
        console.log(req.body)

        //save in db
        const insertedResponce = await client.db("guvi").collection("users").insertOne({...req.body});
        res.send(insertedResponce);


    } catch (error) {
        console.log("err");
        res.status(500).send(err);
        
    };
}


//password validation condition

const checkPassword =(password,confirmPassword)=>{
    return password !== confirmPassword ?  false : true ;
    
};





export async function signin (req,res)  {
    const client=await createConnection();

    //req.body email,password from frntend 
    //email validation to check registered user
    const existUser = await client.db("guvi").collection("users").findOne({email:req.body.email});
        if(!existUser){
           return res.status(400).send({msg:"You are not a registered user please signup yourself to register"});
        }
        console.log(existUser)

    //password validation 
    const isSamePassword = await bcrypt.compare(req.body.password,existUser.password);
    console.log(isSamePassword)
    if(!isSamePassword){
        return res.status(400).send({msg:"Incorrect Password"});
    }


    //Generate and send token as responce
    const token = jwt.sign(existUser,process.env.SECRECT_KEY,{expiresIn:"1hr"});
    res.send(token);


}
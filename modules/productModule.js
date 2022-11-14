import {ObjectId} from 'mongodb';
import {createConnection} from '../index.js'

// console.log("createConnection",createConnection)


export async function getProducts(req,res){
    try {
        const client=await createConnection()
        const productsData = await  client.db("guvi").collection("products").find().toArray();
        res.send(productsData );
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}


export async function updateProducts(req,res){
    try {
        const id = req.params.id;
        const client=await createConnection()
        const updatedData = await  client.db("guvi").collection("products").findOneAndUpdate({_id:ObjectId(id)} , {$set:{...req.body.products}} , {returnDocument:"after"} ); 
        res.send(updatedData);
    } catch (error) {
        console.error(err);
        res.status(500).send(err); 
    }
    
}


export async function createProducts(req,res){
    try {
        const client=await createConnection()
        const insertedResponse = await  client.db("guvi").collection("products").insertOne(req.body.products);
        res.send(insertedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}


export async function  deleteProducts(req,res){
    try {
        const id = req.params.id;
        const client=await createConnection()
        const deletedData = await  client.db("guvi").collection("products").remove({_id:ObjectId(id)});
        res.send(deletedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
    
}


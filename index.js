const express = require("express");
const cors = require("cors");
// const { ObjectId } = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// 1UzOaR8GJldfCpoa
// onito_user

// MiddleWare
app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER, process.env.DB_PASSWORD)

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-zwft7ha-shard-00-00.gcdmwma.mongodb.net:27017,ac-zwft7ha-shard-00-01.gcdmwma.mongodb.net:27017,ac-zwft7ha-shard-00-02.gcdmwma.mongodb.net:27017/?ssl=true&replicaSet=atlas-9wmgjj-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  async function run(){
    try{
         
        await client.connect();
        const userCollection = client.db("ALL_USERS").collection("users");

        // const user = {
        //     name:'imtiaz',
        //     email:'imtiaz@gmail.com'
        // }
        // const result = await userCollection.insertOne(user);
        // console.log(`ID  Inserted ':${result.insertedId}`)

        app.post("/users",async(req,res)=>{
          const users = req.body;
          const result = await userCollection.insertOne(users);
          res.send(result);
        })

        app.get("/users",async(req,res)=>{
          const query = {}
          const cursor = userCollection.find(query);
          const users = await cursor.toArray();
          res.send(users); 
        })
    }
    finally{

    }
  }
  run().catch(console.dir);
  app.get('/',(req,res)=>{
    res.send('Running Onito Tech');
  })
app.listen(port, () => console.log("Listening from", port));
let express= require ("express");
let cors = require ("cors");
let {MongoClient} = require("mongodb");

let app = express();
app.use(cors());
app.use(express.json());
let url="mongodb+srv://patilanushka2704:o32QO3KjhTn44cBe@cluster0.paual01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.post("/add",(request,response)=>{
    let client=new MongoClient(url);
client.connect();

let db=client.db("mern");
let coll=db.collection("events");
let obj={
    name:request.body.name,
    event:request.body.event,
    time:request.body.time,
    phone:request.body.phone
}

coll.insertOne(obj)
.then((result)=>response.send(result))
.catch((error)=>response.send(error));
});



app.get("/get",(request,response)=>{
    let client=new MongoClient(url);
    client.connect();

    let db=client.db("mern");
    let coll=db.collection("events");
    coll.find({}).toArray()
    .then((result)=>response.send(result))    
    .catch((error)=>response.send(error));
    
})
app.listen(9000,()=>{console.log("Express is live")});
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const port = 3020

const app = express();
app.use (express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    status:String,
    gender:String
})

const Users = mongoose.model("data",userSchema)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async (req,res)=>{
    const {name,email,status,gender} = req.body
    const user = new Users({
        name,
        email,
        status,
        gender
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

app.listen(port,()=>{
    console.log("server started")
}) 
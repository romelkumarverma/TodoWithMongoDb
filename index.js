// const mongoose = require('mongoose')
// const express = require('express')
// const app = express()
// const todolistapp = require('./Schema')
// const dbcon = "mongodb://127.0.0.1:27017/TodoListMongoDb"

// const PORT = 4200

// mongoose.connect(dbcon)
// .then(()=>{
//     console.log("Connect")
// })
// .catch((err)=>{
//     console.log(err)
// })

// app.post('/api/mongo/post', async(req, res)=>{
//     try{
//         const data = req.body;
//         const newData =new todolistapp(data)
//         const response = await newData.save()
//         console.log("Post Data SuccessFully...")
//         res.status(200).json(response)
//     }catch(err){
//         console.log("Internal Server Error")
//         res.status(500).json(err)
//     }
// })

// app.listen(PORT, () =>{
//     console.log(`Server is running on ${PORT}...`);
// })


const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')




const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Import the Mongoose Schema from './Schema'
const todolistapp = require('./Schema');

const dbcon = "mongodb://127.0.0.1:27017/TodoListMongoDb";

const PORT = 4200;

app.use(cors({
  origin: ["http://localhost:3000"],
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

mongoose.connect(dbcon, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB...:", err);
  });

app.post('/api/mongo/post', async (req, res) => {
  try {
    const data = req.body;
    const newData = new todolistapp(data);
    const response = await newData.save();
    console.log("Data posted successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error posting data:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/mongo/get', async(req, res)=>{
    try{
        const data = await todolistapp.find()
        console.log("data get successfully...")
        res.status(200).json(data)
    }catch(err){
        console.log('data not get')
        res.status(500).json(err)
    }
  
})

app.put('/api/mongo/update/:TaskId', async(req, res)=>{
    const TaskId = req.params.TaskId
    try{
        const data = await todolistapp.findOneAndUpdate({TaskId:TaskId},{$set:req.body},{new: true})
        console.log("Updated...")
        res.status(200).json(data)
    }catch(err){
        console.log("Server error")
        res.status(500).json(err)
    }
})

app.delete('/api/mongo/delete/:TaskId', async (req, res)=>{
    const TaskId = req.params.TaskId
    try{
        const data = await todolistapp.findOneAndDelete(TaskId)
        console.log("Deleted..")
        res.status(200).json(data)
    }catch(err){
        console.log("Server error")
        res.status(500).json(err)
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

// const mongoose = require('mongoose')

// var todoListAppSchema = mongoose.Schema({
//     TaskId:{
//         type:Number
//     },
//     Task:{
//         type:String
//     },
//     Assign_Date:{
//         type:Date, Default:Date.now
//     },
//     Due_Date:{
//         type:String
//     },
//     Completion_Date:{
//         type:String
//     },
//     Status:{
//         type:String, Default:'pending'
//     }

// })
// const todolistapp = mongoose.model('todolistapp', todoListAppSchema)

// module.exports = todolistapp

const mongoose = require('mongoose');

const todoListAppSchema = mongoose.Schema({
    TaskId: {
        type: Number
    },
    Task: {
        type: String
    },
    Assign_Date: {
        type: Date,
        default: Date.now // Corrected 'Default' to 'default'
    },
    Due_Date: {
        type: String
    },
    Completion_Date: {
        type: String
    },
    Status: {
        type: String,
        default: 'pending'
    }
});

const todolistapp = mongoose.model('todolistapp', todoListAppSchema);

module.exports = todolistapp;

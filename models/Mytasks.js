const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({

    // id: {
    //     type: Number,
    //     required: true
    // },
    task: {
        type: String,
        required: true
    }

});


const ToDoTaskData = mongoose.model('ToDoTaskData', toDoSchema);

module.exports = ToDoTaskData;
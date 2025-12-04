const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'TODO',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true,
    }
}, {timestamps: true}); 
const taskModel = mongoose.model('UserTasks', taskSchema);

module.exports = taskModel;
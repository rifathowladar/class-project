const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = require('./attenModel');

let registerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    attendance: [attendanceSchema]
});

module.exports = mongoose.model("User", registerSchema);
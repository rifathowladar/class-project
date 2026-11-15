const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    present: {
        type: Boolean,
    },
    homework: {
        type: Boolean,
    }
});

module.exports = attendanceSchema;
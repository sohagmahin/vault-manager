const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    credentials: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Credential"
        }
    ]
});

module.exports = userSchema;
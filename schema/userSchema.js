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
    // credential: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "credential"
    //     }
    // ]
});

module.exports = userSchema;
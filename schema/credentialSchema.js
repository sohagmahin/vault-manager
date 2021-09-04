const mongoose = require('mongoose');
const credentialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // initVector:{
    //     type: 
    // }
});

module.exports = credentialSchema;
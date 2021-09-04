const express = require('express');
const mongoose = require('mongoose');

const app = express();
const passmanagerHandler = require('./routeHandler/passManagerHandler');

app.use(express.json());
app.use('/passmanager', passmanagerHandler);

mongoose.connect('mongodb://localhost/passwordmanager')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log(err))

app.listen(3000, () => {
    console.log('Server running on 3000 port');
});
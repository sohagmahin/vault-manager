const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const passmanagerHandler = require('./routeHandler/passManagerHandler');
const userHandler = require('./routeHandler/userHandler');

dotenv.config();

app.use(express.json());

mongoose.connect('mongodb://localhost/passwordmanager')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log(err));

// routes
app.use('/passmanager', passmanagerHandler);
app.use('/user', userHandler);

const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT} port`);
});
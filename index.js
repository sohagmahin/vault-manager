const express = require('express');

const app = express();
const passmanagerHandler = require('./routeHandler/passManagerHandler');

app.use(express.json());
app.use('/passmanager', passmanagerHandler);

app.listen(3000, () => {
    console.log('Server running on 3000 port');
});
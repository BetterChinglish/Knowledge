const express = require('express');

const app = express();
const port = 3000;

const db = require('./db/db');


app.get('/', (req, res) => { 
    db.myQuery('select count(*) from data', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log(data);
        }
    })
    
    res.send('hello, nodeJS');
})


app.listen(port, () => {
    console.log('express is running...');
})
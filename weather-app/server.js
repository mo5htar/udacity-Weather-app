// Data object local variable endpoint for the server
projectDatA = {};

// Declairing requered express to run the server and the routes
const express = require('express');

// Starting the express server
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initializing main project folder
app.use(express.static('website'));

// POST route with a call back function
app.post('/addData',(req,res)=>{
    projectDatA ={
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings
    };    

    res.send(projectDatA);
});


// GET route with a call back function
app.get('/alldata', (req,res)=>{
    res.send(projectDatA);
});


// Server port
const port = 3000;
// Seting up the server
app.listen(port,()=>{ console.log(`running on localhost:http://localhost:${port}`);});










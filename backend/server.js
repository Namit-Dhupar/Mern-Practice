let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config();

let app = express();

app.use(cors());
app.use(express.json()); //Enables to use Body Parse like Features

//Generally we use localhost, but this time it's Online URI
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("MongoDB database connection has been established successfully!");
});


//Defininig Routes
const excerciseRouter = require('./routes/excercises');
const userRouter = require('./routes/users');

app.use('/excercises', excerciseRouter);
app.use('/users', userRouter)

app.listen("5000", function(){
    console.log("Listening on port 5000");
});
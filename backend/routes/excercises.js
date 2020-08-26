const router = require('express').Router();
let Excercise = require('../models/excercise.module');

router.route('/').get((req,res) => { // localhost:5000/excercises
    Excercise.find() //Mongo Method
    .then(excercises => res.json(excercises)) //Return the users we got from db in json
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{ // localhost:5000/excercises/add
    const username = req.body.username; //through new express functionlity
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    //should match the state name in the frontend
    const newExcercise = new Excercise({
    username,
    description,
    duration,
    date,
    });

    newExcercise.save() //Mongo Method to save in db
    .then(() => res.json('Excercise Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get By ID
router.route('/:id').get((req,res) => { // localhost:5000/excercises/:id
    Excercise.findById(req.params.id) //Mongo Method
    .then(excercises => res.json(excercises)) //Return the users we got from db in json
    .catch(err => res.status(400).json('Error: ' + err));
});

//Delete By ID
router.route('/:id').delete((req,res) => { // localhost:5000/excercises/:id
    Excercise.findByIdAndDelete(req.params.id) //Mongo Method
    .then(() => res.json("Excercise Deleted")) //Send a response if success
    .catch(err => res.status(400).json('Error: ' + err));
});

//Update By ID
router.route('/update/:id').post((req,res) => { // localhost:5000/excercises/update/:id
    Excercise.findById(req.params.id) //Mongo Method
    .then(excercise => { //update Parameters 
        excercise.username = req.body.username;
        excercise.description = req.body.description;
        excercise.duration = Number(req.body.duration);
        excercise.date = Date.parse(req.body.date);

        excercise.save()
        .then(() => res.json("Excercise Updated")) //Send a response if success
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
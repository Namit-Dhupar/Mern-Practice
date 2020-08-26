const router = require('express').Router();
let User = require('../models/user.module');

router.route('/').get((req,res) => { // localhost:5000/users
    User.find() //Mongo Method
    .then(users => res.json(users)) //Return the users we got from db in json
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{ // localhost:5000/users/add
    const username = req.body.username; //through new express functionlity

    const newUser = new User({username});

    newUser.save() //Mongo Method to save in db
    .then(() => res.json('User Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
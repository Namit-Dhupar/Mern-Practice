let mongoose = require('mongoose');

let excerciseSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true
  },
  duration: {
      type: Number,
      required: true
  },
  date: {
      type: Date,
      required: true
  },
},
{
    timestamps: true,
});

let Excercise = mongoose.model("Excercise", excerciseSchema);

module.exports = Excercise;
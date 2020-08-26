let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
  },
},
{
    timestamps: true,
});

let User = mongoose.model("User", userSchema);

// User.create({
//        username: "Namit"
//    });
  

module.exports = User;
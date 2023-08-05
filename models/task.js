const mongoose = require("mongoose");
//
var Task = mongoose.model("Task", {
    taskType: {type: String},
    description: {type: String},
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
});

var User = mongoose.model("User", {
    userName: {type: String},
    email: {type: String},
    password: {type: String},
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
});

module.exports = { Task , User };

// another way
//const schema = new Schema({ name: String, inventory: {} });
//const Character = mongoose.model('Character', schema);
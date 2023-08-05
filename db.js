const mongoose = require("mongoose");
const { APP_DB } = require("./config/config");

mongoose.connect(APP_DB,{useNewUrlParser : true, useFindAndModify : true , useUnifiedTopology: true}, (err) => {
    try {
        if (!err) {
            console.log(`connected to MongoDB: ${APP_DB}`)
        }
        else {
            console.log("error to connect MongoDB" + JSON.stringify(err),undefined,2)
        }
    } catch (error) {
        console.log("error to connect MongoDB" + JSON.stringify(error),undefined,2)
    }
});

module.exports = mongoose;

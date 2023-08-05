const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
const http = require('http');
const mongoose = require("./db.js")
const { PORT, HOST } = require("./config/config");

const app = express();
var router = express.Router();
app.use(express.json());
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(cors({origin:"http://localhost:4200" }));

const port = process.env.PORT || 5555; //Taking from .env file

//route
const TaskRouter  = require('./routers/tasks');
app.use('/tasks', TaskRouter);
//users
const UserRouter  = require('./routers/users');
app.use('/user', UserRouter);

// var config = require('./security/config');

if (process.env.NODE_PRODENV !== 'Production') {
    console.log(`${process.env.NODE_PRODENV}`);
  }
  else if (process.env.NODE_TESTENV !== 'TEST') {
    console.log(`${process.env.NODE_TESTENV}`);
  }
//cors config
  var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//server start
app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});


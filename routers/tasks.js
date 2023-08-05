const express = require("express");
var router = express.Router();

const { Task } = require('../models/task.js');
const { authenticateToken } = require('../middlewares/middleware');  // validating the token

router.get('/', (req, res) => { 
    Task.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error' + JSON.stringify(err, undefined,2));}
    });
});
//get
router.get('/:id', (req, res) => { 

    Task.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error' + JSON.stringify(err,undefined,2));}
    });
});
router.post("/", (req,res) =>{
    var task = new Task({
        taskType : req.body.taskType,
        description : req.body.description,
        timestamps: true,//{ createdAt: 'created_at', updatedAt: 'updated_at' },
        isActive : req.body.isActive
    });
    task.save((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error' + JSON.stringify(err,undefined,2));}
    });
});
router.put('/:id', (req, res) => { 

    //var task = new Employee({
    //     taskType : req.body.taskType,
    //     description : req.body.position,
    //     createdDate : Date.now,
    //     isActive : req.body.isActive
    // });
    // task.save((err, docs) => {
    //     if (!err) { res.send(docs); }
    //     else { console.log('error' + JSON.stringify(err,undefined,2));}
    // });
});
router.delete('/:id', (req, res) => { 

    res.json({data : 111});
});

module.exports = router;
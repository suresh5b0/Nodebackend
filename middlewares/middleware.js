const jwt = require("jsonwebtoken");
const { SECRECT_KEY }  = require("../config/config")

// var authenticateToken = () => { 
//   var token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
//   jwt.verify(token, config.secret, function(err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
//     res.status(200).send(decoded);
//   });
// }


const authenticateToken = ((req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, SECRECT_KEY , (err , user) => {
    // console.log("error:  ", JSON.stringify(err,undefined,2));
    if (err) return res.sendStatus(403)
    req.user = user
    next(); // pass the execution off to whatever request the client intended
  })
});

module.exports = {authenticateToken}
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {client} = require('db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  try {
      const id = req.body.id; // в прошлый раз был баг await
      const password =  req.body.password;
      
      if(typeof(id) != 'number' || typeof(password) != 'string')
        return res.status(401).send("No Passwd or id");

      client.connect();
      const result = await client.query('SELECT role FROM users WHERE id = ' + id + '  AND password = ' + password + ';');
      client.end();

      if(result.rows.length == 1){
          const token = generateAuthToken(id, result.rows[0].role);
          res.header('x-auth-token', token).send('SUCCESS'); 
      }
      else
        res.status(404).send('No User found');

    } catch(err) {
      console.log(err.stack);
      res.status(500).send('ERROR');
    }
});

generateAuthToken = function(id,role) { 
  const token = jwt.sign({"id": id, "role": role}, config.jwtPasswd);
  return token;
};

module.exports = router;

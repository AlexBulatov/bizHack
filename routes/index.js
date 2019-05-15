const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const {client, pool} = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  try {
      const id = req.body.id; // в прошлый раз был баг await
      const password =  req.body.password;

      console.log(req.body);
      if(typeof(id) != 'number' || typeof(password) != 'string')
        return res.status(401).send("No Passwd or id");

      const result = await pool.query(`SELECT fio, role FROM users WHERE id = ${id}  AND password = '${password}';`);
      console.log(result);

      if(result.rows.length == 1){
          const token = generateAuthToken(id, result.rows[0].role);
          const SendObj = JSON.stringify({"x-auth-token": token, fio: result.rows[0].fio, role: result.rows[0].role});
          res.header('x-auth-token', token).send(SendObj); 
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

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {client} = require('db');

router.get('/',auth, async (req,res) =>{
    let id = req.user.id;
    let result = await client.query(`SELECT id FROM flies WHERE pilot = ${id}`);
});

router.post('/',auth, async (req, res) => { // for test
    let departure = req.body.departure;
    let arrival = req.body.arrival;
    let id = req.user.id;

    if(typeof(departure) != 'string' || typeof(arrival) != 'string')
        return res.status(401).send("No departure or arrival");
    client.connect();
    let result = await client.query(`SELECT id FROM flies WHERE pilot = ${id}`);
    await client.query(`UPDATE flies
                SET departure = ${departure}, arrival = ${arrival}, done = true
                WHERE id = ${result.rows[0].id};`);
    client.end();
    res.send('SUCCESS');
});

router.post('/departure',auth, async (req, res) => { 
    let departure = req.body.departure;
    let id = req.user.id;

    client.connect();
    let result = await client.query(`SELECT id FROM flies WHERE pilot = ${id}`);
    await client.query(`UPDATE flies
                SET departure = ${departure}
                WHERE id = ${result.rows.id};`);
    client.end();

    res.send('SUCCESS');
});

router.post('/arrival',auth, async (req, res) => { 
    let arrival = req.body.arrival;
    let id = req.user.id;

    client.connect();
    let result = await client.query(`SELECT id FROM flies WHERE pilot = ${id}`);
    await client.query(`UPDATE flies
                SET arrival = ${arrival}, done = true
                WHERE id = ${result.rows.id};`);
    client.end();

    res.send('SUCCESS');
});

module.exports = router;
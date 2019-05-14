const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {isPilot} =require('../middleware/checkRole');
const {client, pool} = require('../db');

router.get('/',auth, isPilot, async (req,res) =>{
    let id = req.user.id;
    
    client.connect();
    let result = await client.query(`SELECT departure, arrival, flight FROM flies WHERE pilot  = ${id} AND done = false ORDER BY departure ASC`);
    client.end();
    
    res.send(result.rows[0]);
});

router.put('/',auth, isPilot, async (req, res) => { // for test only

    //client.connect();
    let result = await pool.query(`SELECT departure, arrival, flight FROM flies WHERE pilot  = ${id} AND done = false ORDER BY departure ASC`);
    //client.end();

    res.send(result.rows[0]);
});

router.put('/',auth, async (req, res) => { // for test only
    let departure = req.body.departure;
    let arrival = req.body.arrival;
    let id = req.user.id;

    if(typeof(departure) != 'string' || typeof(arrival) != 'string')
        return res.status(401).send("No departure or arrival");

    let result = await pool.query(`UPDATE flies SET departure = ${departure.toPostgers()}, arrival = ${arrival.toPostgers()}, done = true WHERE id = ${result.rows[0].id};`);

    res.send('SUCCESS');
});

router.put('/departure',auth, isPilot, async (req, res) => {
    let departure = req.body.departure;
    let id = req.user.id;

    if(typeof(departure) != 'string')
        return res.status(401).send("No departure");


    let result = await pool.query(`SELECT id FROM flies WHERE pilot = ${id} AND done = false ORDER BY departure ASC`); //TODO подзапрос ниже
    await pool.query(`UPDATE flies SET departure = ${departure.toPostgers()} WHERE id = ${result.rows[0].id};`);

    res.send('SUCCESS');
});

router.put('/arrival',auth,isPilot, async (req, res) => {
    let arrival = req.body.arrival;
    let id = req.user.id;

    if(typeof(arrival) != 'string')
        return res.status(401).send("No arrival");


    let result = await pool.query(`SELECT id FROM flies WHERE pilot = ${id} AND done = false ORDER BY departure ASC`); //TODO подзапрос ниже
    await pool.query(`UPDATE flies SET arrival = ${arrival.toPostgers()}, done = true  WHERE id = ${result.rows[0].id};`);

    res.send('SUCCESS');
});


module.exports = router;
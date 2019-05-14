const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {isAdmin} =require('../middleware/checkRole');
const {client, pool} = require('../db');

router.get('/',/*auth, isAdmin,*/ async (req, res) => {
    const limit = typeof(req.body.limit) == 'undefined' ? 20: req.body.limit ;
    const offset = typeof(req.body.offset) == 'undefined' ? 0: req.body.offset ;

    let result = await pool.query(`SELECT pilot, departure, arrival, flight FROM flies LIMIT  ${limit} OFFSET ${offset};`);
    let result2 = await pool.query(`SELECT from_date, to_date, id, days FROM flyscale;`);

    result = {
        flies: result.rows,
        flyscale: result2.rows
    };

    res.json(result);
});


router.post('/flyscale',auth, isAdmin, async (req,res )=>{
    
    const from_date = req.body.from_date;
    const to_date =req.body.to_date;
    const days =req.body.days;

    if(typeof(to_date) != 'string' || typeof(from_date) != 'string' || typeof(days) != 'number')
        return res.status(401).send("NO REQUIREMENT DATA");

    await pool.query(`INSERT INTO flyscale (from_date, to_date, days) VALUES ( ${from_date.toPostgers()},${to_date.toPostgers()},${days});`);

    res.send('SUCCESS');
});

router.put('/flyscale',auth,isAdmin, async (req,res )=>{
    
    const id = req.body.id;
    const from_date = req.body.from_date;
    const to_date =req.body.to_date;
    const days =req.body.days;

    if(typeof(to_date) != 'string' || typeof(from_date) != 'string' || typeof(days) != 'number' || typeof(id) != 'number')
        return res.status(401).send("NO REQUIREMENT DATA");

    //client.connect();
    await pool.query(`UPDATE flyscale SET from_date = ${from_date.toPostgers()} , to_date = ${to_date.toPostgers()}, days = ${days} WHERE id = ${id};`);
    //client.end();

    res.send('SUCCESS');
});

router.delete('/flyscale',auth,isAdmin, async (req,res )=>{
    const id = req.body.id;
    if(typeof(id) != 'number')
        return res.status(401).send("NO REQUIREMENT DATA");

    await pool.query(`DELETE FROM flyscale WHERE id = ${id};`);

    res.send('SUCCESS');
});


router.put('/flies',auth, async (req,res )=>{
    const id = req.body.id;
    const departure = req.body.departure;
    const arrival =req.body.arrival;
    const flight =req.body.flight;

    if(typeof(departure) != 'string' || typeof(arrival) != 'string' || typeof(flight) != 'number')
        return res.status(401).send("No Passwd or id");

    await pool.query(`UPDATE flies SET departure = ${departure} , arrival = ${arrival}, flight = ${flight} WHERE id = ${id};`);

    res.send('SUCCESS');
});

module.exports = router;
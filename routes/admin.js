const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {isAdmin} =require('../middleware/checkRole');
const {client} = require('../db');

router.get('/',auth, isAdmin, async (req, res) => { 
    
    const limit = typeof(req.body.limit) == 'undefined' ? req.body.limit : 20;
    const offset = typeof(req.body.offset) == 'undefined' ? req.body.offset : 0;
    
    client.connect();
    let result = await client.query(`SELECT pilot, departure, arrival, flight FROM flies LIMIT  ${limit} OFFSET ${offset};`); // TODO обьеденить запрос
    let result2 = await client.query(`SELECT from_date, to_date, id, flight FROM flyscale;`);
    client.end();

    res.send(result.rows,result2.rows);
    
});


router.post('/flyscale',auth, isAdmin, async (req,res )=>{
    
    const from_date = req.body.from_date;
    const to_date =req.body.to_date;
    const days =req.body.days;

    if(typeof(to_date) != 'string' || typeof(from_date) != 'string' || typeof(days) != 'number')
        return res.status(401).send("NO REQUIREMENT DATA");


    client.connect();
    await client.query(`ISERT INTO flyscale (from_date, to_date, days) VALUES ( ${from_date.toPostgers()},${to_date.toPostgers()},${days});`);
    client.end();

    res.send('SUCCESS');
});

router.put('/flyscale',auth,isAdmin, async (req,res )=>{
    
    const id = req.body.id;
    const from_date = req.body.from_date;
    const to_date =req.body.to_date;
    const days =req.body.days;

    if(typeof(to_date) != 'string' || typeof(from_date) != 'string' || typeof(days) != 'number' || typeof(id) != 'number')
        return res.status(401).send("NO REQUIREMENT DATA");


    client.connect();
    await client.query(`UPDATE flyscale SET from_date = ${from_date.toPostgers()} , to_date = ${to_date.toPostgers()}, days = ${days} WHERE id = ${id};`);
    client.end();

    res.send('SUCCESS');
});

router.delete('/flyscale',auth,isAdmin, async (req,res )=>{
    
    const id = req.body.id;

    if(typeof(id) != 'number')
        return res.status(401).send("NO REQUIREMENT DATA");


    client.connect();
    await client.query(`DELETE FROM flyscale WHERE id = ${id};`);
    client.end();

    res.send('SUCCESS');
});


router.put('/flies',auth, async (req,res )=>{
    
    const id = req.body.id;
    const departure = req.body.departure;
    const arrival =req.body.arrival;
    const flight =req.body.flight;

    if(typeof(departure) != 'string' || typeof(arrival) != 'string' || typeof(flight) != 'number')
        return res.status(401).send("No Passwd or id");


    client.connect();
    await client.query(`UPDATE flies SET departure = ${departure} , arrival = ${arrival}, flight = ${flight} WHERE id = ${id};`);
    client.end();

    res.send('SUCCESS');
});

module.exports = router;
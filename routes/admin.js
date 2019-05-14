const express = require('express');
const router = express.Router();
const {client} = require('../db');


router.get('/', async (req, res) => { 
    client.connect();
    let result = await client.query(`SELECT pilot, departure, arrival, flight FROM flies;`);
    let result2 = await client.query(`SELECT from_date, to_date, id, flight FROM flyscale;`);
    client.end();
    res.send(result.rows,result2.rows);
    
});


router.put('/flyscale', async (req,res )=>{
    
    const id = req.body.id;
    const from_date = req.body.from_date;
    const to_date =req.body.to_date;
    const days =req.body.days;

    if(typeof(to_date) != 'string' || typeof(from_date) != 'string' || typeof(days) != 'number')
        return res.status(401).send("No Passwd or id");


    client.connect();
    await client.query(`UPDATE flyscale SET from_date = ${from_date.toPostgers()} , to_date = ${to_date.toPostgers()}, days = ${days} WHERE id = ${id};`);
    client.end();

    res.send('SUCCESS');
});

module.exports = router;
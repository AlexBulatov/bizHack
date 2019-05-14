const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');

// TODO перенести коннект к db

var connectionString = "postgres://postgres:,fyfkmysq1234@localhost:5432/postgres";

const client = new Client({
    connectionString: connectionString,
  });
  client.connect();

router.get('/', async (req, res) => { 

    let result = await client.query(`SELECT pilot, departure, arrival, flight FROM flies;`);
    let result2 = await client.query(`SELECT from_date, to_date, id, flight FROM flyscale;`)
    res.send(result.rows,result2.rows);
});


router.post('/flyscale', async (req,res )=>{
    const id = req.body.id;
    const from_date = req.body.from_date;
    const to_date =req.body.to_date;
    const days =req.body.days;

    await client.query(`UPDATE flyscale SET from_date = ${from_date} , to_date = ${to_date}, days = ${days} WHERE id = ${id};`);
    res.send('SUCCESS');
});

module.exports = router;
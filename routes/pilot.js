const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {isPilot} =require('../middleware/checkRole');
const {client, pool} = require('../db');

router.get('/',auth, isPilot, async (req,res) =>{
    let id = req.user.id;

    let result = await pool.query(`SELECT departure, arrival, flight FROM flies WHERE pilot  = ${id} AND done = false ORDER BY departure ASC`);
    
    res.send(result.rows);
});

router.put('/',auth, isPilot, async (req, res) => { // for test only

    let result = await pool.query(`SELECT departure, arrival, flight FROM flies WHERE pilot  = ${id} AND done = false ORDER BY departure ASC`);

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

router.get('/flynow', auth, isPilot, async(req, res) => {
    let id = req.user.id;

    if(typeof(id) != 'number')
      return res.status(401).send("No id");

    let result = await pool.query(`SELECT hours FROM flight_year_calc WHERE id = ${id}`);

    res.send(result.rows[0].hours);
});

router.get('/flyscale',auth, isPilot, async (req, res) => {
  let result = await pool.query(`SELECT from_date, to_date, days FROM flyscale ORDER BY from_date;`);

  console.log(result.rows[0]);

  res.json(result.rows.map((item)=>{
    return {
      hours: `${item.from_date.hours}:00:00 - ${item.to_date.hours}:00:00`,
      days: item.days
    }
  }));
});

module.exports = router;
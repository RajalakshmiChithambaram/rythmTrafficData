const express = require("express");
const moment = require('moment');
const { getTrafficData } = require("./controllers/getTrafficData")

const PORT = process.env.PORT || 3001;

const app = express();

//route to handle db data
app.get("/dbData", (req, res) => {
  getTrafficData(function (err, response) {
    console.log('data from db', response);
    res.json(response)
  })
})

//route to process the movements data and send back to UI
app.get("/api", (req, res) => {

  getTrafficData(function (err, response) {
    if(err) throw err;
    let movements = [];

    //Formatting the raw JSON based on the movement selected from UI
    for (let i = 0; i < response.TMC.length; i++) {
      for (const item in response.TMC[i].movements) {
        const count = response.TMC[i].movements[item].v;
        const date = response.TMC[i].entry_date;
        if (item === req.query.type) movements.push([Number(date), count]);
      }
    }
    res.json(movements)
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


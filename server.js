
//Budget-API
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const app = express();
const port = 3000;

const mybudgetModel = require("./models/budget_schema")

let url = 'mongodb://127.0.0.1:27017/mongodb_budget';


app.use(cors());
app.use('/', express.static('public'));
     

    app.get("/items", (req, res) => {
      mongoose.connect("mongodb://127.0.0.1:27017/mongodb_budget", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Connected");
        mybudgetModel.find({})
          .then((data) => {
            res.json(data);
            console.log(data);
            mongoose.connection.close();
          })
          .catch((connectionError) => {
            console.error(connectionError);
          });
      })
      .catch((err) => {
        console.error(err);
      });
    });
    
    app.post("/items", (req, res) => {
        mongoose.connect("mongodb://127.0.0.1:27017/mongodb_budget", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("Connected to the database");
          const newItem = new mybudgetModel(req.body);
          mybudgetModel.create(newItem) 
            .then((data) => {
              res.json(data);
              console.log(data);
              mongoose.connection.close();
            })
            .catch((connectionError) => {
              console.error(connectionError);
              res.status(400).json({ error: 'Internal Server error-Validation failed' });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(400).json({ error: 'Internal Server error' });
        });
      });
      

 /*
  app.get('/hello',(req, res)  => {
   res.send('Hello World!');
});

/** */


//app.get('/budget',(req, res)  => {
 //   res.json(budget);
//});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)

});
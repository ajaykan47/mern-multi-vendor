const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const { MongoClient } = require('mongodb');
require('./config/passport')(passport);

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.listen(9000);

// mongodb+srv://ajaykan47:<password>@cluster0.ms4u6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//const DB = 'mongodb+srv://ajaykan47:Mern@123@cluster0.ms4u6.mongodb.net/ictkart_db?retryWrites=true&w=majority';

// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology:true,
//   useFindAndModify: false

// }).then(() => {
//   console.log('connection successfully...');
// });

/**
 * Database connection prepared
*/
const uri = 'mongodb+srv://ajaykan47:Mern@123@cluster0.ms4u6.mongodb.net/ictkart_db?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("ictkart_db").collection("users");
  //console.log('ajay=========', collection);
  collection.find().each(function(error, user) {
    console.log('user=====>', user);
   });
  // perform actions on the collection object
  client.close();
});


app.use(passport.initialize());

app.use('/api', users);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

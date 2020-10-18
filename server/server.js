const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");
const passport = require("./passport/setup");
const auth = require("./routes/auth");
const assert = require("assert");
var fs = require('fs');
var mongojs = require('mongojs');
var dbjs = mongojs('ecommerce');

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(MONGO_URI, {useNewUrlParser: true})
        .then(console.log(`MongoDB connected ${MONGO_URI})`))
        .catch(err => console.log(err));

//insert products to mongodb if they are not already present
dbjs.products.find(function(err, docs){
    if(!docs.length){
      fs.readFile('../client/public/data-set.json', 'utf8', function (err, data) {
          if (err) throw err;
          var json = JSON.parse(data);

          dbjs.products.insert(json, function(err, doc) {
              if(err) throw err;
          });
      });
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  session({
    secret: "not doing this fast enough",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  })
);

app.use(passport.initialize());
app.use(passport.session());
Products = mongoose.model('products', { id: { type: String} });
app.use("/api/auth", auth);
app.get("/api/products_import", function(req, res){
  dbjs.products.findOne({},async function(err, docs){
    if(err) throw err;
    await res.json(docs);
  });
  // MongoClient.connect(MONGO_URI, function(err, db) {
  //       if (err) throw err;
  //       db.db("ecommerce").collection("products").findOne({},
  //       async function(err, result) {
  //           if (err) throw err;
  //           await res.json(result);
  //           db.close();
  //       });
  //   });
});
app.get("/api/profile_import", function(req, res){
  dbjs.users.findOne({"_id": mongojs.ObjectId(req.query.uid)}, async function(err, docs){
    if(err) throw err;
    await res.json(docs);
  });
  // MongoClient.connect(MONGO_URI, function(err, db) {
  //       if (err) throw err;
  //       db.db("ecommerce").collection("users").findOne({"_id": ObjectId(req.query.uid)},
  //       async function(err, result) {
  //           if (err) throw err;
  //           await res.json(result);
  //           db.close();
  //       });
  //   });
});
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!\n\n\n\n\n\n\n`));

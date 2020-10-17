const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const passport = require("./passport/setup");
const auth = require("./routes/auth");
const assert = require("assert");

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce";

mongoose.connect(MONGO_URI, {useNewUrlParser: true})
        .then(console.log(`MongoDB connected ${MONGO_URI})`))
        .catch(err => console.log(err));
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
  MongoClient.connect(MONGO_URI, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ecommerce");
        dbo.collection("products").findOne({},
        async function(err, result) {
            if (err) throw err;
            await res.json(result);
            db.close();
        });
    });
});
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!\n\n\n\n\n\n\n`));

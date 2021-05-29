require("dotenv").config()
var path = require("path")
var express = require("express")
var exphbs = require("express-handlebars")
var twitData = require("./twitData.json")
var bodyParser = require("body-parser")

var app = express()
var port = process.env.PORT || 3000

var mongoClient = require("mongodb").MongoClient
const { nextTick } = require("process")
var mongoUser = process.env.MONGO_USER
var mongoPassword = process.env.MONGO_PASSWORD
var mongoURL =
    "mongodb+srv://" +
    mongoUser +
    ":" +
    mongoPassword +
    "@cluster0.etpfv.mongodb.net:41241/test"
var db

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"))

app.get("/", function (req, res) {
    var twits = db.collection("twits")
    twits
        .find()
        .toArray()
        .then((twitDB) => {
            res.status(200).render("twitPage", { twitPage: twitDB })
        })
        .catch((error) => console.error(error))
})

app.get("/post", function (req, res) {
    console.log(req.body)
    var twit = {
        //text: req.body.text,
        //author: req.body.author,
    }

    var twits = db.collection("twits")
    twits.insertOne(twit, function (err, result) {
        console.log("Twit inserted")
    })

    res.redirect("/")
})

app.get("/twits/:n", function (req, res) {
    res.status(200).render("twitPage", { twitPage: twitData })
})

app.get("*", function (req, res) {
    res.status(404).render("404")
})

mongoClient.connect(
    mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
        if (err) {
            throw err
        }
        db = client.db("test")
        app.listen(port, function () {
            console.log("== Server is listening on port", port)
        })
    }
)

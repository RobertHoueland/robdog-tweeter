require("dotenv").config()
var path = require("path")
var express = require("express")
var exphbs = require("express-handlebars")
var twitData = require("./twitData.json")
var bodyParser = require("body-parser")

var app = express()
var port = process.env.PORT || 3000

var mongoClient = require("mongodb").MongoClient
var mongoUser = process.env.MONGO_USER
var mongoPassword = process.env.MONGO_PASSWORD
var mongoURL =
    "mongodb+srv://" +
    mongoUser +
    ":" +
    mongoPassword +
    "@cluster0.etpfv.mongodb.net/test"

var mongoDBDatabase

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.status(200).render("twitPage", { twitPage: twitData })
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
        db = mongoDBDatabase = client.db("test")
        app.listen(port, function () {
            console.log("== Server is listening on port", port)
        })
        db.listCollections().toArray(function (err, collInfos) {
            console.log(collInfos)
        })
    }
)

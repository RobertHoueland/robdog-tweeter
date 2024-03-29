require("dotenv").config()
var path = require("path")
var express = require("express")
var exphbs = require("express-handlebars")
var bodyParser = require("body-parser")

var app = express()
var port = process.env.PORT || 5000

var mongoClient = require("mongodb").MongoClient
const { nextTick } = require("process")
var mongoUser = process.env.MONGO_USER
var mongoPassword = process.env.MONGO_PASSWORD
var mongoURL = process.env.MONGODB_URL
var db

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"))

app.get("/", function (req, res) {
    console.log(
        "== Request from " +
        req.socket.remoteAddress +
        " " +
        req.header("user-agent")
    )
    var twits = db.collection("twits")
    var mySort = { _id: -1 }
    twits
        .find()
        .sort(mySort)
        .toArray()
        .then((twitDB) => {
            res.status(200).render("twitPage", {
                displayAll: true,
                twitPage: twitDB,
            })
        })
        .catch(
            (error) => (
                console.error(error),
                res.status(500).send("Error fetching twits from database.")
            )
        )
})

app.post("/create", function (req, res) {
    var twit = {
        text: req.body.text,
        author: req.body.author,
        time: req.body.time,
    }

    var twits = db.collection("twits")
    twits.insertOne(twit, function (err, result) {
        if (err) {
            res.status(500).send("Error adding twit to database.")
        }
        console.log(
            "== Twit inserted from " +
            req.socket.remoteAddress +
            " " +
            req.header("user-agent") +
            "\nText: " +
            req.body.text +
            "\nAuthor: " +
            req.body.author +
            "\nTime: " +
            req.body.time
        )
    })

    res.redirect("/")
})

app.get("/twits/:n", function (req, res) {
    var twit = req.params.n.toLowerCase()
    var twits = db.collection("twits")
    var mySort = { _id: -1 }
    twits
        .find()
        .sort(mySort)
        .toArray()
        .then((twitDB) => {
            if (twitDB[twit]) {
                res.status(200).render("twitPage", twitDB[twit])
            } else {
                console.log(
                    "== 404 Request from " +
                    req.socket.remoteAddress +
                    " " +
                    req.header("user-agent")
                )
                res.status(404).render("404")
            }
        })
        .catch(
            (error) => (
                console.error(error),
                res.status(500).send("Error fetching twits from database.")
            )
        )
})

app.get("*", function (req, res) {
    console.log(
        "== 404 Request from " +
        req.socket.remoteAddress +
        " " +
        req.header("user-agent")
    )
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

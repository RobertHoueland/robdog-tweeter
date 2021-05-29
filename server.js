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
    process.env.MONGODB_URL ||
    "mongodb+srv://" +
        mongoUser +
        ":" +
        mongoPassword +
        "@cluster0.etpfv.mongodb.net/test?retryWrites=true&w=majority?authSource=admin"
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
    twits
        .find()
        .toArray()
        .then((twitDB) => {
            res.status(200).render("twitPage", { twitPage: twitDB })
        })
        .catch(
            (error) => (
                console.error(error),
                res.status(500).send("Error fetching twits from DB.")
            )
        )
})

app.post("/create", function (req, res) {
    var twit = {
        text: req.body.text,
        author: req.body.author,
    }

    var twits = db.collection("twits")
    twits.insertOne(twit, function (err, result) {
        if (err) {
            res.status(500).send("Error adding twit to DB.")
        }
        console.log(
            "== Twit inserted\n" +
                "Text: " +
                req.body.text +
                "\nAuthor: " +
                req.body.author
        )
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

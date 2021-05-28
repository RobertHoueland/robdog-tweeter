/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Robert Houeland
 * Email: houelanr@oregonstate.edu
 */

var path = require("path")
var express = require("express")
var exphbs = require("express-handlebars")

var twitData = require("./twitData.json")

var app = express()
var port = process.env.PORT || 3000

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

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})

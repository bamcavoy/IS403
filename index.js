const express = require("express");

let app = express();

let path = require("path");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, 'assets')));

const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "hs2716HS",
        database: "bucket_list",
        port:5432
    }
});

app.get("/", (req, res) =>{
    res.render("index")
});

app.get("/gallery", (req, res) =>{
    res.render("gallery")
});

app.get("/loginpage", (req, res) =>{
    res.render("loginpage")
});

app.get("/newsletter", (req, res) =>{
    res.render("newsletter")
});

app.get("/resources", (req, res) =>{
    res.render("resources")
});

app.get("/addlogin", (req, res) =>{
    res.render("addlogin")
});

app.get("/writepost", (req, res) =>{
    res.render("writepost")
});

app.listen(port, () => console.log("Listening"));
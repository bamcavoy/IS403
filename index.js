const express = require("express");

let app = express();

let path = require("path");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({extended : true}));

const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "hs2716HS",
        database: "bucket_list",
        port:5433
    }
});

app.get("/", (req, res) =>{
    res.render("index")
})

app.listen(port, () => console.log("Listening"));
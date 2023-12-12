const express = require("express");
const fs = require('fs').promises;

let app = express();

const multer = require('multer');
const { getImages } = require("./assets/js/image");

let path = require("path");

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, 'assets')));

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: 'assets/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

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

app.get('/gallery', async (req, res) => {
  try {
    // List the existing images in the "uploads" folder asynchronously
    const images = await getImages();
    res.render('gallery', { images });
  } catch (error) {
    console.error('Error rendering gallery:', error);
    res.status(500).send('Internal Server Error');
  }
});

  app.post('/upload', upload.single('image'), (req, res) => {
    // Logic to handle the uploaded file (store file information in a database, etc.)
    res.redirect('/gallery');
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
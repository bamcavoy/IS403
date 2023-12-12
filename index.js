const express = require("express");

let app = express();

const multer = require('multer');
const fs = require('fs').promises;

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

async function getImages() {
    try {
      const uploadsDir = path.join(__dirname, 'assets', 'uploads');
      const files = await fs.readdir(uploadsDir);
      return files.map(file => path.join('assets', 'uploads', file));
    } catch (error) {
      console.error('Error reading images:', error);
      return [];
    }
  }

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
    // List the existing images in the "uploads" folder asynchronously
    const images = await getImages();
    res.render('gallery', { images });
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

app.listen(port, () => console.log("Listening"));
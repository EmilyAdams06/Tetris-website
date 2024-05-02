const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Used for connecting to hosting and other filepath uses
//const path = require("path");
const PORT = process.env.PORT || 5001;

// Allow ".env" to be used
require("dotenv").config();

/*
If we want user to upload images 
const cloudinary = require("./utils/cloudinary");
const upload = require("./middleware/multer");
*/

// Connect to MongoDB
const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
console.log(url);
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect(console.log("mongodb connected"));
const db = client.db("TetrisWebsite");
const ObjectId = require("mongodb").ObjectId; // Get ObjectId type

// Run Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

// API endpoints here


/*
// Heroku Deployment
// for if we decide to do web hosting
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}*/
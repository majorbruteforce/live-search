const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const app = express();
const findFromDB = require("./find.js");
const getBuffer = require("./buffer.js");
const searchTest = require("./db.js");

env.config();

app.use(express.static("public"));
app.use(cors());

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_uri = `mongodb+srv://${db_user}:${db_password}@shooting-stars.lweczfy.mongodb.net/tunescape?retryWrites=true&w=majority`;

const db = mongoose.connection;

mongoose
    .connect(db_uri)
    .then(() => {
        console.log("Connected to database successfully.");
    })
    .catch((err) => {
        console.log(err.message);
    });

db.on("disconnected", () => {
    console.log("Disconnected from database.");
});

db.on("error", (err) => {
    console.log(`Database error: ${err}`);
});

app.get("/", (req, res) => {
    res.send("index.html");
});

app.post("/get-buffer", async (req, res) => {
    const songs = await getBuffer(parseInt(req.query.number));
    res.json(songs);
});

app.get("/songs", async (req, res) => {
    try {
        const response = await searchTest.find({
            title: { $regex: `^${req.query.search}`, $options: "i" },
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json([]);
    }
});
// app.get("/songs", async (req, res) => {
//   const results= await findFromDB(req.query.search);
//   console.log(`Query by ${req.ip}: `,req.query.search);
//   console.log(results);
//   res.json(results);
// });

app.listen(3001, () => {
    console.log(`Server is live at http://127.0.0.1:3001`);
});

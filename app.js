import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
const app = express();
import chalk from "chalk";

env.config();

app.use(express.static("public"));
app.use(cors());

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_uri = `mongodb+srv://${db_user}:${db_password}@shooting-stars.lweczfy.mongodb.net/?retryWrites=true&w=majority`;

const db = mongoose.connection;

// mongoose.connect(db_uri)
// .then(()=>{
//     console.log(chalk.greenBright("Connected to database successfully."));
// })
// .catch(err=>{
//     console.log(chalk.redBright(err.message));
// })

db.on("disconnected", () => {
  console.log(chalk.yellowBright("Disconnected from database."));
});

db.on("error", (err) => {
  console.log(chalk.bgRed(`Database error: ${err}`));
});

app.get("/", (req, res) => {
  res.send('OK');
});

app.post("/songs", (req, res) => {
  console.log(req.body);
  console.log("Request made");
  res.send({name: "Louis Litt",});
});

app.listen(3000, () => {
  console.log(chalk.bgBlue.bold(`Server is live at http://127.0.0.1:3000`));
});

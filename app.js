const express = require("express");
const app = express();
require("dotenv").config();

//IMPORTING EXPORTED FILES
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");

//middleware for json built in into express
app.use(express.json());

//middlewares for routes
app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Task Manager App");
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening to port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

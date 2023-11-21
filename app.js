const express = require("express");
const app = express();
require("dotenv").config();

//importing notfound middleware
const notFound = require("./middlewares/not-found");

//importing error middleware
const errorHandlerMiddleware = require("./middlewares/error-handler");

//IMPORTING EXPORTED FILES
const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");

//middleware for passing out static files
app.use(express.static("./public"));

//middleware for json built in into express
app.use(express.json());

//middlewares for routes
app.use("/api/v1/tasks", tasks);

//middleware for not found
app.use(notFound);

//middleware for error handler middlware
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening to port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

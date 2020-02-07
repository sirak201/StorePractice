const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./config");
const PORT = process.env.PORT || config.port;
const bodyParser = require("body-parser");

const connectRetry = function() {
  mongoose.connect(
    config.mongoUri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      reconnectTries: 30,
      reconnectInterval: 1000,
      poolSize: 500
    },
    console.log(" Connected to mongoose sucessfull", config.mongoUri),

    err => {
      if (err) {
        console.log("Mongoose connection error:", err);
        setTimeout(connectRetry, 5000);
      }
    }
  );
};

connectRetry();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", (req, res) => {
//   res.send("Hello welcome");
// });

app.use("/customer", require("./Api/customer"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

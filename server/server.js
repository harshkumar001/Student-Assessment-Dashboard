const express = require("express");
var cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config
dotenv.config();

// mongoDB connection
connectDB();

// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/teacher", require("./routes/teacherRoutes"));
app.use("/api/v1", require("./routes/dataRoutes"));

//port
const port = process.env.PORT || 5000;

// listen port
app.listen(port, () => {
  console.log(
    `Server is Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});

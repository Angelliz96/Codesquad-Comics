require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
app.use(morgan("dev"));
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");


//Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//GET routes

app.get("/", (request, response, next) => {
  response.status(200).json({
    success: { message: "Home route is successful" },
    statusCode: 200,
  });
});


app.use("/api/books", bookRoutes);
//  app.use('/', authRoutes);

app.listen(PORT, () => {
  //SEND A MESSAGE
  console.log(`The server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// module.exports = app;

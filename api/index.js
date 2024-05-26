const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require("cors");
const app = express();

app.use(express.json());
dotenv.config();
const port = 8800;
const allowedOrigins = [
  "https://devnetflix.vercel.app",
  "https://netflixadmin.vercel.app/",
  "http://localhost:4000/",
];
// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowedOrigins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow cookies to be sent if needed
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Server connected to Database"))
  .catch((error) =>
    console.error("Something went wrong while connecting Database!")
  );

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(port, () => {
  console.log(`Server is up, http://localhost:${port}`);
});

const express = require("express");
const path = require("path");

const apiRouter = require("./routes/apiRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define static front page
app.use(express.static(path.join(__dirname, "public")));

// API router
app.use("/", apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");

// Catch-all route for frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

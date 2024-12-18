const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Serve front page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// DFS Gather all routes from the root folder, append paths
const root_folder = path.join(__dirname, "root");

// Recursively add routes
function add_routes(folder, route) {
  const files_and_folders = fs.readdirSync(folder);
  const folders = {};
  // For each entry in curr folder
  files_and_folders.forEach((entry) => {
    const full_path = path.join(folder, entry);
    if (fs.statSync(full_path).isDirectory()) {
      // If it's a folder, store
      folders[entry] = full_path;
    } else if (entry.endsWith(".js")) {
      // If it's a js file, add it to router
      const endpoint = require(full_path);
      const method = endpoint.method.toLowerCase();
      const api_route = route + entry.slice(0, -3);
      // Validate method
      if (["get", "post", "put", "delete"].includes(method)) {
        console.log(`\t${method} ${api_route}`);
        router[method](api_route, endpoint.handler);
      }
    }
  });
  // Recursively add routes from folders
  for (const [folder, path] of Object.entries(folders)) {
    add_routes(path, route + folder + "/");
  }
}

console.log("Adding routes...\n");
add_routes(root_folder, "/");
console.log("\nRoutes added!\n\n");
module.exports = router;

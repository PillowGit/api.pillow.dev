// Returns the status of the server

const method = "GET";
function handler(req, res) {
  res.status(200).json({ status: "ok" });
}

module.exports = { method, handler };

const express = require("express");
const server = express();

server.listen(5000, () => {
  console.log("Port 5000, API server connected!");
});

server.get("/test", (req, res) => {
  res.json({ "test": "test" });
})
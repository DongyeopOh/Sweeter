const express = require("express");
const api = express();

api.listen(5000, () => {
  console.log("Port 5000, API server connected!");
});

api.get("/test", (req, res) => res.json({ "test": "test" }))
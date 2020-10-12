const express = require("express");

// Server
const app = express();
app.listen(3000, () => console.log("Server is listening on port 3000"));
app.use(express.static("local"));

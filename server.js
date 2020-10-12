const express = require("express");

// Local server stuff
const app = express();
app.listen(3000, () => console.log("Server is listening on port 3000"));
app.use(express.static("local"));

app.get("/.netlify/functions/hello", (req, res) => {
  console.log("this worked");

  res.send({ data: { 1: "this worked" } });
});

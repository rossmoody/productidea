const express = require("express");
const admin = require("firebase-admin");

// Server
const app = express();
app.listen(3000, () => console.log("Server is listening on port 3000"));
app.use(express.static("local"));

const creds = {
  type: process.env.FIRE_TYPE,
  project_id: process.env.FIRE_PROJECT_ID,
  private_key_id: process.env.FIRE_PRIVATE_KEY_ID,
  private_key: process.env.FIRE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIRE_CLIENT_EMAIL,
  client_id: process.env.FIRE_CLIENT_ID,
  auth_uri: process.env.FIRE_AUTH_URI,
  token_uri: process.env.FIRE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIRE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIRE_CLIENT_CERT,
};

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: "https://i-need-a-product-idea.firebaseio.com",
});

const db = admin.database();
const ref = db.ref();

app.get("/.netlify/functions/hello", function (req, res) {
  ref.once("value", (snapshot) => {
    const val = snapshot.val();
    res.send(JSON.stringify(val));
  });
});

// Twitter stuff

app.get("/.netlify/functions/tweets", function (req, res) {
  console.log({ data: "this is working" });
});

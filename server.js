const express = require("express");
const admin = require("firebase-admin");
const needle = require("needle");

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

// Twitter API creds
const token = process.env.BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

// Queries
const queries = [
  {
    string: `"I wish someone would make"`,
    query_id: "i-wish-someone-would-make",
  },
  {
    string: `"great app idea"`,
    query_id: "great-app-idea",
  },
];

async function getQuery(query) {
  const params = {
    query: query.string,
    "tweet.fields": "public_metrics,created_at",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

async function getTweets() {
  // TODO: Only return results with atleast 1 like
  const init = queries.map(async (param) => {
    const response = await getQuery(param);
    response.data.forEach((element) => {
      element.query_id = param.query_id;
    });

    return response.data;
  });

  const data = await Promise.all(init);
  return data;
}

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: "https://i-need-a-product-idea.firebaseio.com",
});

function getDate() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return year + "-" + month + "-" + day + "-tweets";
}

const todaysDate = getDate();

const db = admin.database();
const ref = db.ref();
const todayRef = db.ref(todaysDate);

app.get("/.netlify/functions/hello", function (req, res) {
  ref.once("value", (snapshot) => {
    const val = snapshot.val();
    const keys = Object.keys(val);

    // If request hasn't been made today, getTweets and push to database
    if (!keys.includes(todaysDate)) {
      getTweets().then((results) => {
        const dayArr = [];

        results.forEach((queryArr) => {
          queryArr.forEach((tweet) => {
            dayArr.push(tweet);
          });
        });

        todayRef.set(dayArr);
      });
    }

    res.send(val);
  });
});

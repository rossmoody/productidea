const admin = require("firebase-admin");
// const needle = require("needle");

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

// // Twitter API creds
// const token = process.env.BEARER_TOKEN;
// const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

// // Get data from Twitter
// async function getTweets() {
//   const params = {
//     query: "I wish someone would make",
//     "tweet.fields": "public_metrics,created_at",
//   };

//   const res = await needle("get", endpointUrl, params, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

//   if (res.body) {
//     return res.body;
//   } else {
//     throw new Error("Unsuccessful request");
//   }
// }

// async function getData() {
//   try {
//     const response = await getTweets();
//     return response;
//   } catch (e) {
//     console.log(e);
//     process.exit(-1);
//   }
// }

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

exports.handler = async (event, context, callback) => {
  const data = await ref.once("value", (snapshot) => {
    const val = snapshot.val();
    const keys = Object.keys(val);

    console.log(keys);

    // if (!keys.includes(todaysDate)) {
    //   getData().then((results) => {
    //     todayRef.set(results);
    //   });
    // }

    return val;
  });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      result: data,
    }),
  });
};

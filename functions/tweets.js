const admin = require("firebase-admin");
const needle = require("needle");

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

async function getQuery(query, time) {
  const params = {
    query: query.string,
    "tweet.fields": "public_metrics,created_at",
    start_time: time,
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
  const init = queries.map(async function () {
    const yesterday = new Date(Date.now() - 864000 * 1000).toISOString();

    const response = await getQuery(param, yesterday);
    response.data.forEach((element) => {
      element.query_id = param.query_id;
    });

    return response.data;
  });

  const data = await Promise.all(init);
  return data;
}

const now = new Date(Date.now()).toISOString();

// Firebase
admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: "https://i-need-a-product-idea.firebaseio.com",
});

const db = admin.database();
const todayRef = db.ref(now);

exports.handler = async (event, context, callback) => {
  getTweets().then((results) => {
    const dayArr = [];

    results.forEach((queryArr) => {
      queryArr.forEach((tweet) => {
        dayArr.push(tweet);
      });
    });

    todayRef.set(dayArr);
  });
};

const admin = require("firebase-admin");
const needle = require("needle");
const schedule = require("node-schedule");

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
  const init = queries.map(async (param, time) => {
    const response = await getQuery(param, time);
    response.data.forEach((element) => {
      element.query_id = param.query_id;
    });

    return response.data;
  });

  const data = await Promise.all(init);
  return data;
}

exports.handler = async (event, context, callback) => {
  // Scheduling DB pushes
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = 20;
  rule.minute = 45;

  schedule.scheduleJob(rule, () => {
    const now = new Date(Date.now()).toISOString();
    const yesterday = new Date(Date.now() - 864000 * 1000).toISOString();
    const todayRef = db.ref(now);

    getTweets(yesterday).then((results) => {
      const dayArr = [];

      results.forEach((queryArr) => {
        queryArr.forEach((tweet) => {
          dayArr.push(tweet);
        });
      });

      todayRef.set(dayArr);
    });
  });

  // Firebase
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
      databaseURL: "https://i-need-a-product-idea.firebaseio.com",
    });
  }

  const db = admin.database();
  const ref = db.ref();

  const data = await ref.once("value", (snapshot) => {
    const val = snapshot.val();
    return val;
  });

  admin.app().delete();

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: data,
    }),
  });
};

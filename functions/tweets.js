// const needle = require("needle");
const cron = require("node-cron");

// // Twitter API creds
// const token = process.env.BEARER_TOKEN;
// const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

// // Queries
// const queries = [
//   {
//     string: `"I wish someone would make"`,
//     query_id: "i-wish-someone-would-make",
//   },
//   {
//     string: `"great app idea"`,
//     query_id: "great-app-idea",
//   },
// ];

// async function getQuery(query, time) {
//   const params = {
//     query: query.string,
//     "tweet.fields": "public_metrics,created_at",
//     start_time: time,
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

// async function getTweets() {
//   const init = queries.map(async (param, time) => {
//     const response = await getQuery(param, time);
//     response.data.forEach((element) => {
//       element.query_id = param.query_id;
//     });

//     return response.data;
//   });

//   const data = await Promise.all(init);
//   return data;
// }

// const now = new Date(Date.now()).toISOString();
// const yesterday = new Date(Date.now() - 864000 * 1000).toISOString();
// const todayRef = db.ref(now);

// getTweets(yesterday).then((results) => {
//   const dayArr = [];

//   results.forEach((queryArr) => {
//     queryArr.forEach((tweet) => {
//       dayArr.push(tweet);
//     });
//   });

//   todayRef.set(dayArr);
// });

exports.handler = async (event, context, callback) => {
  cron.schedule("* * * * *", function () {
    console.log("running a task every minute");
  });

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: "This might be working",
    }),
  });
};

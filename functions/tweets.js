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
  console.log("It a post request");

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: "This might be working",
    }),
  });
};

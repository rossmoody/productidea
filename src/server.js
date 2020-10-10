var admin = require("firebase-admin");

var serviceAccount = require("../temp/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://i-need-a-product-idea.firebaseio.com",
});

(async function init() {
  // getData();
  // renderTweets(
  //   applyFilters({ likes: 2, retweets: 0, sortBy: "likes" }, [...data])
  // );
  // eventListeners([...data]);

  // const response = await fetch("http://api.open-notify.org/iss-now.json");
  // const json = await response.json();

  const db = admin.database();
  var ref = db.ref("dinsoaurs");
  ref.set({
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing",
  });
})();

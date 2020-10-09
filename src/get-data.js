const fs = require("fs");
const needle = require("needle");

const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {
  // Edit query parameters below
  const params = {
    query: "I wish someone would make",
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

(async () => {
  try {
    const response = await getRequest();
    fs.writeFileSync("input.json", JSON.stringify(response), function (err) {
      if (err) throw err;
      console.log("complete");
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();

const express = require("express")
const needle = require("needle")

// Twitter API creds
const token = process.env.BEARER_TOKEN
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"

const queries = [
  {
    string: `"I wish someone would make"`,
    query_id: "i-wish-someone-would-make"
  },
  {
    string: `"great app idea"`,
    query_id: "great-app-idea"
  }
]

async function getQuery(query) {
  const yesterday = new Date(Date.now() - 86400 * 1000).toISOString()

  const params = {
    query: query.string,
    "tweet.fields": "public_metrics,created_at",
    start_time: yesterday.replace(/['"]+/g, "")
  }

  const res = await needle("get", endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  if (res.body) {
    return res.body
  } else {
    throw new Error("Unsuccessful request")
  }
}

async function getTweets() {
  const init = queries.map(async (query) => {
    const response = await getQuery(query)

    response.data.forEach((element) => {
      element.query_id = query.query_id
    })

    return response.data
  })

  const data = await Promise.all(init)

  const dayArr = []

  data.forEach((queryArr) => {
    queryArr.forEach((tweet) => {
      dayArr.push(tweet)
    })
  })

  return dayArr
}

// Local server stuff
const app = express()
app.listen(3000, () => console.log("Server is listening on port 3000"))
app.use(express.static("local"))

app.get("/.netlify/functions/hello", async (req, res) => {
  const today = new Date(Date.now()).toISOString().substring(0, 10)
  const tweetFetch = await getTweets()

  res.send({ tweetFetch })
})

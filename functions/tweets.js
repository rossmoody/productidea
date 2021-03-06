const needle = require("needle")
const admin = require("firebase-admin")

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
  client_x509_cert_url: process.env.FIRE_CLIENT_CERT
}

const token = process.env.BEARER_TOKEN
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"

const queries = [
  {
    string: `"I wish someone would make"`,
    query_id: "i-wish-someone-would-make"
  },
  {
    string: `"app idea"`,
    query_id: "app-idea"
  },
  {
    string: `"an app where"`,
    query_id: "an-app-where"
  },
  {
    string: `"startup-idea"`,
    query_id: "startup-idea"
  },
  {
    string: `"new product idea"`,
    query_id: "new-product-request"
  },
  {
    string: `"wouldn't it be awesome if"`,
    query_id: "wouldnt-it-be-awesome-if"
  }
]

const queriesTwo = [
  {
    string: `"does anyone know of an app"`,
    query_id: "does-anyone-know-of-an-app"
  },
  {
    string: `"i wish there was a service"`,
    query_id: "i-wish-there-was-a-service"
  },
  {
    string: `"i wish there was an app"`,
    query_id: "i-wish-there-was-an-app"
  },
  {
    string: `"wish i could find"`,
    query_id: "wish-i-could-find"
  },
  {
    string: `"i'd-pay-for-that`,
    query_id: "id-pay-for-that"
  },
  {
    string: `"#appidea"`,
    query_id: "appidea"
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

async function getTweets(array) {
  const init = array.map(async query => {
    const response = await getQuery(query)

    if (response.data) {
      response.data.forEach(element => {
        element.query_id = query.query_id
      })

      return response.data
    }
  })

  const data = await Promise.all(init)

  const dayArr = []

  data.forEach(queryArr => {
    if (queryArr) {
      queryArr.forEach(tweet => {
        dayArr.push(tweet)
      })
    }
  })

  return dayArr
}

exports.handler = async (event, context, callback) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
      databaseURL: "https://i-need-a-product-idea.firebaseio.com"
    })
  }

  const db = admin.database()
  const today = new Date(Date.now()).toISOString().substring(0, 10)
  const todayRef = db.ref(today)

  const tweets = await getTweets(queries)
  const tweetsTwo = await getTweets(queriesTwo)
  const allTweets = [...tweets, ...tweetsTwo]

  todayRef.set(allTweets)

  admin.app().delete()
}

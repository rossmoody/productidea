import { phrases } from "./event-listeners"

function setCount(i, k) {
  const count = {}

  for (const tweet of i) {
    count[tweet.query_id]
      ? count[tweet.query_id]++
      : (count[tweet.query_id] = 1)
  }

  for (const values of Object.values(k)) {
    for (const value of Object.values(values)) {
      count[value] ? null : (count[value] = 0)
      const next = document.getElementById(value).nextElementSibling
      const ele = next.nextElementSibling
      ele.textContent = count[value]
    }
  }
}

export function applyFilters(filterParams, tweets) {
  // Filter logic
  function filterLikes(tweet) {
    return tweet.public_metrics.like_count >= filterParams.likes
  }

  function filterRetweets(tweet) {
    return tweet.public_metrics.retweet_count >= filterParams.retweets
  }

  function filterPhrase(tweet) {
    return filterParams.filters[tweet.query_id]
  }

  function filterCertainWords(tweet) {
    const words = [
      "trump",
      "asshole",
      "pussy",
      "dick",
      "cock",
      "ass",
      "feet",
      "butthole",
      "piss",
      "horny",
      "clitoris",
      "hitler",
      "testicles",
      "penis",
      "vagina"
    ]

    let hasNaughtyWord = true

    words.forEach(word => {
      const title = word.charAt(0).toUpperCase() + word.slice(1)
      const upper = word.toUpperCase()

      if (
        tweet.text.includes(word) ||
        tweet.text.includes(title) ||
        tweet.text.includes(upper)
      ) {
        hasNaughtyWord = false
      }
    })

    return hasNaughtyWord ? tweet : hasNaughtyWord
  }

  function filterByTime(tweet) {
    let multiplier

    if (filterParams.time === "daily") {
      multiplier = 86400 // secs in a day
    } else if (filterParams.time === "weekly") {
      multiplier = 604800 // secs in a week
    } else if ((filterParams.time = "monthly")) {
      multiplier = 18144000 // secs in a month
    } else {
      compareTime = 1000000000
    }

    const compareTime = new Date(Date.now() - multiplier * 1000).toISOString()
    return tweet.created_at > compareTime
  }

  const timeResults = tweets
    .filter(filterByTime)
    .filter(filterLikes)
    .filter(filterRetweets)
    .filter(filterCertainWords)

  setCount(timeResults, phrases)

  const filteredResults = timeResults.filter(filterPhrase)

  // Sorting logic
  let sortBy
  if (filterParams.sortBy === "likes") {
    sortBy = "like_count"
  } else if (filterParams.sortBy === "retweets") {
    sortBy = "retweet_count"
  } else {
    sortBy = null
  }

  const sortedResults = filteredResults.sort(function (a, b) {
    return b.public_metrics[sortBy] - a.public_metrics[sortBy]
  })

  // console.log(sortedResults)
  return sortedResults
}

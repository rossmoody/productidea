export function applyFilters(filterParams, tweets) {
  // Filter logic
  function filterLikes(tweet) {
    return tweet.public_metrics.like_count >= filterParams.likes;
  }

  function filterRetweets(tweet) {
    return tweet.public_metrics.retweet_count >= filterParams.retweets;
  }

  function filterPhrase(tweet) {
    return filterParams.phrases[tweet.query_id];
  }

  function filterByTime(tweet) {
    let multiplier;

    if (filterParams.time === "daily") {
      multiplier = 864000; // secs in a day
    } else if (filterParams.time === "weekly") {
      multiplier = 604800; // secs in a week
    } else if ((filterParams.time = "monthly")) {
      multiplier = 18144000; // secs in a month
    } else {
      compareTime = 1000000000;
    }

    const compareTime = new Date(Date.now() - multiplier * 1000).toISOString();
    return tweet.created_at > compareTime;
  }

  const filteredResults = tweets
    .filter(filterLikes)
    .filter(filterRetweets)
    .filter(filterPhrase)
    .filter(filterByTime);

  // Sorting logic
  let sortBy;
  if (filterParams.sortBy === "likes") {
    sortBy = "like_count";
  } else if (filterParams.sortBy === "retweets") {
    sortBy = "retweet_count";
  } else {
    sortBy = null;
  }

  const sortedResults = filteredResults.sort(function (a, b) {
    return b.public_metrics[sortBy] - a.public_metrics[sortBy];
  });

  console.log(sortedResults);
  return sortedResults;
}

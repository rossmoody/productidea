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

  const filteredResults = tweets
    .filter(filterLikes)
    .filter(filterRetweets)
    .filter(filterPhrase);

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

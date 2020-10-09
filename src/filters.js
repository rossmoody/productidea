export function applyFilters(filterParams, tweets) {
  // Filter logic
  function filterLikes(tweet) {
    return tweet.public_metrics.like_count >= filterParams.likes;
  }

  function filterRetweets(tweet) {
    return tweet.public_metrics.retweet_count >= filterParams.retweets;
  }

  const filteredResults = tweets.filter(filterLikes).filter(filterRetweets);

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
    if (sortBy) return b.public_metrics[sortBy] - a.public_metrics[sortBy];
  });

  return sortedResults;
}

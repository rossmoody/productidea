export function renderTweets(tweets) {
  // Remove tweets
  const tweetCont = document.getElementById("tweet-container")
  tweetCont.remove()

  // Create new container
  const container = document.getElementById("container")
  const newTweetCont = document.createElement("div")
  newTweetCont.setAttribute("id", "tweet-container")
  container.appendChild(newTweetCont)

  // Temp manageable amount of tweets
  const ten = tweets.slice(0, 9)

  ten.forEach(tweet => {
    twttr.widgets.createTweet(`${tweet.id}`, newTweetCont, {
      conversation: "none",
      cards: "hidden"
    })
  })
}

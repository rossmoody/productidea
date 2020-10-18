function makeTweets(arr, node) {
  arr.forEach(tweet => {
    twttr.widgets.createTweet(`${tweet.id}`, node, {
      conversation: "none"
      // cards: "hidden"
    })
  })
}

export function renderTweets(tweets) {
  // Remove tweets
  const tweetCont = document.getElementById("tweet-container")
  tweetCont.remove()

  // Create new container
  const container = document.getElementById("container")
  const newTweetCont = document.createElement("div")
  newTweetCont.setAttribute("id", "tweet-container")
  container.appendChild(newTweetCont)

  // Load more hook
  let firstInt = 0
  let secondInt = 9

  const loadMoreBtn = document.getElementById("load-more")
  loadMoreBtn.addEventListener("click", () => {
    firstInt += 10
    secondInt += 10
    const div = document.createElement("div")
    newTweetCont.appendChild(div)
    makeTweets(tweets.slice(firstInt, secondInt), div)
  })

  makeTweets(tweets.slice(firstInt, secondInt), newTweetCont)
}

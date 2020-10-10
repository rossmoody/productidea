export function renderTweets(tweets) {
  // Remove tweets
  const tweetCont = document.getElementById("tweet-container");
  tweetCont.remove();

  // Create new container
  const container = document.getElementById("container");
  const newTweetCont = document.createElement("div");
  newTweetCont.setAttribute("id", "tweet-container");
  container.appendChild(newTweetCont);

  for (const day in tweets) {
    const obj = tweets[day];
    const tweetArr = obj.data;
    console.log(tweetArr);

    tweetArr &&
      tweetArr.forEach((tweet) => {
        twttr.widgets.createTweet(`${tweet.id}`, newTweetCont, {
          conversation: "none",
          cards: "hidden",
        });
      });
  }
}

import { filterByLikes } from "./src/utils";

function renderTweets(tweets) {
  tweets.forEach((tweet) => {
    twttr.widgets.createTweet(
      `${tweet.id}`,
      document.getElementById("container"),
      {
        conversation: "none",
        cards: "hidden",
      }
    );
  });
}

twttr.ready(function () {
  fetch("https://45a7f9eb-3cc0-43ec-9644-5c1f4f407873.mock.pstmn.io")
    .then((response) => response.text())
    .then((results) => {
      const obj = JSON.parse(results);
      const { data } = obj;
      const arr = [...data];

      renderTweets(filterByLikes(3, arr));
    })
    .catch((error) => console.log("error", error));
});

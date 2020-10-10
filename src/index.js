import { renderTweets } from "./render";

// (async function init() {
// getData();
// renderTweets(
//   applyFilters({ likes: 2, retweets: 0, sortBy: "likes" }, [...data])
// );
// eventListeners([...data]);
// })();

(async function init() {
  const response = await fetch(
    "http://localhost:3000/.netlify/functions/hello"
  );
  const json = await response.json();

  renderTweets(json);
})();

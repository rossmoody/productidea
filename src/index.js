import { renderTweets } from "./render";

// (async function init() {
// getData();
// renderTweets(
//   applyFilters({ likes: 2, retweets: 0, sortBy: "likes" }, [...data])
// );
// eventListeners([...data]);
// })();

(function init() {
  fetch(process.env.INAPI_URL, { method: "GET" })
    .then((response) => response.json())
    .then((data) => console.log(data));
})();

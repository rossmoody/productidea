import { renderTweets } from "./render";

// (async function init() {
// getData();
// renderTweets(
//   applyFilters({ likes: 2, retweets: 0, sortBy: "likes" }, [...data])
// );
// eventListeners([...data]);
// })();

(async function init() {
  const response = await fetch(process.env.INAPI_URL, {
    method: "GET",
  });
  const text = await response.text();
  console.log(text);
  const json = await response.json();
  console.log(json);
})();

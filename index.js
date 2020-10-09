import { eventListeners } from "./src/event-listeners";
import { applyFilters } from "./src/filters";
import { renderTweets } from "./src/render";

async function getData() {
  const response = await fetch(
    "https://45a7f9eb-3cc0-43ec-9644-5c1f4f407873.mock.pstmn.io"
  );
  const text = await response.text();
  const json = JSON.parse(text);
  const { data } = json;
  return [...data];
}

(function init() {
  getData().then((data) => {
    renderTweets(
      applyFilters({ likes: 2, retweets: 0, sortBy: "likes" }, data)
    );
    eventListeners(data);
  });
})();

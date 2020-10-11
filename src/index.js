import { renderTweets } from "./render";
import { applyFilters } from "./filters";
import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();

  const massiveArrayOfTweetObjects = [];

  const netlifyJson = json.data;
  console.log(netlifyJson);

  for (const dayArr in netlifyJson) {
    json[dayArr].forEach((entry) => {
      massiveArrayOfTweetObjects.push(entry);
    });
  }

  eventListeners(massiveArrayOfTweetObjects);
})();

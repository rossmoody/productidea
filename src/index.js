import { renderTweets } from "./render";
import { applyFilters } from "./filters";
import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();

  const massiveArrayOfTweetObjects = [];

  for (const dayArr in json) {
    json[dayArr].forEach((entry) => {
      massiveArrayOfTweetObjects.push(entry);
    });
  }

  eventListeners(massiveArrayOfTweetObjects);

  // // Need to target data property in Netlify
  // console.log(json.data);
})();

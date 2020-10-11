import { renderTweets } from "./render";
import { applyFilters } from "./filters";
import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();

  const massiveArrayOfTweetObjects = [];

  const netlifyJson = json.data;
  console.log(netlifyJson);

  // for (const dayArr in netlifyJson) {
  //   for (const tweet in json[dayArr]) {
  //     massiveArrayOfTweetObjects.push(tweet);
  //   }
  // }

  // The one that works on local server with Array
  for (const dayArr in netlifyJson) {
    netlifyJson[dayArr].forEach((entry) => {
      massiveArrayOfTweetObjects.push(entry);
    });
  }

  eventListeners(massiveArrayOfTweetObjects);
})();

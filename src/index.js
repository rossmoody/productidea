import { renderTweets } from "./render";
import { applyFilters } from "./filters";
import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();

  const netlifyJson = json.data;

  // for (const dayArr in json) {
  //   json[dayArr].forEach((entry) => {
  //     massiveArrayOfTweetObjects.push(entry);
  //   });
  // }

  for (const dayObj in netlifyJson) {
    const massiveArrayOfTweetObjects = Object.values(netlifyJson[dayObj]);
    console.log(massiveArrayOfTweetObjects);
    eventListeners(massiveArrayOfTweetObjects);
  }
})();

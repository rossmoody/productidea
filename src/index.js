import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();
  const massiveArrayOfTweetObjects = [];

  // Netlify function
  const netlifyJson = json.data;
  for (const dayObj in netlifyJson) {
    netlifyJson[dayObj].forEach((entry) => {
      massiveArrayOfTweetObjects.push(ent);
    });
  }

  // // Local function
  // for (const dayObj in json) {
  //   json[dayObj].forEach((entry) => {
  //     massiveArrayOfTweetObjects.push(entry);
  //   });
  // }

  eventListeners(massiveArrayOfTweetObjects);
})();

import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();
  const massiveArrayOfTweetObjects = [];

  // const test = await fetch(process.env.TWEET_URL);

  // Netlify function
  const netlifyJson = json.data;
  for (const dayObj in netlifyJson) {
    const values = Object.values(netlifyJson[dayObj]);
    values.forEach((entry) => {
      massiveArrayOfTweetObjects.push(entry);
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

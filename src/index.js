import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const test = await fetch(process.env.INAPI_URL, { method: "POST" });
  console.log(test);
  const json = await response.json();
  const massiveArrayOfTweetObjects = [];

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

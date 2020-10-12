import { eventListeners } from "./event-listeners";

(async function init() {
  const response = await fetch(process.env.INAPI_URL);
  const json = await response.json();
  const massiveArrayOfTweetObjects = [];

  //  Netlify function
  const netlifyJson = json.data;
  for (const dayObj in netlifyJson) {
    const tempArr = [];
    tempArr.push(Object.values(netlifyJson[dayObj]));

    tempArr.forEach((entry) => {
      massiveArrayOfTweetObjects.push(entry);
    });
  }

  // // Local function
  // for (const dayObj in json) {
  //   massiveArrayOfTweetObjects.push(Object.values(json[dayObj]));
  // }

  console.log(massiveArrayOfTweetObjects);
  eventListeners(massiveArrayOfTweetObjects);
})();

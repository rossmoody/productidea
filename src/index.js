import { eventListeners } from "./event-listeners"

async function init() {
  const local = JSON.parse(localStorage.getItem("tweet"))

  if (!local) {
    const response = await fetch(process.env.INAPI_URL)
    const json = await response.json()
    const netlifyJson = json.data

    const massiveArrayOfTweetObjects = []

    for (const dayObj in netlifyJson) {
      const values = Object.values(netlifyJson[dayObj])
      values.forEach(entry => {
        massiveArrayOfTweetObjects.push(entry)
      })
    }

    localStorage.setItem("tweet", JSON.stringify(massiveArrayOfTweetObjects))
    eventListeners(massiveArrayOfTweetObjects)
  } else {
    eventListeners(local)
  }
}

init()

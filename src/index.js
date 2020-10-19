import { eventListeners } from "./event-listeners"

function removeDuplicates(arr, prop) {
  return arr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

async function init() {
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

  const uniqueArr = removeDuplicates(massiveArrayOfTweetObjects, "text")
  eventListeners(uniqueArr)
}

init()

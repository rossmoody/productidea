import { eventListeners } from "./event-listeners"

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

  let chars = ["A", "B", "A", "C", "B"]

  const uniqueArr = massiveArrayOfTweetObjects.filter((value, index) => {
    return chars.indexOf(value.id) !== index
  })

  eventListeners(uniqueArr)
}

init()

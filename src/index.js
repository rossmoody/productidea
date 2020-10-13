// import { eventListeners } from "./event-listeners";

;(async function init() {
  const response = await fetch(process.env.INAPI_URL)
  const json = await response.json()
  const netlifyJson = json.data
  console.log(netlifyJson)
})()

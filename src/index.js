// import { eventListeners } from "./event-listeners";

;(async function init() {
  const response = await fetch(process.env.INAPI_URL)
  const json = await response.data.json()
  console.log(json)
  console.log(json.data)
})()

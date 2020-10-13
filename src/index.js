// import { eventListeners } from "./event-listeners";

;(async function init() {
  const response = await fetch(process.env.INAPI_URL)
  console.log(response)
  console.log(response.data)
  const json = await response.json()
  console.log(json)
  console.log(json.data)
})()

// import { eventListeners } from "./event-listeners";

;(async function init() {
  const response = await fetch(process.env.INAPI_URL)
  const json = await response.json()
  const dataObj = json.data
  console.log(dataObj)
})()

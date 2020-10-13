import { renderTweets } from "./render"
import { applyFilters } from "./filters"

export function eventListeners(tweets) {
  // Filter paramater object
  const filterParams = {
    likes: 1,
    retweets: 0,
    sortBy: "retweets", // likes, recent
    time: "daily", // weekly, monthly, yearly
    phrases: {},
    hashtags: {
      inapi: false,
      productIdea: false,
      appIdea: false
    }
  }

  const keywords = {
    iwswm: "i-wish-someone-would-make",
    gai: "great-app-idea",
    aaw: "an-app-where",
    api: "amazing-product-idea",
    npr: "new-product-request",
    dakoaa: "does-anybody-know-of-an-app",
    iwtwas: "i-wish-there-was-a-service",
    inapi: "inapi"
  }

  filterParams.phrases[keywords.iwswm] = true
  filterParams.phrases[keywords.gai] = true
  filterParams.phrases[keywords.aaw] = true
  filterParams.phrases[keywords.api] = true
  filterParams.phrases[keywords.npr] = true
  filterParams.phrases[keywords.dakoaa] = true
  filterParams.phrases[keywords.iwtwas] = true
  filterParams.phrases[keywords.inapi] = false

  //
  // Document selectors
  const iWishSomeoneWouldMake = document.getElementById(keywords.iwswm)
  const greatAppIdea = document.getElementById(keywords.gai)
  const anAppWhere = document.getElementById(keywords.aaw)
  const amazingProductIdea = document.getElementById(keywords.api)
  const newProductRequest = document.getElementById(keywords.npr)
  const doesAnybodyKnowofAnApp = document.getElementById(keywords.dakoaa)
  const iWishThereWasAService = document.getElementById(keywords.iwtwas)

  const inapi = document.getElementById(keywords.inapi)

  const minLikes = document.getElementById("min-likes")
  const minRetweets = document.getElementById("min-retweets")
  const sortBy = document.getElementById("sort")
  const time = document.getElementById("dates")

  //
  // Filter listeners
  minLikes.addEventListener("change", (event) => {
    filterParams.likes = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  minRetweets.addEventListener("change", (event) => {
    filterParams.retweets = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  sortBy.addEventListener("change", (event) => {
    filterParams.sortBy = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  time.addEventListener("change", (event) => {
    console.log(event.target.value)
    filterParams.time = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  //
  // Phrase event listeners
  iWishSomeoneWouldMake.addEventListener("change", (event) => {
    filterParams.phrases[keywords.iwswm] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  greatAppIdea.addEventListener("change", (event) => {
    filterParams.phrases[keywords.gai] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  anAppWhere.addEventListener("change", (event) => {
    filterParams.phrases[keywords.aaw] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  amazingProductIdea.addEventListener("change", (event) => {
    filterParams.phrases[keywords.api] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  newProductRequest.addEventListener("change", (event) => {
    filterParams.phrases[keywords.npr] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  doesAnybodyKnowofAnApp.addEventListener("change", (event) => {
    filterParams.phrases[keywords.dakoaa] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  iWishThereWasAService.addEventListener("change", (event) => {
    filterParams.phrases[keywords.iwtwas] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  inapi.addEventListener("change", (event) => {
    filterParams.phrases[keywords.ina] = event.target.checked
    renderTweets(applyFilters(filterParams, tweets))
  })

  renderTweets(applyFilters(filterParams, tweets))
}

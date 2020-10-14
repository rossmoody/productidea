import { renderTweets } from "./render"
import { applyFilters } from "./filters"

export function eventListeners(tweets) {
  const filterParams = {
    likes: 1,
    retweets: 0,
    sortBy: "likes", // likes, recent
    time: "daily", // weekly, monthly, yearly
    phrases: {},
    hashtags: {
      inapi: false,
      productIdea: false,
      appIdea: false
    }
  }

  const phrases = {
    iwswm: "i-wish-someone-would-make",
    gai: "great-app-idea",
    aaw: "an-app-where",
    api: "amazing-product-idea",
    npr: "new-product-request",
    dakoaa: "does-anyone-know-of-an-app",
    iwtwas: "i-wish-there-was-a-service",
    iwtwaa: "i-wish-there-was-an-app",
    wicf: "wish-i-could-find"
  }

  const hashtags = {
    inapi: "inapi",
    productIdea: "productidea",
    appIdea: "appidea"
  }

  function setPhrases() {
    for (const [key, value] of Object.entries(phrases)) {
      filterParams.phrases[phrases[key]] = true

      const listener = document.getElementById(value)
      listener.addEventListener("change", event => {
        filterParams.phrases[value] = event.target.checked
        renderTweets(applyFilters(filterParams, tweets))
      })
    }
  }

  function setHashtags() {
    for (const [key, value] of Object.entries(hashtags)) {
      filterParams.phrases[phrases[key]] = false

      const listener = document.getElementById(value)
      listener.addEventListener("change", event => {
        filterParams.phrases[value] = event.target.checked
        renderTweets(applyFilters(filterParams, tweets))
      })
    }
  }

  const minLikes = document.getElementById("min-likes")
  const minRetweets = document.getElementById("min-retweets")
  const sortBy = document.getElementById("sort")
  const time = document.getElementById("dates")

  minLikes.addEventListener("change", event => {
    filterParams.likes = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  minRetweets.addEventListener("change", event => {
    filterParams.retweets = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  sortBy.addEventListener("change", event => {
    filterParams.sortBy = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  time.addEventListener("change", event => {
    console.log(event.target.value)
    filterParams.time = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  setPhrases()
  setHashtags()
  renderTweets(applyFilters(filterParams, tweets))
}

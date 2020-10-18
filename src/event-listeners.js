import { renderTweets } from "./render"
import { applyFilters } from "./filters"
import { filterPanel } from "./mobile-filter"

export const phrases = {
  strings: {
    iwswm: "i-wish-someone-would-make",
    ai: "app-idea",
    aaw: "an-app-where",
    si: "startup-idea",
    npr: "new-product-request",
    dakoaa: "does-anyone-know-of-an-app",
    iwtwas: "i-wish-there-was-a-service",
    iwtwaa: "i-wish-there-was-an-app",
    wicf: "wish-i-could-find",
    ipft: "id-pay-for-that",
    wibai: "wouldnt-it-be-awesome-if"
  },
  hashtags: {
    appIdea: "appidea"
  }
}

export function eventListeners(tweets) {
  const filterParams = {
    likes: 1,
    retweets: 0,
    sortBy: "likes", // likes, recent
    time: "daily", // weekly, monthly, yearly
    filters: {}
  }

  function setFilters() {
    for (const values of Object.values(phrases)) {
      for (const value of Object.values(values)) {
        filterParams.filters[value] = true

        const listener = document.getElementById(value)
        listener.addEventListener("change", event => {
          filterParams.filters[value] = event.target.checked
          renderTweets(applyFilters(filterParams, tweets))
        })
      }
    }
  }

  const minLikes = document.getElementById("min-likes")
  const minRetweets = document.getElementById("min-retweets")
  const sortBy = document.getElementById("sort")
  const time = document.getElementById("dates")
  const input = document.getElementById("filter-by-keyword")
  const filterBtn = document.getElementById("filter-btn")

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
    filterParams.time = event.target.value
    renderTweets(applyFilters(filterParams, tweets))
  })

  filterBtn.addEventListener("click", () => {
    filterPanel()
  })

  let timer

  input.addEventListener("keyup", () => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      const arr = []
      const value = input.value.toUpperCase()
      tweets.forEach(tweet => {
        const textToUpper = tweet.text.toUpperCase()
        if (textToUpper.includes(value)) {
          arr.push(tweet)
        }
      })

      renderTweets(applyFilters(filterParams, arr))
    }, 500)
  })

  window.addEventListener("unload", function (event) {
    localStorage.setItem("tweets", "")
  })

  setFilters()
  renderTweets(applyFilters(filterParams, tweets))
}

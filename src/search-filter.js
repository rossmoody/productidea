export function filterBySearch(tweets) {
  const arr = []
  const input = document.getElementById("filter-by-keyword")

  input.addEventListener("keyup", () => {
    const value = input.value.toUpperCase()
    tweets.forEach(tweet => {
      if (tweet.text.includes(value)) {
        console.log(tweet.text)
        arr.push(tweet)
      }
    })
  })

  if (arr === undefined || arr.length == 0) {
    return tweets
  } else {
    return arr
  }
}

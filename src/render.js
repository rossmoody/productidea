function replaceText(node) {
  node.innerHTML = node.innerHTML.replace(/App idea/g, "poop poop poop poop")
}

function makeTweets(arr, node) {
  const loader = `<svg xmlns="http://www.w3.org/2000/svg" id="loader" style="margin:auto;background:#fff" width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" display="block"><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.6790123456790123s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.6172839506172838s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.5555555555555555s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.4938271604938271s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.4320987654320987s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.3703703703703703s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.3086419753086419s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.24691358024691354s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.18518518518518515s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.12345679012345677s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="-0.061728395061728385s" repeatCount="indefinite"/></rect><rect x="47.5" y="24.5" rx="2.5" ry="2.86" width="5" height="11" fill="#4c9eeb" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7407407407407407s" begin="0s" repeatCount="indefinite"/></rect></svg>`
  node.innerHTML = loader

  twttr.ready(() => {
    arr.forEach(tweet => {
      twttr.widgets
        .createTweet(`${tweet.id}`, node, {
          conversation: "none"
          // cards: "hidden"
        })
        .then(result => {
          console.log(result)
        })
    })
  })

  twttr.events.bind("rendered", () => {
    const loader = document.getElementById("loader")
    loader && loader.remove()
  })
}

export function renderTweets(tweets) {
  // Remove tweets
  const tweetCont = document.getElementById("tweet-container")
  tweetCont.remove()

  // Create new container
  const container = document.getElementById("container")
  const newTweetCont = document.createElement("div")
  newTweetCont.setAttribute("id", "tweet-container")
  container.appendChild(newTweetCont)

  // Load more hook
  let firstInt = 0
  let secondInt = 9

  // Loader
  const loadMoreBtn = document.getElementById("load-more")

  if (tweets.length > secondInt) {
    loadMoreBtn.style.display = "flex"
    loadMoreBtn.addEventListener("click", () => {
      firstInt += 10
      secondInt += 10

      tweets.length > secondInt ? null : (loadMoreBtn.style.display = "none")
      const div = document.createElement("div")
      newTweetCont.appendChild(div)
      makeTweets(tweets.slice(firstInt, secondInt), div)
    })
  } else {
    loadMoreBtn.style.display = "none"
  }

  makeTweets(tweets.slice(firstInt, secondInt), newTweetCont)
}

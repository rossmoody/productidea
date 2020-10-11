import { renderTweets } from "./render";
import { applyFilters } from "./filters";

export function eventListeners(tweets) {
  // Filter paramater object
  const filterParams = {
    likes: 0,
    retweets: 0,
    sortBy: "retweets",
    phrases: {},
    hashtags: {
      inapi: false,
      productIdea: false,
      appIdea: false,
    },
  };

  const keywords = {
    iwswm: "i-wish-someone-would-make",
    gai: "great-app-idea",
    aaw: "an app where",
    api: "amazing product idea",
    npr: "new product request",
  };

  filterParams.phrases[keywords.iwswm] = true;
  filterParams.phrases[keywords.gai] = true;
  filterParams.phrases[keywords.aaw] = true;
  filterParams.phrases[keywords.api] = true;
  filterParams.phrases[keywords.npr] = true;

  // Document selectors
  const iWishSomeoneWouldMake = document.getElementById(keywords.iwswm);
  const greatAppIdea = document.getElementById(keywords.gai);

  const minLikes = document.getElementById("min-likes");
  const minRetweets = document.getElementById("min-retweets");
  const sortBy = document.getElementById("sort");

  // Event listeners
  minLikes.addEventListener("change", (event) => {
    filterParams.likes = event.target.value;
    renderTweets(applyFilters(filterParams, tweets));
  });

  minRetweets.addEventListener("change", (event) => {
    filterParams.retweets = event.target.value;
    renderTweets(applyFilters(filterParams, tweets));
  });

  sortBy.addEventListener("change", (event) => {
    filterParams.sortBy = event.target.value;
    renderTweets(applyFilters(filterParams, tweets));
  });

  // Phrase event listeners
  iWishSomeoneWouldMake.addEventListener("change", (event) => {
    filterParams.phrases[keywords.iwswm] = event.target.checked;
    renderTweets(applyFilters(filterParams, tweets));
  });

  greatAppIdea.addEventListener("change", (event) => {
    filterParams.phrases[keywords.gai] = event.target.checked;
    renderTweets(applyFilters(filterParams, tweets));
  });

  renderTweets(applyFilters(filterParams, tweets));
}

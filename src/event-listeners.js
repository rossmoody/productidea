import { renderTweets } from "./render";
import { applyFilters } from "./filters";

export function eventListeners(tweets) {
  // Phrase filters
  const iWouldPayFor = document.getElementById("i-would-pay-for");

  // Common filters
  const minLikes = document.getElementById("min-likes");
  const minRetweets = document.getElementById("min-retweets");

  // Sorting select
  const sortBy = document.getElementById("sort");

  const filterParams = {
    likes: 2,
    retweets: 0,
    sortBy: null,
    phrases: {
      iWishSomeoneWouldMake: "i-wish-someone-would-make",
      greatAppIdea: "great-app-idea",
      greatProductIdea: "great-product-idea",
      anAppWhere: "an-app-where",
      amazingProductIdea: "amazing-product-idea",
      iWishThereWas: "i-wish-there-was",
      newProductRequest: "new-product-request",
    },
    hashtags: {
      inapi: "#inapi",
      productIdea: "#productidea",
      appIdea: "#appidea",
    },
  };

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

  iWouldPayFor.addEventListener("change", (event) => {
    filterParams.phrases.iWouldPayFor = event.target.checked;
    renderTweets(applyFilters(filterParams, tweets));
  });
}

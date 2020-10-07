import { filterBylikes } from "./utils";

const minLikes = document.getElementById("min-likes");

minLikes.addEventListener("change", (event) => {
  filterBylikes(event.target.value);
});

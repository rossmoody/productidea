export function filterByLikes(value, data) {
  return data.filter((entry) => entry.public_metrics.like_count > value);
}

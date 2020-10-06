twttr.ready(function (twttr) {
  fetch("https://45a7f9eb-3cc0-43ec-9644-5c1f4f407873.mock.pstmn.io")
    .then((response) => response.text())
    .then((results) => {
      const arr = [];
      const obj = JSON.parse(results);
      const data = obj.data;

      for (const entry of data) {
        arr.push(entry);
      }

      const finals = data.filter(
        (entry) => entry.public_metrics.like_count > 5
      );

      finals.forEach((entry) => {
        twttr.widgets.createTweet(
          `${entry.id}`,
          document.getElementById("container"),
          {
            conversation: "none",
            cards: "hidden",
          }
        );
      });
    })
    .catch((error) => console.log("error", error));
});

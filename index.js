console.log("I am working");

fetch("https://45a7f9eb-3cc0-43ec-9644-5c1f4f407873.mock.pstmn.io")
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

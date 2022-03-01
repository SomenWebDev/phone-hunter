const searchButton = () => {
  const searchText = document.getElementById("search-input").value;
  console.log(searchText);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};
const displaySearchResult = (phones) => {
  console.log(phones);
};

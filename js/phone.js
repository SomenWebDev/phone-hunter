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
  const searchResult = document.getElementById("search-result");
  phones.forEach((phone) => {
    const div = document.createElement("div");
    // div.classList.add("col");

    div.innerHTML = `<div class="card h-100">
    <img class="card-img-top w-50 mx-auto my-2" src="${phone.image}" alt="Card image" style="width:100%">
    <div class="card-body">
      <h4 class="card-title text-center">${phone.phone_name}</h4>
      <h4 class="card-title text-center">${phone.brand}</h4>

     <div class="text-center">
        <a href="#" class="btn btn-primary px-5">Detail</a>
     </div>
    
    </div>
  </div>
    
    
    `;
    searchResult.appendChild(div);
  });
};

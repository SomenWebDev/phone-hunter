const searchResult = document.getElementById("search-result");
const phoneDetails = document.getElementById("phone-details");

const searchButton = () => {
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  console.log(searchText);
  const error = document.getElementById("error");
  if (searchText == "") {
    error.innerText = "No search result,try again";
    searchField.value = "";
    searchResult.textContent = "";
    phoneDetails.textContent = "";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length == 0) {
          error.innerText = "No search result,try again";
          searchResult.textContent = "";
        } else {
          displaySearchResult(data.data);
          error.innerText = "";
        }
      });

    searchField.value = "";
    error.innerText = "";
    phoneDetails.textContent = "";
  }
};
const displaySearchResult = (phones) => {
  console.log(phones);

  const first20Phones = phones.slice(0, 20);
  searchResult.textContent = "";

  first20Phones.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `<div class="card h-100">
    <img class="card-img-top w-50 mx-auto my-2" src="${phone.image}" alt="Card image" style="width:100%">
    <div class="card-body">
      <h4 class="card-title text-center">${phone.phone_name}</h4>
      <h4 class="card-title text-center">${phone.brand}</h4>

     <div class="text-center">
        <button onclick="loadPhoneDetail('${phone.slug}')"  class="btn btn-primary px-5">Details</button>
     </div>
    
    </div>
  </div>
    
    
    `;
    searchResult.appendChild(div);
  });
};

const loadPhoneDetail = (detail) => {
  const url = `https://openapi.programming-hero.com/api/phone/${detail}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetail(data.data));
};

const showDetail = (info) => {
  console.log(info);

  phoneDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = ` 
    <div class="card">
      <img class="card-img-top w-50 mx-auto my-2" src="${
        info.image
      }" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title text-center">${
          info?.releaseDate ? info.releaseDate : "Release Date Not Found"
        }</h5>
        
        <h6 class="text-center">${info.mainFeatures.storage}</h6>
        <h6 class="text-center">${info.mainFeatures.displaySize}</h6>
        <h6 class="text-center">${info.mainFeatures.chipSet}</h6>
        <h6 class="text-center">${info.mainFeatures.memory}</h6>
       
      </div>
    </div>
  `;
  phoneDetails.appendChild(div);
};

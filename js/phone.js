const searchButton = () => {
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  console.log(searchText);
  const error = document.getElementById("error");
  if (searchText == "") {
    error.innerText = "No search result,try again";
    searchField.value = "";
    document.getElementById("search-result").innerHTML = "";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length == 0) {
          error.innerText = "No search result,try again";
          document.getElementById("search-result").innerHTML = "";
        } else {
          displaySearchResult(data.data);
          error.innerText = "";
        }
      });

    searchField.value = "";
    error.innerText = "";
  }
};
const displaySearchResult = (phones) => {
  console.log(phones);

  const searchResult = document.getElementById("search-result");
  const first20Phones = phones.slice(0, 20);
  searchResult.innerHTML = "";

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
  const phoneDetails = document.getElementById("phone-details");

  phoneDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = ` 
    <div class="card">
      <img class="card-img-top w-50 mx-auto my-2" src="${info.image}" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
        <p class="card-text">
          <small class="text-muted">Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
  `;
  phoneDetails.appendChild(div);
};

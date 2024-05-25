const loadPhone = async(searchText =13, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);

}

const displayPhones = (phones,isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all. button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }
    // console.log('Is SHow All', isShowAll)
    // Display only first 12 phones if not show All
    if(!isShowAll){
      phones = phones .slice(0,12);
    }


    // console.log(phones.length)

    phones.forEach(phone =>{
        // console.log(phone)
        // 2.Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-white p-4 shadow-xl`;
        // 3.Set innetHTML
        phoneCard.innerHTML =`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.brand}</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>`;
        // 4.appenchild
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false)
}

// 
const handleShowDetail = async(id) =>{
  // console.log('Clicked Show Details', id);
  // Load single phone data
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);

}
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  // const phoneStorage = document.getElementById('show-detail-phone-storage');
  // phoneStorage.innerText = phone.mainFeatures.storage;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" />
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display Size:${phone.mainFeatures.displaySize}</span></p>
  <p><span>Chip Set:${phone.mainFeatures.chipSet}</span></p>
  <p><span>Memory:${phone.mainFeatures.memory}</span></p>
  <p><span>Slug:${phone.slug}</span></p>
  <p><span>Release Data:${phone.releaseDate}</span></p>
  <p><span>Brand:${phone.brand}</span></p>
  <p><span>GPS:${phone?.others?.GPS || 'No GPS'}</span></p>  `



  // Show the modal
  show_details_modal.showModal();

}



// Handle Search

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}
// Handle Search Recap

// const handleSearch1 = () =>{
//   toggleLoadingSpinner(true);
//   const searchField2 = document.getElementById('search-field2');
//   const searchText = searchField2.value;
//   console.log(searchText)
//   loadPhone(searchText)
// }

// const handleSearch2 =() => {
//   toggleLoadingSpinner(true);
//   const searchField3 = document.getElementById('search-field3');
//   const searchText = searchField3.value;
//   loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}
//handle show all
const handleShowAll = () => {
  handleSearch(true)
}

loadPhone();
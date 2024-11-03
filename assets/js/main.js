// Load Categories Button
const loadCategories = async () => {
  const url = 'https://openapi.programming-hero.com/api/peddy/categories';

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayCategories(data.categories);
  } catch (error) {
    console.log('Error: ', error);
  }
};

loadCategories();

// display categories
const displayCategories = (categories) => {
  const categoriesBtnContainer = document.getElementById(
    'categories-btn-container'
  );
  categories.forEach((categori) => {
    const { category, category_icon } = categori;
    categoriesBtnContainer.innerHTML += `
      <button onclick="loadPetsByCategory('${category}')"
        class="category-btn w-full max-w-[19.5rem] py-6 flex items-center justify-center gap-4 border border-solid border-clr-paradiso/15 rounded-[1rem]">
        <img src=${category_icon} class="size-14" />
        <span
          class="text-clr-woodsmoke text-[1.5rem] leading-[1.813rem] font-bold"
          >${category}</span
        >
      </button>
      `;
  });
  // category button click event for active class
  const categoryBtns = categoriesBtnContainer.querySelectorAll('.category-btn');
  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // remove active class from all buttons
      categoryBtns.forEach((button) => {
        button.classList.remove(
          'border-clr-paradiso',
          'rounded-[7.5rem]',
          'bg-clr-paradiso/10'
        );
        button.classList.add('border-clr-paradiso/15', 'rounded-[1rem]');
      });
      // add active class to clicked button
      btn.classList.add(
        'border-clr-paradiso',
        'rounded-[7.5rem]',
        'bg-clr-paradiso/10'
      );
      btn.classList.remove('border-clr-paradiso/15', 'rounded-[1rem]');
    });
  });
};

// Load All Pets
const loadAllPets = async (sortByPrice = false) => {
  const url = 'https://openapi.programming-hero.com/api/peddy/pets';

  try {
    const response = await fetch(url);
    const data = await response.json();
    sortByPrice ? sortPetsByPrice(data.pets) : displayAllPets(data.pets);
  } catch (error) {
    console.log('Error: ', error);
  }
};

loadAllPets();

// Load Pets by category
const loadPetsByCategory = async (category, sortByPrice = false) => {
  // insert argument in sort by price button onClick function
  if (!sortByPrice) {
    const sortByPriceBtn = document.getElementById('sort-by-price-btn');
    sortByPriceBtn.setAttribute('onclick', `sortByPrice('${category}')`);
  }

  const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    sortByPrice ? sortPetsByPrice(data.data) : displayAllPets(data.data);
    displayAllPets(data.data);
  } catch (error) {
    console.log('Error: ', error);
  }
};

// display all pets
const displayAllPets = (pets) => {
  const petCardsContainer = document.getElementById('pet-cards-container');

  // Loading spinner for 2 seconds
  petCardsContainer.classList.remove(
    'justify-self-center',
    'md:justify-self-end'
  );
  petCardsContainer.classList.add('w-full');
  petCardsContainer.innerHTML = `
  <div
    class="md:col-span-2 pc:col-span-3 py-[6.25rem] px-2 flex flex-col gap-4 items-center justify-center bg-base-200 rounded-3xl">
  <span class="da-loading da-loading-spinner da-loading-lg text-clr-paradiso"></span>
  </div>
  `;

  // display pet cards after 2 seconds
  setTimeout(() => {
    petCardsContainer.classList.add(
      'justify-self-center',
      'md:justify-self-end'
    );
    petCardsContainer.classList.remove('w-full');
    petCardsContainer.innerHTML = '';

    // check if pets are available
    const sortByPriceBtn = document.getElementById('sort-by-price-btn');
    if (pets.length === 0) {
      // disable sort by price button
      sortByPriceBtn.classList.remove(
        'bg-clr-paradiso',
        'hover:bg-clr-paradiso/60',
        'hover:text-clr-woodsmoke'
      );
      sortByPriceBtn.classList.add('bg-gray-400');
      sortByPriceBtn.disabled = true;

      // display no information available
      petCardsContainer.classList.remove(
        'justify-self-center',
        'md:justify-self-end'
      );
      petCardsContainer.classList.add('w-full');
      petCardsContainer.innerHTML = `
    <div
      class="md:col-span-2 pc:col-span-3 py-[6.25rem] px-2 flex flex-col gap-4 items-center justify-center bg-clr-woodsmoke/5 rounded-3xl">
      <img src="./assets/icons/error.webp" alt="Error icon" />
      <h3
        class="text-center text-clr-woodsmoke text-[2rem] leading-[2.438rem] font-bold">
        No Information Available
      </h3>
      <p
        class="text-clr-woodsmoke/70 text-[1rem] leading-[1.625rem] text-center">
        We are sorry, but we could not find any information about pets
        in this category. Please try another category.
      </p>
    </div>  
    `;
      return;
    }

    // enable sort by price button for available pets
    sortByPriceBtn.classList.add(
      'bg-clr-paradiso',
      'hover:bg-clr-paradiso/60',
      'hover:text-clr-woodsmoke'
    );
    sortByPriceBtn.classList.remove('bg-gray-400');
    sortByPriceBtn.disabled = false;

    // loop through pets and create pet card
    pets.forEach((pet) => {
      // create pet card and append to pet cards container
      const petCard = createPetCard(pet);
      petCardsContainer.appendChild(petCard);
    });
  }, 2000);
};

// Create Pet Card
const createPetCard = (pet) => {
  const {
    petId,
    breed,
    category,
    date_of_birth,
    price,
    image,
    gender,
    pet_name,
  } = pet;

  // get year from date_of_birth
  const year = new Date(date_of_birth).getFullYear();

  // create pet card container
  const petCardContainer = document.createElement('div');
  petCardContainer.classList =
    'max-w-[19.5rem] p-5 border border-solid border-clr-woodsmoke/10 rounded-xl';

  // pet card content
  petCardContainer.innerHTML = `  
    <!-- Pet img -->
    <img
      src=${image}
      alt=${category}
      class="max-w-full h-auto rounded-lg" />

    <!-- details -->
    <div class="mt-6">
      <h4
        class="text-clr-woodsmoke text-[1.25rem] leading-[1.5rem] font-bold">
        ${pet_name || 'Not Available'}
      </h4>
      <ul
        class="mt-2 pb-4 text-clr-woodsmoke/70 text-[1rem] leading-[1.188rem] space-y-2 border-b border-b-clr-woodsmoke/10">
        <li class="flex gap-2">
          <img src="./assets/icons/breed-icon.svg" alt="icon" />
          <span>Breed: ${breed || 'Not Available'}</span>
        </li>
        <li class="flex gap-2">
          <img src="./assets/icons/birth-icon.svg" alt="icon" />
          <span>Birth: ${year || 'Not Available'}</span>
        </li>
        <li class="flex gap-2">
          <img src="./assets/icons/gender-icon.svg" alt="icon" />
          <span>Gender: ${gender || 'Not Available'}</span>
        </li>
        <li class="flex gap-2">
          <img src="./assets/icons/price-icon.svg" alt="icon" />
          <span>Price: ${price ? '$' + price : 'Not Available'}</span>
        </li>
      </ul>
    </div>

    <!-- buttons -->
    <div class="mt-4 flex items-center justify-between gap-1">
      <button onclick="likePet(${petId})"
        class="px-[0.75rem] sm:px-[1rem] py-[0.56rem] border border-solid border-clr-paradiso/15 hover:bg-clr-paradiso/40 rounded-lg">
        <img
          src="./assets/icons/like-icon.png"
          alt="Like"
          class="w-5 h-5" />
      </button>
      <button onclick="adoptPet(${petId},this)"
        class="px-[1.12rem] py-[0.56rem] text-clr-paradiso text-[1rem] sm:text-[1.125rem] leading-[1.375rem] font-bold border border-solid border-clr-paradiso/15 hover:bg-clr-paradiso/40 rounded-lg">
        Adopt
      </button>
      <button onclick="detailsPet(${petId})"
        class="px-[1.12rem] py-[0.56rem] text-clr-paradiso text-[1rem] sm:text-[1.125rem] leading-[1.375rem] font-bold border border-solid border-clr-paradiso/15 hover:bg-clr-paradiso/40 rounded-lg">
        Details
      </button>
    </div>
  `;
  return petCardContainer;
};

// Load pets by petID
const loadPetById = async (petId) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.petData;
  } catch (error) {
    console.log('Error: ', error);
  }
};

// Like button event
const likePet = async (petId) => {
  const petData = await loadPetById(petId);
  const picContainer = document.getElementById('picture-cards-container');
  picContainer.innerHTML += `
  <div class="max-w-[7.75rem] h-[7.75rem]">
      <img
        src=${petData.image}
        alt="Dogs"
        class="max-w-full h-full object-cover rounded-lg" />    
  </div>
  `;
};

// Adopt button event
const adoptPet = async (petId, element) => {
  const petData = await loadPetById(petId);
  const adoptBtn = element;
  const adoptModal = document.getElementById('pet-adopt-modal');
  adoptModal.innerHTML = `
  <div
    class="da-modal-box max-w-[36.5rem] flex flex-col items-center gap-4">
    <img class="" src="./assets/images/adopted.png" alt="Adopting Pet" />
    <h3 class="text-clr-woodsmoke text-3xl sm:text-5xl font-bold">Congrates!</h3>
    <p class="text-center text-[1.25rem] leading-[1.625rem]">
      <span class="text-[1.5rem] text-clr-paradiso font-bold">${petData.pet_name}</span> found a loving home. <br />
      Your pet adoption process started. <br /> 
      <p id="modal-countdown"></p>
    </p>
  </div>
  `;
  // open modal
  adoptModal.classList.add('da-modal-open');

  // close modal countdown
  let count = 3;
  const countdown = document.getElementById('modal-countdown');
  const interval = setInterval(() => {
    countdown.innerHTML = `<span class="da-badge da-badge-info">${count}</span>`;
    if (count === 1) {
      adoptBtn.textContent = 'Adopted';
      adoptBtn.classList.add('bg-clr-paradiso/10', 'text-clr-paradiso');
      adoptBtn.disabled = true;
      setTimeout(() => {
        adoptModal.classList.remove('da-modal-open');
        clearInterval(interval);
      }, 600);
    }
    count--;
  }, 1000);
};

// Details button event
const detailsPet = async (petId) => {
  const petData = await loadPetById(petId);
  const {
    breed,
    category,
    date_of_birth,
    price,
    image,
    gender,
    pet_name,
    vaccinated_status,
    pet_details,
  } = petData;

  // get year from date_of_birth
  const year = new Date(date_of_birth).getFullYear();

  // Pet details modal
  const petDetailsModal = document.getElementById('pet-details-modal');
  petDetailsModal.innerHTML = `
  <div class="da-modal-box max-w-[43.75rem] flex flex-col bg-white p-4 md:p-8">
    <div class="max-w-full h-[20rem]">
      <img
        src="${image}"
        alt="${category}"
        class="w-full h-full object-cover rounded-lg" />
    </div>
    <!-- content -->
    <div class="mt-6">
      <h4
        class="text-clr-woodsmoke text-[1.5rem] leading-[1.813rem] font-bold">
        ${pet_name || 'Not Available'}
      </h4>
      <div
        class="flex items-start gap-8 mt-4 pb-8 mb-8 border-b border-b-clr-woodsmoke/10">
        <ul
          class="text-clr-woodsmoke/70 text-[1rem] leading-[1.188rem] space-y-2">
          <li class="flex gap-2">
            <img src="./assets/icons/breed-icon.svg" alt="icon" />
            <span>Breed: ${breed || 'Not Available'}</span>
          </li>
          <li class="flex gap-2">
            <img src="./assets/icons/gender-icon.svg" alt="icon" />
            <span>Gender: ${gender || 'Not Available'}</span>
          </li>
          <li class="flex gap-2">
            <img src="./assets/icons/gender-icon.svg" alt="icon" />
            <span>Vaccinated status: ${
              vaccinated_status || 'Not Available'
            }</span>
          </li>
        </ul>
        <ul
          class="text-clr-woodsmoke/70 text-[1rem] leading-[1.188rem] space-y-2">
          <li class="flex gap-2">
            <img src="./assets/icons/birth-icon.svg" alt="icon" />
            <span>Birth: ${year || 'Not Available'}</span>
          </li>
          <li class="flex gap-2">
            <img src="./assets/icons/price-icon.svg" alt="icon" />
            <span>Price: ${price ? '$' + price : 'Not Available'}</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <h5
        class="mb-3 text-clr-woodsmoke text-[1rem] leading-[1.188rem] font-semibold">
        Details Information
      </h5>
      <p class="text-clr-woodsmoke/70 text-[1rem] leading-[1.188rem]">
      ${pet_details || 'Not Available'}
      </p>
    </div>
    <button
      id="modal-close-btn"
      class="mt-6 w-full py-[0.81rem] bg-clr-paradiso/10 hover:bg-clr-paradiso/60 text-clr-paradiso hover:text-clr-woodsmoke duration-300 text-[1.25rem] leading-[1.5rem] font-bold rounded-[0.5rem] border-none">
      Close
    </button>
  </div>
  `;
  showModal('pet-details-modal', 'modal-close-btn');
};

// Modal Function
function showModal(modalId, closeId) {
  const modalOpen = document.getElementById(modalId);
  const modalClose = document.getElementById(closeId);
  modalOpen.classList.add('da-modal-open');
  modalClose.addEventListener('click', function () {
    modalOpen.classList.remove('da-modal-open');
  });
}

// Sort by price button event
const sortByPrice = (category = '') => {
  if (!category) {
    loadAllPets(true);
    return;
  }
  loadPetsByCategory(category, true);
};
// const sortByPrice = document.getElementById('sort-by-price-btn');
// sortByPrice.addEventListener('click', () => {
//   loadAllPets(true);
// });

// Sort by price function
const sortPetsByPrice = (pets) => {
  pets.sort((price1, price2) => price2.price - price1.price);
  displayAllPets(pets);
};

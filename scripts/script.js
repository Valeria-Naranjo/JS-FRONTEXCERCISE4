console.log("hola mundo");

const cards = [{
  image: "https://images.pexels.com/photos/32599518/pexels-photo-32599518.jpeg",
  name: "Cancún",
}, {
  image: "https://images.pexels.com/photos/31386383/pexels-photo-31386383.jpeg",
  name: "Cancún",
}, {
  image: "https://images.pexels.com/photos/32733417/pexels-photo-32733417.jpeg",
  name: "Tlaxcala",
}];

// selectors
const travelerProfileDetails = document.querySelector(".traveler-profile__details");
const travelerProfileName = travelerProfileDetails.querySelector(".traveler-profile__name");
const travelerProfileBio = travelerProfileDetails.querySelector(".traveler-profile__bio");
const travelerProfileEditBtn = document.querySelector(".traveler-profile__edit-btn");
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const placesGalleryList = document.querySelector(".places-gallery__list");
const modalProfile = document.querySelector("#modal-id-profile");
const modalNewPlace = document.querySelector("#modal-new-place");
const modalImage = document.querySelector("#modal-image-view");
const modalCloseBtns = document.querySelectorAll(".modal__close-btn");
//cuando la variable viene en plural significa que es array
//Si no pones el Array.from genera un objeto en lugar de un objeto
const modalInputs = Array.from(document.querySelectorAll(".modal__input"));
const modalForms=Array.from(document.querySelectorAll(".modal__form"));

// Modal profile
const formEditProfile = document.querySelector("#form-edit-profile");
const profileNameInput = document.querySelector("#profile-name");
const profileBioInput = document.querySelector("#profile-description");

// new place modal
const formNewPlace = document.querySelector("#form-new-place");
const placeTitleInput = document.querySelector("#place-title");
const placeImageUrlInput = document.querySelector("#place-image-url");

// funcion to close/open modals
function toggleModal(modal) {
  modal.classList.toggle("modal_is-opened");
}

// Event listeners to close modals
modalCloseBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    toggleModal(modal);
  });
});

// Event listener to stop update
modalNewPlace.addEventListener("submit",(evt)=> {
  evt.preventDefault();
});

// Mshow modal to edit profile
travelerProfileEditBtn.addEventListener("click", () => {
  profileNameInput.value = travelerProfileName.textContent;
  profileBioInput.value = travelerProfileBio.textContent;
  toggleModal(modalProfile);
});

// save profile changes
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  travelerProfileName.textContent = profileNameInput.value;
  travelerProfileBio.textContent = profileBioInput.value;
  toggleModal(modalProfile);
});

// Modal to add new place 
travelerProfileAddPlaceBtn.addEventListener("click", () => {
  formNewPlace.reset();
  toggleModal(modalNewPlace);
});

// Add new place 
formNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  const newCard = {
    image: placeImageUrlInput.value,
    name: placeTitleInput.value
  };
  
  createCard(newCard);
  toggleModal(modalNewPlace);
});

// new cards function 
function createCard(card) {
  const templatePlaceCard = document.querySelector("#template-place-card").content.cloneNode(true);
  const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
  const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");
  const placeCardDeleteBtn = templatePlaceCard.querySelector(".place-card__delete-button");

  placeCardImage.src = card.image;
  placeCardImage.alt = card.name;
  placeCardTitle.textContent = card.name;

  placeCardDeleteBtn.addEventListener("click", (evt) => {
    evt.target.closest(".place-card").remove();
  });

  //to like a card
  const placeCardLikeButton = templatePlaceCard.querySelector(
        ".place-card__like-button"
    );

    placeCardLikeButton.addEventListener("click", () =>{
        console.log("Me encorazona");
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    });

  placesGalleryList.appendChild(templatePlaceCard);
}

// add initial cards
cards.forEach(card => {
  createCard(card);
});

//modal input 
modalForms.forEach((modalForm)=>{
  const modalButton=modalForm.querySelector(".modal__button");
  modalInputs.forEach((modalInput)=>{
    modalInput.addEventListener("input", ()=>{
       console.log("Escribiendo"); 
        const modalError = document.querySelector("#" + modalInput.id + "-error");  
          //place-title
       if (!modalInput.validity.valid){
        modalError.textContent = "Hay un error"
        modalError.classList.add("modal__error_visible");
       }else{
      modalError.textContent = "";
      modalError.classList.remove("modal__error_visible");
        
       }
       //Las propiedades que toma en cuenta son que tengan required, min_length max_lenght y type
    });
  });
});

//  profile name
travelerProfileName.textContent = "Valeria Naranjo";

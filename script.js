const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

const rootUrl = "https://api.unsplash.com/";
const apiKey = "API_KEY";
const limit = 10;
const requestUrl = `${rootUrl}/photos/random/?client_id=${apiKey}&count=${limit}`;

let totalPhotos = 0;
let isReady = false;
let loadedPhotos = 0;

async function getPhotos() {
  loader.hidden = false;

  try {
    const response = await fetch(requestUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }

  loader.hidden = true;
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    const imageLink = document.createElement("a");
    setAttributes(imageLink, { href: photo.links.html, target: "_blank" });
    imageLink.appendChild(img);
    imageLink.addEventListener("loaded", () => {
      loadedPhotos++;
      if (loadedPhotos === totalPhotos) {
        isReady = true;
      }
    });

    imageContainer.appendChild(imageLink);
    totalPhotos++;
  });
}

window.addEventListener("scroll", () => {
  if (!isReady) return;

  const scrolled = window.innerHeight + window.scrollY;
  const offset = document.body.offsetHeight - 1000;
  if (scrolled >= offset) {
    isReady = false;
  }
});

getPhotos();

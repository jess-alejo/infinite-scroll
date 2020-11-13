const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const rootUrl = "https://api.unsplash.com/";
const maxSize = 30;

let photosArray = [];
let totalPhotos = 0;
let loadedPhotos = 0;
let isReady = false;

async function getPhotos(limit) {
  try {
    loader.hidden = false;
    requestUrl = `${rootUrl}/photos/random/?client_id=${apiKey}&count=${limit}`;
    const response = await fetch(requestUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
    loader.hidden = true;
  }
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
    img.addEventListener("load", imageLoaded);

    const imageLink = document.createElement("a");
    setAttributes(imageLink, { href: photo.links.html, target: "_blank" });
    imageLink.appendChild(img);

    imageContainer.appendChild(imageLink);
    totalPhotos++;
  });
}

function imageLoaded() {
  loadedPhotos++;
  console.log("Images loaded", loadedPhotos);
  if (loadedPhotos === totalPhotos) {
    isReady = true;
    loader.hidden = true;
  }
}

window.addEventListener("scroll", () => {
  if (!isReady) return;

  const scrolled = window.innerHeight + window.scrollY;
  const offset = document.body.offsetHeight - 600;
  if (scrolled >= offset) {
    isReady = false;
    getPhotos(maxSize);
  }
});

// On Load
getPhotos(5);

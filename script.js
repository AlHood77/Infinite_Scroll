const apiKey = `kBBx87b9TG72Z8mvtPjX_mmUsJF-bBRXToswlUK014M`;
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for Links and Photos, Add to DOM
function displayPhotos() {
    // run function for each object 
    photosArray.forEach((photo) => {
        //  create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank')
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// fetch pics from Unsplash

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayPhotos();       
    } catch (error) {
        // catch error here
    }
}

// on load
getPhotos();
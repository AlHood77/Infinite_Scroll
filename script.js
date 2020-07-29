const apiKey = `kBBx87b9TG72Z8mvtPjX_mmUsJF-bBRXToswlUK014M`;


const count = 10;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// fetch pics from Unsplash

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);        
    } catch (error) {
        // catch error here
    }
}

// on load
getPhotos();
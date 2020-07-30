const imageContainer = document.getElementById('image-container');

const button = document.getElementById('twitter-btn')
const loader = document.getElementById('loader');



let photosArray = [];

const apiKey = `h_Pi7YDOzj6t-CSxJHHrpqn3eMNfxbhXnZbigskBr7U`;
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for Links and Photos, Add to DOM
function displayPhotos() {
    // run function for each object 
    photosArray.forEach((photo) => {
        //  create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.id = "unsplash-image"
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

        // create footer div
        const footer = document.createElement('div')
        // give div a class
        footer.className = "image-footer";
        footer.id = "footer"
        // put div inside image continer
        imageContainer.appendChild(footer);

        // create likes div
        const likes = document.createElement('div')
        // give div a class
        likes.className = "likes-container";
        likes.id = "likes-container"
        // put div inside footer continer
        footer.appendChild(likes);

        // Create <i> for likes icon
        const heart = document.createElement('i');
        // give heart icon class name
        heart.className = "fas fa-heart";
        // Put <i> inside likes container
        likes.appendChild(heart);

        // Create <p> for number of photo likes
        const numberOfLikes = document.createElement('p');
        numberOfLikes.id ="num-likes"
        numberOfLikes.innerText = photo.likes
        likes.appendChild(numberOfLikes)

        // create twitter div
        const twitterShare = document.createElement('div')
        // give div a class
        twitterShare.className = "twitter";
        // put div inside footer continer
        footer.appendChild(twitterShare);

         // Create <button> for twitter share
        const twitterButton = document.createElement('button');
         // give heart icon class name
        twitterButton.className = "twitter-btn";
        twitterButton.id ="twitter-btn"
         // Put <i> inside likes container
        twitterShare.appendChild(twitterButton);
        
         // Create <i> for twitter button
         const twitterIcon = document.createElement('i');
         // give twitter icon class name
         twitterIcon.className = "fab fa-twitter";
         // Put <i> inside likes container
        twitterButton.appendChild(twitterIcon);
        
         // create views div
         const viewsContainer = document.createElement('div')
         // give div a class
         viewsContainer.className = "views-container";
         // put div inside footer continer
        footer.appendChild(viewsContainer);

        // Create <i> for views icon
        const view = document.createElement('i');
        // give heart icon class name
        view.className = "fas fa-eye";
        // Put <i> inside likes container
        viewsContainer.appendChild(view);

        // Create <p> for number of photo views
        const numberOfViews = document.createElement('p');
        numberOfViews.innerText = photo.views
        viewsContainer.appendChild(numberOfViews)

    });
}

// fetch pics from Unsplash

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();       
    } catch (error) {
        // catch error here
    }
}


// Event Delegation
document.querySelector('body').addEventListener('click', function (e) {
    const image = document.getElementById('unsplash-image')
    const selectedImage = image.innerHTML
    
    const twitterURL = `https://twitter.com/intent/tweet?url=${selectedImage}`;
    if (e.target.id === 'twitter-btn') {
        window.open(twitterURL, '_blank')
    } 
})

// on load
getPhotos();
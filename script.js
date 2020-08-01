const imageContainer = document.getElementById('image-container');
const button = document.getElementById('twitter-btn')
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = config.MY_KEY;
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
    // assign key const(href, src, etc) in atrributes
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // run function for each object 
    photosArray.forEach((photo) => {
        //  create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // create header div
        const header = document.createElement('div')
        // give div a class
        header.className = "image-header";
        header.id = "header"
        // put div inside image continer
        imageContainer.appendChild(header);

        // create profile div
        const profile = document.createElement('div')
        // give div a class
        profile.className = "profile-container";
        profile.id = "likes-container"
        // put div inside header continer
        header.appendChild(profile);

        // Create <p> for profile div
        const username = document.createElement('p');
        username.className = "username"
        username.innerText =' photo by' + ' ' + photo.user.username 
        header.appendChild(username)

         // Create <img> for profile div
        //  const profileImg = document.createElement('img');
        //  img.id = "profile-img"
        //  // img.setAttribute('src', photo.urls.regular);
        //  // img.setAttribute('alt', photo.alt_description);
        //  // img.setAttribute('title', photo.alt_description);
        //  setAttributes(img, {
        //      src: photo.user.links.portfolio,
        //      alt: photo.username,
        //      title: photo.username
        //  });
        // header.appendChild(profileImg)

        // Create <img> for photo
        const img = document.createElement('img');
        img.id = "unsplash-image"
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

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
        numberOfLikes.className ="num-likes"
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
        numberOfViews.className ="num-views"
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
    const selectedImage = image.src
    
    const twitterURL = `https://twitter.com/intent/tweet?url=${selectedImage}`;
    if (e.target.id === 'twitter-btn') {
        window.open(twitterURL, '_blank')
    } 
})

// check to see if scrolling near bottom of page, Load More Pics
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    } 
})

// on load
getPhotos();
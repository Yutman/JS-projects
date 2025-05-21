const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let isLoading = false; // Prevent multiple simultaneous requests
let page = 1; // Track pagination for Unsplash API

// Unsplash API
const count = 30;
const apiKey = 'GUOAFbQive3Q1BcHwt28Bq23goUfVNrHszEvMHFMd6w';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Fix setAttributes function to correctly set element attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]); // Use attributes[key] instead of attributes
    }
}

// Create elements for links and photos
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank', // Fixed typo: '_blanks' to '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description || 'Unsplash image', // Fallback for null alt_description
            title: photo.alt_description || 'Unsplash image',
        });

        // Put <img> inside <a>, then append to imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    if (isLoading) return; // Prevent multiple fetches
    isLoading = true;
    loader.hidden = false; // Show loader

    try {
        const response = await fetch(`${apiUrl}&page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        photosArray = await response.json();
        displayPhotos();
        page++; // Increment page for next fetch
    } catch (error) {
        console.error('Error fetching photos:', error);
        // Optionally display an error message to the user
        imageContainer.insertAdjacentHTML('beforeend', '<p>Error loading images. Please try again later.</p>');
    } finally {
        isLoading = false;
        loader.hidden = true; // Hide loader
    }
}

// Infinite scroll logic
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        !isLoading
    ) {
        getPhotos(); // Fetch more photos when near bottom
    }
});

// On load
getPhotos();
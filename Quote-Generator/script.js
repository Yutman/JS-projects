const quoteContainer  = document.getElementById('quote-container');
const quoteText = document.getElementById('quote'); // Quote text
const authorText = document.getElementById('author'); // Author text
const twitterBtn = document.getElementById('twitter'); // Twitter button
const newQuoteBtn = document.getElementById('new-quote'); // New quote button
const loader = document.getElementById('loader'); // Loader

let apiQuotes = []; // I'm using let here instead of a const because I will be reassigning the variable later

// Show loading
function loading() {
    loader.hidden = false; // Show loader
    quoteContainer.hidden = true; // Hide quote container
}

// Hide loading
function complete() {
    quoteContainer.hidden = false; // Show quote container
    loader.hidden = true; // Hide loader
}

// Show new quote
function newQuote() {
    loading(); // Show loader
    //  Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   if (!quote.author) {
    authorText.textContent = 'Unknown'; // If no author, set to unknown
   } else {
    authorText.textContent = quote.author; // Set author text
   }
//  Check quote length to determine styling
   if (quote.text.length > 100) {
    quoteText.classList.add('long-quote'); // Add class for long quotes
   } else {
    quoteText.classList.remove('long-quote');
   }
   //Set Quote, Hide Loader
    quoteText.textContent = quote.text; // Set quote text
    complete(); // Hide loader
}

//  Get quotes from the API

async function getQuotes() {
    loading(); // Show loader
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
   try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
       newQuote();
   } catch (error) {
        // Handle error
   }
}

// Tweet quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // Open in new tab
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote); // New quote button
twitterBtn.addEventListener('click', tweetQuote); // Twitter button

// On load
getQuotes();

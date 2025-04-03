let apiQuotes = []; // I'm using let here instead of a const because I will be reassigning the variable later
// Show new quote
function newQuote() {
    //  Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

//  Get quotes from the API

async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
   try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
       newQuote();
   } catch (error) {
        // Handle error
   }
}

// On load
getQuotes();
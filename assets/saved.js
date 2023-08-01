var quotesEl = document.getElementById("quotes");

 // Retrieve saved quotes from local storage or initialize as an empty array
function printQuotes() {
  var savedQuotes =
    JSON.parse(window.localStorage.getItem("SavedQuotes")) || [];   // Iterate through each saved quote and create corresponding DOM elements
  savedQuotes.forEach(function (quote) {    // Create the container element for each quote
    var oneQuoteEl = document.createElement("div");   // Create elements to display the quote text, author, and additional information
    var quoteline = document.createElement("p");
    var author = document.createElement("a");
    var fact1 = document.createElement("P");
    var fact2 = document.createElement("p");
      // Set the text content for each element based on the saved quote data
    quoteline.textContent = '"' + quote.quotesX + '"';
    author.textContent = "Author: " + quote.name;
    var wikiAuthor = quote.name.replaceAll(" ", "_");
    author.href = "https://en.wikipedia.org/wiki/" + wikiAuthor;
    oneQuoteEl.setAttribute(
      "class",
      "card m-3 column is-mobile is-offset-one-quarter is-3 is-relative is-responsive has-text-left"
    );
    quoteline.setAttribute("class", "subtitle");
    if (
      quote.dob != "See Wikipedia Article" ||
      quote.title != "See Wikipedia Article"
    ) {
      fact2.textContent = "Born: " + quote.dob;
      fact1.textContent = "Title: " + quote.title.replaceAll("_", " "); 
      // Set the attributes and classes for the container element
      oneQuoteEl.appendChild(quoteline);
      oneQuoteEl.appendChild(author);
      oneQuoteEl.appendChild(fact1);
      oneQuoteEl.appendChild(fact2);
    } else {
      oneQuoteEl.appendChild(quoteline);
      oneQuoteEl.appendChild(author);
      var seeWiki = document.createElement("p");
      seeWiki.textContent = "See Wikipedia Article for more information";
      oneQuoteEl.appendChild(seeWiki);
    }

    quotesEl.appendChild(oneQuoteEl);

    wikipediaPreview.init({
      detectLinks: true,
    });
  });
}
// Function to clear the quote history and reload the page
function clearHistory() {
  window.localStorage.removeItem("SavedQuotes");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHistory;
printQuotes(); // Print the saved quotes when the page loads

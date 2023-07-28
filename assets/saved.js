var quotesEl = document.getElementById("quotes");

function printQuotes() {
  var savedQuotes =
    JSON.parse(window.localStorage.getItem("SavedQuotes")) || [];
  savedQuotes.forEach(function (quote) {
    var oneQuoteEl = document.createElement("div");
    var quoteline = document.createElement("p");
    var author = document.createElement("p");
    var fact1 = document.createElement("P");
    var fact2 = document.createElement("p");
    quoteline.textContent = quote.quotesX;
    author.textContent = quote.author;
    fact2.textContent = "Born: " + quote.dob;
    fact1.textContent = "Title: " + quote.title.replaceAll("_", " ");
    oneQuoteEl.setAttribute(
      "class",
      "card has-background-light mb-3 is-relative is-responsive has-text-centered"
    );
    oneQuoteEl.appendChild(quoteline);
    oneQuoteEl.appendChild(author);
    oneQuoteEl.appendChild(fact1);
    oneQuoteEl.appendChild(fact2);

    quotesEl.appendChild(oneQuoteEl);
  });
}

function clearHistory() {
  window.localStorage.removeItem("SavedQuotes");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHistory;
printQuotes();

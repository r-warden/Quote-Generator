var quotesEl = document.getElementById("quotes");

function printQuotes() {
  var savedQuotes =
    JSON.parse(window.localStorage.getItem("SavedQuotes")) || [];
    savedQuotes.forEach(function (quote) {
    var oneQuoteEl = document.createElement("div");
    var quoteline = document.createElement("p");
    var author = document.createElement("a");
    var fact1 = document.createElement("P");
    var fact2 = document.createElement("p");
    quoteline.textContent = quote.quotesX;
    author.textContent = "Author: " + quote.name;
    var wikiAuthor = quote.name.replaceAll(" ", "_");
    author.href = "https://en.wikipedia.org/wiki/" + wikiAuthor;
    oneQuoteEl.setAttribute(
      "class",
      "card has-background-light mb-3 is-relative is-responsive has-text-centered"
    );
    if (quote.dob!="See Wikipedia Article" || quote.title!="See Wikipedia Article"){
      fact2.textContent = "Born: " + quote.dob;
      fact1.textContent = "Title: " + quote.title.replaceAll("_", " ");
      oneQuoteEl.appendChild(quoteline);
      oneQuoteEl.appendChild(author);
      oneQuoteEl.appendChild(fact1);
      oneQuoteEl.appendChild(fact2);
    }
    else {
      oneQuoteEl.appendChild(quoteline);
      oneQuoteEl.appendChild(author);
      var seeWiki = document.createElement("p");
      seeWiki.textContent="See Wikipedia Article for more information";
      oneQuoteEl.appendChild(seeWiki);
    }
    
    quotesEl.appendChild(oneQuoteEl);
    
    wikipediaPreview.init({
      detectLinks: true,
    });
  });
}

function clearHistory() {
  window.localStorage.removeItem("SavedQuotes");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHistory;
printQuotes();

var getQuoteBtn = document.getElementById("get-quote");
var quoteEl = document.getElementById("quote");
var authorEl = document.getElementById("author");
var quoteArea = document.getElementById("quote-area");
var savequotebtn = document.getElementById("save-quote");
var currentquote = "";
var currentauthor = "";
var fact1 = "";
var fact2 = "";

var getAuthor = function getAuthor(event) {
  event.preventDefault();
  var category = random_category();
  fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
    method: "GET", //GET is the default.
    headers: { "X-Api-Key": "s6+WMAEYzVKHWRIkfCszQQ==uBXREA4OMYGwbEC8" },
    contentType: "application/json",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var quote = data[0].quote;
      quoteEl.textContent = '"'  + quote + '"';
      savequotebtn.setAttribute(
        "class",
        "button card-footer-item is-medium is-clickable"
      );
      var author = data[0].author.toString();
      currentquote = quote;
      currentauthor = author;
      //creating a link to the wikipedia page of the quote's author for the preview
      var authorLink = document.createElement("a");
      var wikiAuthor = author.replaceAll(" ", "_");
      authorLink.href = "https://en.wikipedia.org/wiki/" + wikiAuthor;
      authorLink.textContent = author;
      authorEl.textContent = " -";
      console.log(author);
      authorEl.appendChild(authorLink);
      document.getElementById("wiki-preview-notice").style.visibility =
        "visible";
      //calls the wiki preview functionality to detect any links to wiki pages
      document.getElementById("quote").style.textAlign =
        "left";
      wikipediaPreview.init({
        detectLinks: true,
      });
    });
};
var authorInfo = function () {
  fetch("https://api.api-ninjas.com/v1/celebrity?name=" + currentauthor, {
    method: "GET",
    headers: { "X-Api-Key": "s6+WMAEYzVKHWRIkfCszQQ==uBXREA4OMYGwbEC8" },
    contentType: "application/json",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data[0]) {
        fact1 = data[0].occupation[0];
        fact2 = data[0].birthday;
        savequote();
        console.log(fact1);
        console.log(fact2);
      } else if (data[0] === undefined) {
        fetch(
          "https://api.api-ninjas.com/v1/historicalfigures?name=" +
            currentauthor,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "s6+WMAEYzVKHWRIkfCszQQ==uBXREA4OMYGwbEC8",
            },
            contentType: "application/json",
          }
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data[0]);
            if (data[0]) {
              fact1 = data[0].title;
              fact2 = data[0].info.born;
              savequote();
              console.log(fact1);
              console.log(fact2);
            } else {
              fact1 = "See Wikapedia Article";
              fact2 = "See Wikapedia Article";
              savequote();
            }
          });
      }
    });
};
function random_category() {
  let categories = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success",
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

function savequote() {
  var savedquote = JSON.parse(window.localStorage.getItem("SavedQuotes")) || [];
  console.log(fact1);
  console.log(fact2);
  var quote = {
    quotesX: currentquote,
    name: currentauthor,
    dob: fact2,
    title: fact1,
  };
  savedquote.push(quote);
  window.localStorage.setItem("SavedQuotes", JSON.stringify(savedquote));
}
savequotebtn.addEventListener("click", authorInfo);
getQuoteBtn.addEventListener("click", getAuthor);

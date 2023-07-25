var category = "happiness";
var gitArthor = function (category) {
  fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
  method: "GET", //GET is the default.
  headers: { "X-Api-Key": "s6+WMAEYzVKHWRIkfCszQQ==uBXREA4OMYGwbEC8" },
  contentType: "application/json",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data[0]);
    var author = data[0].author.toString();
    console.log(author);
    var names = author;
    arthorInfo(names);
})
}

var arthorInfo = function(names) {
  fetch("https://api.api-ninjas.com/v1/celebrity?name=" + names, {
      method: "GET",
      headers: { "X-Api-Key": "s6+WMAEYzVKHWRIkfCszQQ==uBXREA4OMYGwbEC8" },
      contentType: "application/json",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data[0]);
        if (data[0] === undefined) {
          fetch(
            "https://api.api-ninjas.com/v1/historicalfigures?name=" + names,
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

              if (data[0] === undefined) {
                location.reload();
              }
            });
        }
      });

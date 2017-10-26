var animals = ["Ferret", "Snake", "Elephant", "Tiger"];

function renderButtons() {

  $("#giphy-view").empty();

  for (var i = 0; i < animals.length; i++) {

    var a = $("<button>");
    a.addClass("animal");
    a.attr("data-animal", animals[i]);
    a.text(animals[i]);
    $("#giphy-view").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var animal = $("#animal-input").val().trim();
  if (animal === "") {
    alert("Please enter an animal!")
  }else {
    animals.push(animal);
  }

  renderButtons();
  $("#animal-input").val("")
});

renderButtons();

$(document).on("click", "button", function() {
  var animalButton = $(this).attr("data-animal");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animalButton + "&api_key=1HsskORACMGtrsNmfvfqx2sVYtOLd7z8&limit=10";


  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");

          animalImage.addClass("gif")
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animated", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");

          gifDiv.append(p);
          gifDiv.append(animalImage);


          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});

$(document).on("click", ".gif", function() {
  var state =  $(this).attr("data-state");
  console.log(state);

  if(state === "still"){
    $(this).attr("src", $(this).attr("data-animated"));
    $(this).attr("data-state", "animated");
  }else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})

$(document).ready(function () {
  var texts = [
    "Greetings!! Welcome to Parsemon, a random card duel game for Pokemon enthusiasts...",
    "Click the 'draw' button to draw a card and start the game. Good luck, trainers!!",
  ];
  var currentTextIndex = 0;

  function animateText(text) {
    var index = 0;
    var intervalId = setInterval(function () {
      $("#animated-text").text(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust speed here (in milliseconds)
    setTimeout(function () {
      $("#animated-text").fadeIn();
    }, text.length * 100); // Adjust delay based on text length and animation speed
  }

  function nextText() {
    if (currentTextIndex < texts.length - 1) {
      currentTextIndex++;
      if (currentTextIndex === texts.length - 1) {
        $("#continue-btn").text("Close");
        $("#continue-btn").removeClass("waves-effect waves-light"); // Remove button effect for the "Close" button
        $("#continue-btn").off("click"); // Remove previous click event handler
        $("#continue-btn").on("click", function () {
          // Add new click event handler for the "Close" button
          $("#animated-text").fadeOut();
          $(this).prop("disabled", true);
          $("#close-btn").fadeOut(); // Hide the close button when closing the div
        });
        $("#close-btn").fadeIn(); // Show the close button when displaying the second text
        $("#animated-text").css("display", "block").empty(); // Display the div and clear any previous content
        animateText(texts[currentTextIndex]); // Call animateText for the next text
      } else {
        $("#animated-text")
          .empty()
          .fadeOut(function () {
            animateText(texts[currentTextIndex]); // Call animateText for the next text
          });
      }
    } else {
      $("#animated-text").fadeOut();
      $(this).prop("disabled", true);
    }
  }

  function closeDiv() {
    $("#animated-text").fadeOut();
    $("#continue-btn").prop("disabled", true);
    $("#close-btn").fadeOut(); // Hide the close button when closing the div
    $("#landing").css("display", "none"); // Hide the landing text div
    $("#trainer").css("display", "none"); // Hide the trainer image
  }

  animateText(texts[currentTextIndex]);

  $("#continue-btn").on("click", nextText);
  $("#close-btn").on("click", closeDiv); // Event listener for the close button
});
$(document).ready(function () {
  // Function to randomly choose between two image sources
  function getRandomImageSrc() {
    var images = [
      "./assets/images/cody-trainer.svg",
      "./assets/images/mary-trainer.svg",
    ];
    var randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  // Set the src attribute of #trainer-div with the randomly chosen image source
  var randomImageSrc = getRandomImageSrc();
  $("#trainer-div").html(
    `<img src="${randomImageSrc}" alt="Trainer Image" id="trainer"/>`
  );

  // Check if the screen width is less than or equal to 599px
  if (window.matchMedia("(max-width: 600px)").matches) {
    $("#trainer").css("bottom", "62%");
  }
});

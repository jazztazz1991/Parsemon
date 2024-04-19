$(document).ready(function () {
  // Initialize Materialize components
  $("select").formSelect();
  $(".modal").modal(); // Initialize modal

  // Load selected cards on page load
  displaySelectedCards();

  // Event handler for pokemon type dropdown change
  $("#pokemonType").change(function () {
    const type = $(this).val();
    console.log("Selected Pokémon type:", type);
    displaySortedPokemon(type);
  });

  // Attach click event handler to selected cards to remove them
  $("#selected-cards").on("click", "div", function () {
    const cardName = $(this).text();
    const selectedCards =
      JSON.parse(localStorage.getItem("selectedCards")) || [];
    const updatedSelectedCards = selectedCards.filter(
      (card) => card.name !== cardName
    );
    localStorage.setItem("selectedCards", JSON.stringify(updatedSelectedCards));
    displaySelectedCards();
  });

  // Event handler for category dropdown change
  $("#category").change(function () {
    const category = $(this).val();
    if (category === "pokemon") {
      $("#pokemonTypeDropdown").css("display", "block");
      displaySortedPokemon("passing this info");
    } else {
      $("#pokemonTypeDropdown").css("display", "none");
      displayCategoryCards(category);
    }
  });

  // Event handler for pokemon type dropdown change
  $("#pokeTypeDropdown").change(function () {
    const type = $(this).val();
    console.log("Selected Pokémon type:", type);
    displaySortedPokemon(type);
  });

  // Function to display selected cards
  function displaySelectedCards() {
    $("#selected-cards").empty();
    const selectedCards =
      JSON.parse(localStorage.getItem("selectedCards")) || [];
    selectedCards.forEach((card) => {
      const cardDiv = $("<div>").text(card.name);
      $("#selected-cards").append(cardDiv);
    });
  }

  // Function to display cards based on category
  function displayCategoryCards(category) {
    $("#deckBuilder").empty(); // Clear previous cards
    if (category === "trainer") {
      displayTrainers();
    } else if (category === "energy") {
      displayEnergy();
    }
  }

  // Function to fetch and display trainers
  async function displayTrainers() {
    try {
      $("#loadingModal").modal("open"); // Open loading modal
      const cards = await fetchTrainers();
      displayCards(cards);
    } catch (error) {
      console.error(error);
    } finally {
      $("#loadingModal").modal("close"); // Close loading modal
    }
  }

  // Function to fetch and display energy cards
  async function displayEnergy() {
    try {
      $("#loadingModal").modal("open"); // Open loading modal
      const cards = await fetchEnergy();
      displayCards(cards);
    } catch (error) {
      console.error(error);
    } finally {
      $("#loadingModal").modal("close"); // Close loading modal
    }
  }

  // Function to fetch and display Pokemon cards based on type
  async function displayPokemon(type) {
    try {
      console.log("Fetching Pokémon cards for type:", type);
      $("#loadingModal").modal("open"); // Open loading modal
      const cards = await fetchPokemon(type);
      displayPokeCards(cards);
    } catch (error) {
      console.error(error);
    } finally {
      $("#loadingModal").modal("close"); // Close loading modal
    }
  }
  // Function to fetch and display Pokemon cards based on type
  async function displaySortedPokemon(type) {
    try {
      console.log("Fetching Pokémon cards for type:", type);
      $("#loadingModal").modal("open"); // Open loading modal
      const cards = await fetchPokemon(type);
      console.log("***** CARDS FROM DISPLAYSORTEDPOKEMON *****");
      displaySortedPokeCards(cards);
    } catch (error) {
      console.error(error);
    } finally {
      $("#loadingModal").modal("close"); // Close loading modal
    }
  }

  // Fetch trainers from the API
  async function fetchTrainers() {
    try {
      const response = await fetch(
        "https://api.pokemontcg.io/v2/cards?q=supertype:Trainer"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Trainer cards");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  // Fetch energy cards from the API
  async function fetchEnergy() {
    try {
      const response = await fetch(
        "https://api.pokemontcg.io/v2/cards?q=supertype:Energy"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Energy cards");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  // Fetch Pokemon cards from the API based on type
  async function fetchPokemon(type) {
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v1/cards?types=${type}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon cards");
      }
      const data = await response.json();
      return data.cards;
    } catch (error) {
      throw error;
    }
  }

  // Function to display cards
  function displayCards(cards) {
    $("#deckBuilder").empty(); // Clear previous cards
    cards.forEach((card) => {
      displayCard(card);
    });
  }
  // Function to display cards
  function displayPokeCards(cards) {
    $("#deckBuilder").empty(); // Clear previous cards
    console.log("***** CARDS AFTER TYPE SELECTED *****");
    cards.forEach((card) => {
      displayCard(card);
    });
  }
  // Function to display cards
  function displaySortedPokeCards(cards) {
    $("#deckBuilder").empty(); // Clear previous cards
    console.log("***** CARDS AFTER TYPE SELECTED *****");
    cards.forEach((card) => {
      displaySortedCard(card);
    });
  }

  // Function to display a card
  function displayCard(card) {
    const display = $("#deckBuilder");
    const cardDiv = $("<div>")
      .addClass("card col s12 m6 l3")
      .attr("data-cardid", card.id);
    const imgDiv = $("<div>").addClass("card-image");
    const cardImg = $("<img>");
    if (card.images && card.images.small) {
      cardImg.attr("src", card.images.small);
    } else {
      cardImg.attr("src", "./assets/images/paceholder.jpeg"); // Provide a fallback image or handle the case accordingly
    }
    const addBtn = $("<button>")
      .addClass("material-icons add-to-deck card-btn")
      .attr("data-cardid", card.id)
      .text("add_circle")
      .on("click", function () {
        addToSelectedCards(card);
      });
    const removeBtn = $("<button>")
      .addClass("material-icons remove-from-deck card-btn")
      .attr("data-cardid", card.id)
      .text("remove_circle")
      .on("click", function () {
        removeFromSelectedCards(card);
      });
    imgDiv.append(cardImg);
    cardImg.append(addBtn, removeBtn);
    cardDiv.append(imgDiv);
    display.append(cardDiv);
  }
  // Function to display a card
  function displaySortedCard(card) {
    const display = $("#deckBuilder");
    const cardDiv = $("<div>")
      .addClass("card col s12 m6 l3")
      .attr("data-cardid", card.id);
    const imgDiv = $("<div>").addClass("card-image");
    const cardImg = $("<img>");
    if (card.imageUrl) {
      cardImg.attr("src", card.imageUrl);
    } else {
      cardImg.attr("src", "./assets/images/paceholder.jpeg"); // Provide a fallback image or handle the case accordingly
    }
    const addBtn = $("<button>")
      .addClass("material-icons add-to-deck card-btn")
      .attr("data-cardid", card.id)
      .text("add_circle")
      .on("click", function () {
        addToSelectedCards(card);
      });
    const removeBtn = $("<button>")
      .addClass("material-icons remove-from-deck card-btn")
      .attr("data-cardid", card.id)
      .text("remove_circle")
      .on("click", function () {
        removeFromSelectedCards(card);
      });
    imgDiv.append(cardImg);
    cardImg.append(addBtn, removeBtn);
    cardDiv.append(imgDiv);
    display.append(cardDiv);
  }

  // Function to add a card to the user's selected cards
  function addToSelectedCards(card) {
    let selectedCards = JSON.parse(localStorage.getItem("selectedCards")) || [];
    selectedCards.push(card);
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
  }

  // Function to remove a card from the user's selected cards
  function removeFromSelectedCards(card) {
    let selectedCards = JSON.parse(localStorage.getItem("selectedCards")) || [];
    selectedCards = selectedCards.filter((c) => c.id !== card.id);
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
    displaySelectedCards();
  }
});

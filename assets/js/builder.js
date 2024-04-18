document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);

  // Show/hide Pokemon Type dropdown based on selected category
  var categoryDropdown = document.getElementById("category");
  var pokemonTypeDropdown = document.getElementById("pokemonTypeDropdown");

  categoryDropdown.addEventListener("change", function () {
    if (categoryDropdown.value === "pokemon") {
      pokemonTypeDropdown.style.display = "block";
    } else {
      pokemonTypeDropdown.style.display = "none";
    }
  });
});

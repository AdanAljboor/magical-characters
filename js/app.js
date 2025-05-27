const container = document.getElementById("charactersContainer");
const filter = document.getElementById("houseFilter");

let allCharacters = [];

function fetchCharacters() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      allCharacters = data;
      renderCharacters(allCharacters);
    })
    .catch((error) => {
      console.error("Error fetching character data:", error);
    });
}

function createCharacterCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";

  const img = document.createElement("img");
  img.src = character.image || "images/not-found.png";
  img.onerror = () => {
    img.src = "images/not-found.png";
  };
  img.alt = character.name;

  const name = document.createElement("h3");
  name.textContent = character.name;

  const house = document.createElement("p");
  house.textContent = `House: ${character.house || "Unknown"}`;

  const dob = document.createElement("p");
  dob.textContent = `DOB: ${character.dateOfBirth || "Unknown"}`;

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(house);
  card.appendChild(dob);

  return card;
}

function renderCharacters(characters) {
  container.innerHTML = "";

  characters.slice(0, 16).forEach((character) => {
    const card = createCharacterCard(character);
    container.appendChild(card);
  });
}
function filterCharactersByHouse() {
  const selectedHouse = filter.value;

  const filtered =
    selectedHouse === "All"
      ? allCharacters
      : allCharacters.filter((character) => character.house === selectedHouse);

  renderCharacters(filtered);
}

filter.addEventListener("change", filterCharactersByHouse);

fetchCharacters();

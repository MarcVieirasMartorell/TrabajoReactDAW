export const animals = [
    {
      id: 1,
      name: "Yuki",
      species: "Cat",
      age: "7 years",
      size: "Medium",
      sex: "male",
      photo: "/animals/yuki.jpeg",
      description: "Yuki is a reserved cat who enjoys napping and birdwatching. He is looking for a quiet home with a patient owner who can give him the love and attention he deserves.",
    },
    {
      id: 2,
      name: "Niko",
      species: "Cat",
      age: "5 years",
      size: "Medium",
      sex: "male",
      photo: "/animals/niko.jpg",
      description: "Niko is a playful cat who loves chasing toys and lounging in the sun. He is looking for a forever home with a loving family who can keep up with his energy.",
    },
    {
      id: 3,
      name: "Midir",
      species: "Bird",
      age: "1 year",
      size: "Small",
      sex: "female",
      photo: "/animals/midir.jpeg",
      description: "Midir is a sweet bird who enjoys company and playing with her toys. She is looking for a caring owner who can provide her with a safe and loving environment.",
    },
  ];
 // Selecciona el contenedor de animales destacados
const featuredAnimalsContainer = document.getElementById("featured-animals");

// Genera dinámicamente las tarjetas de animales
animals.forEach((animal) => {
  const animalCard = document.createElement("div");
  animalCard.className = "animal-card";

  animalCard.innerHTML = `
    <img src="${animal.image}" alt="${animal.name}" class="animal-image">
    <h3>${animal.name}</h3>
    <p><strong>Species:</strong> ${animal.species}</p>
    <p><strong>Age:</strong> ${animal.age}</p>
    <p><strong>Size:</strong> ${animal.size}</p>
    <p><strong>Sex:</strong> ${animal.sex}</p> <!-- Sexo añadido -->
    <button class="info-button" data-id="${animal.id}">Más información</button>
  `;

  featuredAnimalsContainer.appendChild(animalCard);
});

// Agrega eventos a los botones de "Más información"
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("info-button")) {
    const animalId = event.target.getAttribute("data-id");
    window.location.href = `/src/animal.html?id=${animalId}`;
  }
});
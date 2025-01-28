// Selecciona el contenedor de animales destacados
const featuredAnimalsContainer = document.getElementById("featured-animals");

// Cargar los datos de los animales desde el archivo JSON
fetch('/animals.json')
  .then(response => response.json())
  .then(animals => {
    // Genera dinámicamente las tarjetas de animales
    animals.forEach((animal) => {
      const animalCard = document.createElement("div");
      animalCard.className = "animal-card";

      animalCard.innerHTML = `
        <img src="${animal.photo}" alt="${animal.name}" class="animal-image">
        <h3>${animal.name}</h3>
        <p><strong>Species:</strong> ${animal.species}</p>
        <p><strong>Age:</strong> ${animal.age}</p>
        <p><strong>Size:</strong> ${animal.size}</p>
        <p><strong>Sex:</strong> ${animal.sex}</p>
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
  })
  .catch(error => console.error("Error al cargar los animales:", error));

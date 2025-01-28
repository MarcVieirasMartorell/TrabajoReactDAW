// Selecciona el formulario de filtros
const filterForm = document.getElementById('filter-form');

// Selecciona el contenedor donde se mostrarán los resultados
const animalsListContainer = document.getElementById('animals-list');

// Cargar los datos de los animales desde el archivo JSON
fetch('/animals.json')
  .then(response => response.json())
  .then(animals => {
    // Función para mostrar los animales filtrados
    const displayAnimals = (filteredAnimals) => {
      animalsListContainer.innerHTML = ''; // Limpiar resultados anteriores

      // Si no hay animales que coincidan con el filtro, mostrar un mensaje
      if (filteredAnimals.length === 0) {
        animalsListContainer.innerHTML = '<p>No animals match your filters.</p>';
      }

      // Mostrar las tarjetas de los animales
      filteredAnimals.forEach(animal => {
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
        animalsListContainer.appendChild(animalCard);
      });
    };

    // Mostrar todos los animales inicialmente
    displayAnimals(animals);

    // Añadir un listener al formulario de filtros
    filterForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Obtener los valores de los filtros
      const speciesFilter = document.getElementById('species').value;
      const ageFilter = document.getElementById('age').value;
      const sizeFilter = document.getElementById('size').value;
      const sexFilter = document.getElementById('sex').value;

      // Filtrar los animales basados en los filtros seleccionados
      const filteredAnimals = animals.filter(animal => {
        return (
          (speciesFilter === '' || animal.species === speciesFilter) &&
          (ageFilter === '' || animal.age === ageFilter) &&
          (sizeFilter === '' || animal.size === sizeFilter) &&
          (sexFilter === '' || animal.sex === sexFilter)
        );
      });

      // Mostrar los animales filtrados
      displayAnimals(filteredAnimals);
    });
  })
  .catch(error => console.error('Error al cargar los animales:', error));

  // Añadir evento de clic al botón de más información en ambos archivos

const handleInfoButtonClick = (event) => {
    if (event.target.classList.contains("info-button")) {
      const animalId = event.target.getAttribute("data-id");
      window.location.href = `/src/animal.html?id=${animalId}`;
    }
  };
  
  // Luego, llama a esta función tanto en `main.js` como en `filter.js`
  document.addEventListener("click", handleInfoButtonClick);
  
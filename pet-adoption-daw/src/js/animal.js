// Obtener el ID del animal desde la URL
const urlParams = new URLSearchParams(window.location.search);
const animalId = parseInt(urlParams.get('id')); // Convertir el id a número
console.log('Animal ID:', animalId);

// Cargar los datos del animal desde el archivo JSON
fetch('/animals.json')
  .then(response => response.json())
  .then(animals => {
    console.log('Animals data:', animals); // Para depuración

    const animal = animals.find(a => a.id === animalId); // Compara los ids como números
    console.log('Selected animal:', animal); // Para depuración

    if (animal) {
      const animalDetailsContainer = document.getElementById('animal-details');

      animalDetailsContainer.innerHTML = `
        <div class="animal-container">
          <!-- Foto y nombre a la izquierda -->
          <div class="animal-left">
            <h2>${animal.name}</h2>
            <img src="${animal.photo}" alt="${animal.name}" class="animal-image">
          </div>

          <!-- Detalles a la derecha -->
          <div class="animal-right">
            <p><strong>Species:</strong> ${animal.species}</p>
            <p><strong>Age:</strong> ${animal.age}</p>
            <p><strong>Size:</strong> ${animal.size}</p>
            <p><strong>Sex:</strong> ${animal.sex}</p>
            <p><strong>Description:</strong> ${animal.description}</p>


            <!-- Botón para contactar -->
            <a href="/src/contact.html" class="contact-button">Interested in Adopting?</a>
          </div>
        </div>
      `;
    } else {
      console.error('Animal not found');
    }
  })
  .catch(error => console.error('Error al cargar el animal:', error));

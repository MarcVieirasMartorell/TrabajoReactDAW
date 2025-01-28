// Inicializa EmailJS con tu clave pública
emailjs.init("lIolOPGUpAE0Tk58t"); // Sustituye con tu clave pública de EmailJS

// Selecciona el formulario y el campo de la imagen
const contactForm = document.getElementById("contact-form");
const photoInput = document.getElementById("photo");

// Variable para almacenar la imagen en Base64
let base64Image = "";

// Convierte la imagen a Base64 cuando el usuario selecciona un archivo
photoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      base64Image = reader.result; // Guardamos la imagen convertida a Base64
    };

    reader.readAsDataURL(file); // Convierte la imagen seleccionada
  }
});

// Añadir un event listener para manejar el envío del formulario
contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que se recargue la página al enviar

  // Recoger los datos del formulario manualmente
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    photo_base64: base64Image, // Agregamos la imagen en Base64
  };

  // Enviar los datos del formulario a través de EmailJS
  emailjs
    .send("service_ayl55ck", "template_3nyg4m8", formData) // Cambia con tu Service ID y Template ID
    .then(
      () => {
        alert("Mensaje enviado con éxito. ¡Gracias por contactarnos!");
        contactForm.reset(); // Limpia el formulario después del envío
        base64Image = ""; // Limpia la variable de la imagen
      },
      (error) => {
        console.error("Error al enviar:", error);
        alert("Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.");
      }
    );
});

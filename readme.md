# Pet Adoption DAW

## Descripción
Pet Adoption DAW es una aplicación web diseñada como trabajo final de DIW (Diseño de Interfaces WEB), con el objetivo de encontrarles nuevos dueños a animales que, por circunstancias de la vida, no disponen de un lugar al que llamar hogar definitivo. La aplicación busca proporcionar una experiencia agradable al usuario durante la búsqueda de su futura mascota. Podrá navegar para ver las diferentes opciones que se encuentran disponibles, ver sus características y detalles, y posteriormente ponerse en contacto con el equipo de PetHaven (Empresa ficticia).

## Características
- Navegar por las mascotas disponibles
- Ver información detallada sobre cada mascota
- Contactar con el personal de la empresa
- Autenticación de usuarios y gestión de mascotas
- Acceso a bases de datos

## Instalación
1. Clona el repositorio:
    ```
    git clone https://github.com/yourusername/pet-adoption-daw.git
    ```
2. Colócate con la terminal en el directorio del proyecto:
    ```
    cd pet-adoption-daw
    ```
3. Instalar dependencias (ya preparadas en package.json):
    ```
    npm install
    ```

## Uso
1. Inicia el servidor de desarrollo:
    ```
    npm run dev
    ```
2. Abre tu navegador y navega a `http://localhost:PUERTO`.

# Estructura del código

## Components

### Navbar 

Navbar es la barra de navegación superior. Esta permite la navegación entre diferentes páginas de la web como Search, About, Contact, etc... Para el icono del logo y de las diferentes páginas he utilizado la librería lucide-react (esta misma librería ha sido utilizada en la mayoría de iconos de la web).

### Footer

Footer es el pie de página donde encontraremos accesos directos a diferentes búsquedas por filtro. Al hacer click en alguna de las opciones, el usuario es redirigido a Search.tsx con un filtro aplicado en el URL, agilizango el proceso de búsqueda. Los enlaces vienen cargados en una constante en json, y son añadidos a la parte final del enlace base de la página web (localhost:PUERTO).

### Petcard

Petcard es la plantilla que usan todas las instancias de un animal en Home y Search. He elegido hacer una plantilla porque permite hacer modular a la web y evita tener que hardcodear datos una y otra vez. De esta manera, simplemente se aplica este formato a cada objeto "pet" y va pasando los diferentes atributos a cada parte correspondiente.

Cada objeto pet tiene las siguientes propiedades en la base de datos:
  ```
    id
    name
    age
    breed
    imageUrl
    description
    
  ```

La información se encuentra en la base de datos de supabase.

### PetForm

Este componente es un formulario en React que permite a los usuarios agregar o editar información sobre una mascota y se utiliza en la página Admin.tsx. A continuación se explica cada parte del componente:

Incluye campos como nombre, tipo, raza, edad, descripción y URL de la imagen. También maneja el estado del formulario y la autenticación para determinar si un usuario puede enviar la información.

### ThemeToggle

Es un botón que permite a los usuarios alternar entre los modos de tema claro y oscuro. Utiliza el hook  useTheme para gestionar el estado del tema y actualizar la interfaz de usuario en consecuencia.

## Hooks

### Hook useTheme
El hook useTheme se utiliza para gestionar el tema oscuro y claro de una aplicación. Aquí debajo dejo una explicación de cómo funciona:

- Estado Inicial:

Utiliza el hook useState para definir un estado isDark que determina si el tema actual es oscuro.
El estado inicial se establece comprobando si hay un tema guardado en localStorage. Si no hay un tema guardado, se verifica si el usuario prefiere el tema oscuro mediante window.matchMedia.

- Efecto:

Utiliza el hook useEffect para aplicar el tema correspondiente cada vez que isDark cambia.
Si isDark es true, se añade la clase dark al elemento raíz del documento (document.documentElement) y se guarda el tema como dark en localStorage.
Si isDark es false, se elimina la clase dark y se guarda el tema como light en localStorage.

- Función para Alternar Tema:

Define una función toggleTheme que invierte el valor de isDark.

- Retorno:

El hook retorna un objeto con el estado isDark y la función toggleTheme para que puedan ser utilizados en los componentes.

## Lib

### supabase.ts

Este archivo se encarga de configurar y exportar un cliente de Supabase para interactuar con la base de datos. A continuación, se explica cada parte del archivo:

Primero se importan createClient desde la librería supabase-js y Database, que es un type creado por mí que luego mostraré. createClient se usa para crear una instancia del ciente de Supabase y Database se usa para tipar ccorrectamente las operaciones con la base de datos. Por otro lado tenemos supabaseUrl que y supabaseAnonKey, que están definidas en el archivo .env. Al juntar estos elementos de la forma en la que se encuentra en el archivo, creamos una conexión a la base de datos.

## Types

### supabase.ts

Aquí define la estructura de la base de datos utilizada en la aplicación. Este tipo contiene una tabla llamada pets que almacena información sobre mascotas. La tabla pets tiene tres subtipos: Row, Insert y Update, que se utilizan para representar una fila de datos, una inserción de datos y una actualización de datos.

Concretamente, Row representa una fila completa en la tabla pets, Insert representa los datos necesarios para insertar una nueva fila en la tabla pets y Update los datos necesarios para actualizar una fila existente en la tabla pets. 

## Pages

### Home

La página Home.tsx es la página principal de la aplicación, donde los usuarios pueden explorar y filtrar una lista de mascotas disponibles para adopción. En esta página se usan varias importaciones:

useState y useEffect de React para manejar el estado y los efectos secundarios.
motion de framer-motion para animaciones.
supabase para interactuar con la base de datos.
PetCard para mostrar la información de cada mascota.
Tipos Pet y PetType para definir la estructura de los datos. (Estos se encuentran en types.ts en la carpeta raíz del proyecto)

Por otro lado, la página utiliza tres estados principales:

selectedType: para almacenar el tipo de mascota seleccionado por el usuario (por defecto, 'all').
pets: para almacenar la lista de mascotas obtenidas de la base de datos.
isLoading: para indicar si los datos están siendo cargados.
Efecto useEffect
El useEffect se ejecuta una vez al montar el componente y llama a la función fetchPets para obtener la lista de mascotas desde la base de datos.

Función fetchPets
Esta función es asíncrona y realiza una consulta a la tabla pets en la base de datos utilizando supabase. Ordena los resultados por la fecha de creación en orden descendente. Si la consulta es exitosa, actualiza el estado pets con los datos obtenidos. Si ocurre un error, se muestra en la consola. Finalmente, se actualiza el estado isLoading a false.

También se utiliza renderizado condicional:
Cargando: Si isLoading es true, se muestra un mensaje de "Cargando mascotas...".
Contenido Principal: Si los datos ya están cargados, se muestra el contenido principal de la página, que incluye:

Por último, como en la mayoría de páginas excepto admin, se utilizan animaciones suaves de framer motion, concretamente una animación llamada motion, aunque también hay hovers para las PetCards y más.

### Search

En esta página los usuarios pueden hacer búsquedas con filtros para encontrar diferentes mascotas que coinciden que distintas características. Se puede filtrar por nombre o raza, especie, edad mínima y edad máxima.

La página se parece mucho en funcionamiento a Home.tsx, añadiendo la función de filtrado de mascotas mediante campos.

### About

La página About.tsx es una sección informativa de la aplicación que proporciona detalles sobre los eventos de puertas abiertas, la ubicación de PetHaven, el equipo de trabajo y los patrocinadores. A continuación se describen las principales funcionalidades y secciones de esta página:

La página importa varios módulos y componentes necesarios para su funcionamiento, incluyendo datos del personal, iconos, hooks y componentes de mapas de react-leaflet.

Funciones importantes:
generateCalendarDays: Esta función genera los días del calendario para un mes específico, incluyendo días del mes anterior y siguiente para completar una cuadrícula de 42 días (6 semanas).

isOpenHouseSaturday: Esta función determina si una fecha específica es un sábado de puertas abiertas, que ocurre cada dos semanas.

### PetDetails

Esta página muestra los detalles de una mascota específica. Al hacer click en una petcard, se te redigirá a esta página con la información del animal escogido cargada y  preparada para ser visualizada.

La página obtiene el ID del animal desde el URL usando useParams. Definimos dos estados, isLoading para cuando se está cargando la información y pet para almacenar los datos de las mascotas. También usa useEffect para llamar a la función fetchPet cuando el ID cambia. FetchPet como tal es igual a antes, realiza una consulta a la base de datos y tiene cierto manejo de errores. Aprovechando el uso del estado isLoading, aplico también renderizado condicional.

### Admin

Esta página permite a los administradores gestionar la base de datos, concretamente permite acceder a PetForm para insertar o actualizar algún animal o para eliminarlos. A continuación, se describen las funcionalidades principales y cómo se implementan:

Primero se importan varios módulos y componentes necesarios como el anteriormente mencionado PetForm.
Pasamos a las funciones principales: Se verifica con checkAuth si el usuario está autenticado.
Con handleLogout y handleLogin se manejan el cerrar e iniciar sesión. fetchPets es igual a las anteriores veces que lo he mencionado.
handleSubmit se encarga de la adición y edición de mascotas. handleEdit abre el modal de edición y carga los datos de la mascota seleccionada en el formulario de PetForm. Por último, handleDelete se encarga de eliminar la mascota de la base de datos.

### Contact

Esta página permite al usuario mandar un correo electrónico usando la libreria EmailJS al personal de PetHaven a través de un formulario. El envío del formulario funciona mediante una serie de estados:

formRef, que referencia al formulario, base64Image, que está para almacenar la imagen en formato base64 (debido al plan gratuito que contraté en la página oficial de EmailJS, las imagenes solo pueden ser de hasta 50kb), formData, para almacenar los datos de dicho formulario, y isSubmitting, que maneja el estado de envío de formulario. Como en el resto de páginas, hay animaciones y renderizado condicional.

## Archivos Raíz

### App.tsx

Este archivo es el componente principal de la aplicación y configura las rutas usando react-router-dom, definiendo así la estructura básica de la interfaz de usuario.

En sí el componente App es una función que retorna la estructura de la aplicación y encontramos lo siguiente:
Router, que envuelve toda la app para permitir la funcionalidad de enrutamiento; el div principal, la navbar, Routes, que define las rutas de la aplicación; y el footer.

### data.ts

Este archivo contiene dos constantes en json que contienen información de prueba de los animales y la información final de los veterinarios. Debería haber eliminado la información de las mascotas porque solo lo usé al principio para pruebas, ahora ya no se utiliza.

### index.css

index.css contiene estilos personalizados y utiliza TailwindCSS, como el resto del proyecto.

Al principio del archivo se importan las capas base, componentes y utilidades de TailwindCSS y cada parte del archivo bajo las líneas @layer base/components/utilities, afectará dicha capa, aplicando estilos de manera estructurada y ordenada. Además de esto, también encontraremos estilos para el mapa.

### main.tsx

Es el punto de entrada principal de la app. Este archivo configura y monta la aplicación en el elemento HTML con el id root, aplicando los estilos previamente mencionados y utilizando el StrictMode de React para ayudar en el desarrollo temprano (ya que te permite encontrar bugs comunes en los componentes).

### types.ts

Aquí se definen las estructuras de datos mediante interfaces de las mascotas y de los empleados.

### vite-env.d.ts

Este archivo es una declaración de tipos para TypeScript que se usa en proyectos que utilicen Vite. La única línea de código que hay hace referencia a los tipos proporcionados por Vite para el cliente. Estos tipos ayudan a TypeScript a entender las características específicas de Vite cuando se desarrolla en el entorno del navegador (cliente).

## Últimos archivos a mencionar

### Paquetes

Es donde se declaran las dependencias necesarias para el correcto funcionamiento del proyecto, para instalarlas tendremos que movernos a la carpeta del proyecto:
```
cd TrabajoReactDAW
```
```
cd pet-adoption-daw
```
```
npm install
```

Así podremos instalarlas de un solo golpe y el proyecto deberá funcionar.

### index.html

Llama a main.tsx y es el punto de entrada donde React renderiza todos los componentes de la interfaz.

### supabase/migrations

Aquí se encuentran las migraciones de la base de datos, al hacer la conexión a supabase la migración se importa al proyecto por seguridad.
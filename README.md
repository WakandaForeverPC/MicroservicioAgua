# Microservicio de Gestión de Agua

Este proyecto es un microservicio para la gestión de agua en una ciudad, desarrollado con Spring Boot y Maven. 
Incluye una interfaz gráfica que muestra un tablero con carreteras, edificios y puntos de reciclaje, así como un gráfico de consumo de agua.

## Tecnologías Utilizadas

- **Java**
- **JavaScript**
- **Spring Boot**
- **Maven**
- **Thymeleaf**
- **Chart.js**

## Estructura del Proyecto

- `src/main/java/com/proyecto/microservicioagua/`
  - `MicroservicioAguaApplication.java`: Clase principal que inicia la aplicación Spring Boot.
  - `controller/AguaController.java`: Controlador que maneja las solicitudes HTTP para la vista del tablero de agua.

- `src/main/resources/`
  - `application.properties`: Archivo de configuración de Spring Boot.
  - `templates/board-agua.html`: Plantilla HTML para la vista del tablero de agua.
  - `static/agua/`
    - `script.js`: Script JavaScript que genera el tablero y maneja la lógica de visualización.
    - `styles.css`: Archivo CSS que define los estilos para el tablero y los elementos visuales.

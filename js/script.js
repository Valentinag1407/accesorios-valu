document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos de entrada
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;

    // Simulación de inicio de sesión (puedes reemplazar esto con tu lógica de autenticación real)
    if (correo === "majo10@gmail.com" && password === "majo123") {
        // Inicio de sesión exitoso
        alert("Inicio de sesión exitoso. ¡Bienvenido!");
        window.location.href = "/index.html";
    } else {
        // Credenciales incorrectas
        alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
});
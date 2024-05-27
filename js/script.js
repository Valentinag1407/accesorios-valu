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

// CODIGO DE FORMULARIO DE COMPRA -----------------
document.getElementById("registrar").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos de entrada
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var pais = document.getElementById("pais").value;
    var departamento = document.getElementById("departamento").value;
    var ciudad = document.getElementById("ciudad").value;
    var barrio = document.getElementById("barrio").value;
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;

    alert(`
    Compra realizada correctamente con los datos: 
    - Nombre: ${nombre}
    - Apellido: ${apellido}
    - Pais: ${pais}
    - Departamento: ${departamento}
    - Ciudad: ${ciudad}
    - Barrio: ${barrio}
    - Dirección: ${direccion}
    - Telefono: ${telefono}`);

    // Restablecer el formulario para limpiar todos los campos
    document.getElementById("registrar").reset();

    // Cerrar el modal después del envío
    document.getElementById("registrarse").style.display = 'none';

    // Limpiar el carrito al cerrar el modal
    vaciarCarrito();
    ocultarCarrito();
});

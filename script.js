const carrito = [];
const contador = document.getElementById("contador");
const itemsCarrito = document.getElementById("itemsCarrito");
const total = document.getElementById("total");

const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const carritoPanel = document.getElementById("carrito");
const overlay = document.getElementById("overlay");

document.querySelectorAll(".agregar").forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.nombre;
        const precio = Number(btn.dataset.precio);

        carrito.push({ nombre, precio });

        actualizarCarrito();
    });
});

function actualizarCarrito() {
    itemsCarrito.innerHTML = "";

    let suma = 0;

    carrito.forEach(producto => {
        const item = document.createElement("div");

        item.classList.add("item");

        item.innerHTML = `
            <p>${producto.nombre}</p>
            <strong>$${producto.precio}</strong>
        `;

        itemsCarrito.appendChild(item);

        suma += producto.precio;
    });

    contador.textContent = carrito.length;
    total.textContent = `Total: $${suma.toLocaleString("es-AR")}`;
}

abrirCarrito.addEventListener("click", () => {
    carritoPanel.classList.add("activo");
    overlay.classList.add("activo");
});

cerrarCarrito.addEventListener("click", () => {
    carritoPanel.classList.remove("activo");
    overlay.classList.remove("activo");
});

overlay.addEventListener("click", () => {
    carritoPanel.classList.remove("activo");
    overlay.classList.remove("activo");
});

document.getElementById("vaciar").addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito();
});

document.getElementById("finalizar").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola, quiero comprar:%0A";

    carrito.forEach(producto => {
        mensaje += `• ${producto.nombre} - $${producto.precio}%0A`;
    });

    window.open(
`https://wa.me/5491130548865?text=${mensaje}`,
"_blank"
);
});
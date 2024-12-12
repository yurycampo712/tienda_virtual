let carrito = []; 

function agregarAlCarrito(titulo, precio, imagen) {
    const articulo = {
        titulo: titulo,
        precio: parseFloat(precio.replace(/[^0-9.-]+/g, "")), 
        imagen: imagen
    };
    carrito.push(articulo);
    actualizarCarrito();
}
function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito-lista");
    carritoContainer.innerHTML = ""; 

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach((articulo, index) => {
            const item = document.createElement("div");
            item.classList.add("carrito-item");
            item.innerHTML = `
                <img src="${articulo.imagen}" alt="${articulo.titulo}">
                <span>${articulo.titulo}</span>
                <span>$${articulo.precio.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            carritoContainer.appendChild(item);
        });
    }

   
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    document.getElementById("carrito-total").innerText = `Total: $${total.toFixed(2)}`;
}


function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito(); 
}


document.getElementById("icono-carrito").onclick = function() {
    const modal = document.getElementById("carrito-contenedor");
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
};


function cerrarCarrito() {
    const modal = document.getElementById("carrito-contenedor");
    modal.style.display = "none";
}


document.querySelectorAll(".vinetas").forEach(vineta => {
    const titulo = vineta.querySelector("h4").innerText;
    const precio = vineta.querySelector(".descripcion .requisitos").innerText;
    const imagen = vineta.querySelector("img").src;

    const boton = document.createElement("button");
    boton.innerText = "Añadir al Carrito";
    boton.classList.add("btn-agregar");
    boton.onclick = () => agregarAlCarrito(titulo, precio, imagen);
    vineta.appendChild(boton);
});



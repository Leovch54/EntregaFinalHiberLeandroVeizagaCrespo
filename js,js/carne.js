document.addEventListener("DOMContentLoaded", function () {
    // Cuando se haga click en un botón "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const description = this.getAttribute('data-description');
            const price = parseFloat(this.getAttribute('data-price'));

            // Verificar si los valores están correctamente recogidos
            console.log("Datos del producto a agregar:", name, description, price);  // Depuración de los datos

            // Verificar que todos los datos estén presentes
            if (!name || !description || isNaN(price)) {
                alert("Error: faltan datos del producto. Revisa el código.");
                return;
            }

            // Cargar el carrito actual desde localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log("Carrito actual:", cart);  // Depuración del carrito actual

            // Verificar si el producto ya está en el carrito
            let existingProduct = cart.find(item => item.name === name);
            console.log("Producto ya en carrito:", existingProduct);  // Depuración de la búsqueda del producto

            if (existingProduct) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no está en el carrito, agregarlo
                cart.push({
                    name,
                    description,
                    price,
                    quantity: 1
                });
            }

            // Depuración: Verificar cómo queda el carrito antes de guardarlo
            console.log("Carrito actualizado:", cart);

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Mostrar una alerta al usuario
            alert(`${name} ha sido agregado al carrito`);
        });
    });
});

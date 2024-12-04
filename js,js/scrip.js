// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Cargar el carrito desde el localStorage
    loadCart();

    // Función para cargar los productos en el carrito desde el localStorage
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById("cart-items");
        const subtotalElement = document.getElementById("subtotal");
        const taxesElement = document.getElementById("taxes");
        const totalElement = document.getElementById("total");

        // Limpiar los productos actuales en el carrito
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;
        
        // Si el carrito está vacío
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="6" class="text-center">Carrito vacío</td></tr>';
            subtotalElement.innerText = "$0";
            taxesElement.innerText = "$0";
            totalElement.innerText = "$0";
            return;
        }

        // Recorrer los productos del carrito
        cart.forEach((item, index) => {
            let total = item.quantity * item.price;
            subtotal += total;

            // Agregar cada producto al carrito
            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" class="form-control quantity" data-index="${index}">
                    </td>
                    <td>$${item.price}</td>
                    <td>$${total}</td>
                    <td>
                        <button class="btn btn-danger remove-item" data-index="${index}">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        // Calcular impuestos (puedes modificar la fórmula según tu país)
        let taxes = subtotal * 0.1;  // Ejemplo: 10% de impuestos
        let total = subtotal + taxes;

        // Actualizar los valores en el resumen de la compra
        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        taxesElement.innerText = `$${taxes.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    }

    // Función para actualizar el carrito en el localStorage
    function updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    // Evento para cambiar la cantidad de un producto en el carrito
    document.getElementById("cart-items").addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity')) {
            let index = event.target.getAttribute('data-index');
            let quantity = parseInt(event.target.value);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (quantity <= 0) {
                event.target.value = 1;
                return; // No permitir cantidad menor que 1
            }
            cart[index].quantity = quantity;
            updateCart(cart);
        }
    });

    // Evento para eliminar un producto del carrito
    document.getElementById("cart-items").addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            let index = event.target.getAttribute('data-index');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1); // Eliminar el producto del carrito
            updateCart(cart);
        }
    });
});

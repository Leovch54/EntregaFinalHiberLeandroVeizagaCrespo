document.addEventListener("DOMContentLoaded", function () {
    // Cargar productos del carrito desde localStorage
    loadCart();

    // Función para cargar los productos en el carrito
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById("cart-items");
        const subtotalElement = document.getElementById("subtotal");
        const taxesElement = document.getElementById("taxes");
        const totalElement = document.getElementById("total");

        // Limpiar el contenido actual del carrito
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;

        // Si el carrito está vacío
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">Carrito vacío</td></tr>';
            subtotalElement.innerText = "$0";
            taxesElement.innerText = "$0";
            totalElement.innerText = "$0";
            return;
        }

        // Mostrar productos del carrito
        cart.forEach((item, index) => {
            let total = item.quantity * item.price;
            subtotal += total;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td><input type="number" value="${item.quantity}" min="1" class="form-control quantity" data-index="${index}"></td>
                    <td>$${item.price}</td>
                    <td>$${total}</td>
                    <td><button class="btn btn-danger remove-item" data-index="${index}">Eliminar</button></td>
                </tr>
            `;
        });

        // Calcular impuestos (10% de subtotal)
        let taxes = subtotal * 0.1;
        let total = subtotal + taxes;

        // Actualizar los valores en el resumen
        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        taxesElement.innerText = `$${taxes.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    }

    // Función para actualizar el carrito en localStorage
    function updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    // Evento para cambiar la cantidad de un producto
    document.getElementById("cart-items").addEventListener('change', function (event) {
        if (event.target.classList.contains('quantity')) {
            let index = event.target.getAttribute('data-index');
            let quantity = parseInt(event.target.value);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (quantity <= 0) {
                event.target.value = 1;
                return; // No permitir cantidades menores que 1
            }
            cart[index].quantity = quantity;
            updateCart(cart);
        }
    });

    // Evento para eliminar un producto del carrito
    document.getElementById("cart-items").addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            let index = event.target.getAttribute('data-index');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1); // Eliminar producto
            updateCart(cart);
        }
    });
});

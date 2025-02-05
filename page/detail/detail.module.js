import apartment_list from "../../apartment_list.js";

export default function detailInit() {
    let cart = [];

    // Hinzufügen eines Produkts zum Warenkorb
    $('body').on('click', '.add-to-cart', function() {
        const productName = $(this).data('product');
        const productPrice = parseFloat($(this).data('price'));
        cart.push({ name: productName, price: productPrice });
        updateCart();
    });

    // Warenkorb aktualisieren
    function updateCart() {
        const cartItems = $('#cart-items');
        cartItems.empty();
        let total = 0;

        cart.forEach(function(item, index) {
            total += item.price;
            cartItems.append(
                `<li>
                    ${item.name} - ${item.price.toFixed(2)}€
                    <button class="remove" data-index="${index}">Entfernen</button>
                </li>`
            );
        });

        $('#total').text('Gesamtpreis: ' + total.toFixed(2) + '€');
    }

    // Produkt aus dem Warenkorb entfernen
    $(document).on('click', '.remove', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);  // Produkt aus dem Array entfernen
        updateCart();
    });
};


import apartment_list from "../../apartment_list.js";
import components from "../../components.js";

export default function detailInit() {
    console.debug("Detail initialization started.");

    // Define renderers
    const renderApartmentDetailView = (apartment) => {
        let stars = "";
        for (let i = 0; i < apartment.stars; i++) stars += "⭐";
        console.log("Stars:", apartment.stars, stars);

        document.querySelector("#apartment_detail").innerHTML = components.apartment_detail.func({id: apartment.id, name: apartment.name, thumbnail_image: apartment.thumbnail_image, description: apartment.description, price_per_night: apartment.price_per_night, location: apartment.location, category: apartment.category, max_guests: apartment.max_guests, stars: stars, pet_friendly: apartment.pet_friendly, host: apartment.host});
    };
    const renderApartmentCard = (apartment) => {
        document.querySelector("#similar_apartments").innerHTML += components.apartment_card.func({id: apartment.id, title: apartment.name, image: apartment.thumbnail_image, description: apartment.description, price: apartment.price_per_night});
    };

    // Get apartment by apartment parameter
    const params = new URLSearchParams(window.location.search);
    if (params.has("apartment")) {
        const apartmentId = params.get("apartment");
        console.log(`Found apartment id: ${apartmentId}`);
        if (Number(apartmentId)) {
            console.log(`Apartment id is valid: ${apartmentId}`);
            const apartment = Object.values(apartment_list)[apartmentId];
            console.log(apartment, typeof apartment)
            if (typeof apartment != undefined) {
                // Remove emotion and update title
                const emotion = document.querySelector("#emotion");
                if (emotion) emotion.classList.add("hidden");
                const pageTitleElement = document.querySelector("#page_title");
                if (pageTitleElement) pageTitleElement.innerText = "Detail: " + apartment.name;
                const titleElement = document.querySelector("title");
                if (titleElement) titleElement.innerText = apartment.name + " | wp-bnb";

                // Load apartment view
                renderApartmentDetailView(apartment);

                // Load similar apartments into the list
                Object.values(apartment_list).forEach(similar_apartment => {
                    if (apartment.max_guests <= similar_apartment.max_guests) renderApartmentCard(similar_apartment);
                });
            }
        }
    }

    // let cart = [];
    //
    // // Hinzufügen eines Produkts zum Warenkorb
    // $('body').on('click', '.add-to-cart', function() {
    //     const productName = $(this).data('product');
    //     const productPrice = parseFloat($(this).data('price'));
    //     cart.push({ name: productName, price: productPrice });
    //     updateCart();
    // });
    //
    // // Warenkorb aktualisieren
    // function updateCart() {
    //     const cartItems = $('#cart-items');
    //     cartItems.empty();
    //     let total = 0;
    //
    //     cart.forEach(function(item, index) {
    //         total += item.price;
    //         cartItems.append(
    //             `<li>
    //                 ${item.name} - ${item.price.toFixed(2)}€
    //                 <button class="remove" data-index="${index}">Entfernen</button>
    //             </li>`
    //         );
    //     });
    //
    //     $('#total').text('Gesamtpreis: ' + total.toFixed(2) + '€');
    // }
    //
    // // Produkt aus dem Warenkorb entfernen
    // $(document).on('click', '.remove', function() {
    //     const index = $(this).data('index');
    //     cart.splice(index, 1);  // Produkt aus dem Array entfernen
    //     updateCart();
    // });
};


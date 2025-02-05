import apartment_list from "../../apartment_list.js";
import components from "../../components.js";

export default function initList() {
    console.debug("List initialization started.");

    // Load featured apartments
    const renderFeaturedApartment = (apartment) => {
        document.querySelector("#apartment_list").innerHTML += components.apartment_list_item.func({id: apartment.id, title: apartment.name, image: apartment.thumbnail_image, description: apartment.description, price: apartment.price_per_night});
    };

    Object.values(apartment_list).forEach(apartment => {
        if (!apartment.disabled) renderFeaturedApartment(apartment);
    });

    if (!foundApartment) {
        document.querySelector("#apartment_list").innerHTML = `
            <h2 class="text-xl">No apartments found.</h2>
        `;
    }
}

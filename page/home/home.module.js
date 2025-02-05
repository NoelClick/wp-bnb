import apartment_list from "../../apartment_list.js";
import components from "../../components.js";

export default function homeInit() {
    console.debug("Home initialization started.");

    // Load featured apartments
    const renderFeaturedApartment = (apartment) => {
        document.querySelector("#featured_list").innerHTML += components.apartment_card.func({id: apartment.id, title: apartment.name, image: apartment.thumbnail_image, description: apartment.description, price: apartment.price_per_night});
    };

    Object.values(apartment_list).forEach(apartment => {
        if (apartment.featured) renderFeaturedApartment(apartment);
    });
};


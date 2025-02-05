import apartment_list from "../../apartment_list.js";
import components from "../../components.js";

export default function initList() {
    console.debug("List initialization started.");

    // Load the apartment list
    const loadApartmentList = () => {
        console.log("Loading all apartments to the list (without a filter).");
        let foundApartment = false;

        clearApartmentList();

        Object.values(apartment_list).forEach(apartment => {
            // console.log("apartment: ", apartment);
            if (!apartment.disabled) {
                foundApartment = true;
                renderApartmentListCard(apartment);
            }
        });

        if (!foundApartment) {
            setNoApartmentsFound();
        }
    };

    // Filter List
    const filterApartmentList = () => {
        console.log("Filtering apartment list.", document.querySelectorAll(`#filter_box input[name^="stars[]"]:checked`));

        if (document.querySelectorAll(`#filter_box input[name^="stars[]"]:checked`).length === 0) {
            loadApartmentList(); // Load all apartments
            return;
        }

        let foundApartment = false;

        clearApartmentList();

        document.querySelectorAll(`#filter_box input[name^="stars[]"]:checked`).forEach(starField => {
            console.log("Star Field: ", starField);

            Object.values(apartment_list).forEach(apartment => {
                if (!apartment.disabled && apartment.stars ==starField.value) {
                    foundApartment = true;
                    renderApartmentListCard(apartment);
                }
            });

            if (!foundApartment) {
                setNoApartmentsFound();
            }
        });
    };

    // Filter Event Listener
    document.querySelectorAll("#filter_box input").forEach(filterField => {
        filterField.addEventListener("change", ev => {
            filterApartmentList();
        });
    });

    // Helper functions
    const renderApartmentListCard = (apartment) => {
        console.debug(`Rendering apartment id=${apartment.id}.`);

        let stars = "";
        for (let i = 0; i < apartment.stars; i++) stars += "⭐";

        document.querySelector("#apartment_list").innerHTML += components.apartment_list_card.func({id: apartment.id, title: apartment.name, image: apartment.thumbnail_image, description: apartment.description, price: apartment.price_per_night, stars: stars, location: apartment.location});
    };

    const clearApartmentList = () => {
        document.querySelector("#apartment_list").innerHTML = "";
    };

    const setNoApartmentsFound = () => {
        document.querySelector("#apartment_list").innerHTML = `
            <h2 class="text-xl text-black dark:text-white">No apartments found.</h2>
        `;
    };

    // Load full apartment list
    loadApartmentList();
}


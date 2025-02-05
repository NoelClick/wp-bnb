export default {
    apartment_card: {
        func: ({id = "", title = "", image = "", description = "", price = ""} = {}) => {
            return `
                <div class="flex flex-col items-center shadow-md transition duration-200 ease-in-out p-5 rounded-md border border-gray-100 bg-gray-100 dark:border-slate-900 dark:bg-slate-800 hover:scale-105">
                    <img class="w-full h-auto max-w-50 mb-2" src="${image}" alt="${title}">
                    <div class="flex flex-col h-full text-center text-black dark:text-white">
                        <h2 class="text-xl">${title}</h2>
                        <p>${description}</p>
                        <p class="font-bold text-black dark:text-white my-2 text-xl mb-3">${price} per night</p>
                        <a class="block border border-solid border-teal-900 rounded bg-teal-800 text-white mt-auto px-5 py-2 hover:cursor-pointer underline" href="/?page=detail&apartment=${id}">Details</a>
                    </div>
                </div>
            `;
        }
    },
    apartment_list_card: {
        func: ({id = "", title = "", image = "", description = "", price = "", stars = "", location = ""} = {}) => {
            return `
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 shadow-md transition duration-200 ease-in-out p-5 rounded-md border border-gray-100 bg-gray-100 dark:border-slate-900 dark:bg-slate-800 hover:scale-105">
                    <img class="md:col-span-1 w-full h-full object-cover md:max-w-50 mb-2 rounded text-black dark:text-white" src="${image}" alt="${title}">
                    <div class="md:col-span-3 flex flex-col h-full text-start text-black dark:text-white">
                        <h3 class="text-xl">${title}</h3>
                        <p>${stars}</p>
                        <p>${description}</p>
                        <p><b>Location:</b> ${location}</p>
                        <p class="font-bold text-black dark:text-white my-2 text-xl mb-3">${price} per night</p>
                        <a class="block self-start w-auto border border-solid border-teal-900 rounded bg-teal-800 text-white mt-auto px-5 py-2 hover:cursor-pointer underline" href="/?page=detail&apartment=${id}">Details</a>
                    </div>
                </div>
            `;
        }
    },
    apartment_detail: {
        func: ({id = "", name = "", thumbnail_image = "", description = "", price_per_night = "", location = "", category = "", max_guests = "", stars = "", pet_friendly = "", host = ""} = {}) => {
            return `
                <!-- TOP IMAGE -->
                <div class="relative w-full max-h-100 mb-2">
                    <span class="absolute top-3 start-3 z-50 bg-teal-600/80 rounded border-2 border-solid border-teal-800 px-3 py-1 text-xs text-white" aria-hidden="true">${category}</span>
                    <span class="absolute top-12 start-3 z-50 bg-teal-600/80 rounded border-2 border-solid border-teal-800 px-3 py-1 text-xs text-white" aria-hidden="true">${pet_friendly ? "🐶 allowed" : "No 🐶 allowed"}</span>
                    <span class="absolute bottom-3 start-3 z-50 bg-teal-600/80 rounded border-2 border-solid border-teal-800 px-3 py-1" aria-hidden="true">${stars}</span>
                    <img class="relative rounded w-full max-h-100 object-cover " src="${thumbnail_image}" alt="${name} Thumbnail">
                </div>

                <!-- DESCRIPTION (2fr) | BOOKING DETAILS (1fr) -->
                <div class="w-full grid grid-cols md:grid-cols-3 gap-2">
                    <div class="md:col-span-2 w-full p-5 text-black dark:text-white bg-gray-100 dark:bg-slate-800 rounded border border-solid border-gray-200 dark:border-slate-900">
                        <h2 class="text-xl mb-2">Description</h2>
                        <p>${description}</p>
                        <p><b>Limit:</b> Up to ${max_guests} guests</p>
                        <p><b>Location:</b> ${location}</p>
                        <p><b>Host:</b> ${host}</p>
                        <hr class="my-2 text-gray-200 dark:text-slate-900">
                        <p><a class="underline" href="/?page=detail&apartment=${id}">Share</a></p>
                    </div>
                    <div class="md:col-span-1 w-full p-5 bg-gray-100 dark:bg-slate-800 rounded border border-solid border-gray-200 dark:border-slate-900">
                        <h2 class="text-xl mb-2">Booking Details</h2>
                        <p><b>Price:</b> ${price_per_night} per night</p>
                        <hr class="my-2 text-gray-200 dark:text-slate-900">
                        <a class="inline-block border border-solid border-teal-900 rounded bg-teal-800 text-white mt-auto px-5 py-2 hover:cursor-pointer underline" href="/?page=booking&apartment=${id}">Book now</a>
                    </div>
                </div>
            `;
        }
    },
    form_checkbox: {
        func: ({name = "", value = "", label = ""} = {}) => {
            return `
                <label class="grid grid-cols-[auto_1fr] gap-3 items-center rounded-md px-2 hover:bg-gray-200 dark:hover:bg-slate-900" for="${name}">
                    <input name="${name}" value="${value}" class="size-3.5 appearance-none rounded-sm border border-gray-300 accent-teal-500 cursor-pointer checked:appearance-auto dark:border-gray-600 dark:accent-teal-600" type="checkbox">
                    <span class="text-black dark:text-white select-none">${label}</span>
                </label>
            `;
        }
    }
};


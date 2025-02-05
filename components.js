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
    }
};


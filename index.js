// All pages
const pages = {
    home: {
        title: "Home",
        html: "home.html",
        css: "",
        js: "script.js"
    },
    about: {
        title: "About",
        html: "about.html",
        css: "",
        js: ""
    },
    list: {
        title: "List",
        html: "list.html",
        css: "",
        js: ""
    },
    404: {
        title: "404 Page not found",
        html: "404.html",
        css: "",
        js: ""
    },
};

// Initialize SPA
document.addEventListener("DOMContentLoaded", async () => {
    const initialPage = getPageFromUrl() || "home";
    await loadPage(initialPage);
    setupNavigation();
    handlePopState();
    //initPage();
});

const getPageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("page");
};

const updateUrl = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    // Update URL without reloading
    history.pushState({ page }, pages[page]?.title || "wp-bnb", url);
};

const loadPage = async (page) => {
    if (!pages[page]) {
        console.error(`Page "${page}" does not exist.`);
        return;
    }

    const body = document.querySelector("body");
    const header = document.querySelector("h1#page_title");

    // Update title
    document.title = pages[page].title || "wp-bnb";
    if (header) {
        header.textContent = pages[page].title || "wp-bnb";
    }

    // Dynamically load page's CSS
    if (pages[page].css) {
        console.debug(`Loading additional CSS for page "${page}".`);
        loadCSS(pages[page].css);
    } else {
        console.debug(`No additional CSS needed for page "${page}".`);
    }

    // Dynamically load page's JS
    if (pages[page].js) {
        console.debug(`Loading additional JS for page "${page}".`);
        await loadJS(pages[page].js, () => {
            if (typeof window[`${page}Init`] === "function") {
                window[`${page}Init`](); // Call page-specific initialization
            }
        });
    } else {
        console.debug(`No additional JS needed for page "${page}".`);
    }

    // Fetch and display HTML content
    const html = await fetch(pages[page].html)
        .then(response => {
            if (response.status === 200) return response.text();
            throw new Error(`Failed to load HTML for page "${page}"`);
        })
        .catch(error => {
            console.error(error.message);
            return "<h1>Page Not Found</h1>";
        });

    body.querySelector("main#content").innerHTML = html;

    updateUrl(page);

    console.log(`Page "${page}" loaded successfully.`);
};

const loadCSS = async (cssFile) => {
    if (!document.querySelector(`link[href="${cssFile}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssFile;
        document.head.appendChild(link);
    }
};

const loadJS = (jsFile, callback) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${jsFile}"]`)) {
            resolve(); // Already loaded
            if (callback) callback();
            return;
        }

        const script = document.createElement("script");
        script.src = jsFile;
        script.async = true;

        script.onload = () => {
            resolve();
            if (callback) callback();
        };
        script.onerror = () => reject(new Error(`Failed to load JS file: ${jsFile}`));

        document.body.appendChild(script);
    });
};

const setupNavigation = () => {
    const navLinks = document.querySelectorAll("a[data-page]");
    navLinks.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const page = link.getAttribute("data-page");
            await loadPage(page); // Load clicked page
        });
    });
};

// Handle back / forward navigation using the History API
const handlePopState = () => {
    window.addEventListener("popstate", async (event) => {
        const page = event.state?.page || "home"; // Use "home" as fallback
        await loadPage(page);
    });
};

/*
const initPage = async () => {
    console.log("Initializing Page.");


    const page = await getPageParameter();

    body.querySelector("main").innerHTML = await getPageHTML(page);

};

const getPageParameter = async () => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);

    if (searchParams.has("page")) {
        const page = serachParams.get("page");
        if (await pageExists(page)) {
            return page;
        }
    } else {
        return "home";
    }

    return "404";
};

const pageExists = async (url) => (await fetch(url)).ok;

const getPageHTML = async (url) => {
    try {
        const response = await fetch(url + ".html");
        if (response.status === 200) {
            return await response.text();
        } else if (response.status === 404) {
            throw new Error("Page not found");
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
};
*/


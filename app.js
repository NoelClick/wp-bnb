// Import
import components from './components.js';
import pages from './pages.js';

// Initialize SPA
document.addEventListener("DOMContentLoaded", async () => {
    const initialPage = getPageFromUrl() || "home";
    await loadPage(initialPage);
    setupNavigation();
    handlePopState();
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
        page = "404";
    }

    const body = document.querySelector("body");
    const header = document.querySelector("h1#page_title");

    // Update title
    document.title = pages[page].title + " | wp-bnb" || "wp-bnb";
    if (header) {
        header.textContent = pages[page].title || "wp-bnb";
    }

    // Update navigaton bar entry (mark as current)
    document.querySelectorAll("[data-page]").forEach(el => {
        if (el.hasAttribute("data-current")) el.removeAttribute("data-current");
    });
    if (document.querySelector(`[data-page="${page}"]`)) {
        document.querySelector(`[data-page="${page}"]`).dataset.current = true;
    }

    // Dynamically load page's CSS
    if (pages[page].css) {
        console.debug(`Loading additional CSS for page "${page}".`);
        loadCSS("page/" + page + "/" + pages[page].css);
    } else {
        console.debug(`No additional CSS needed for page "${page}".`);
    }

    // Fetch and display HTML content
    const html = await fetch("page/"+page+"/"+pages[page].html)
        .then(response => {
            if (response.status === 200) return response.text();
            throw new Error(`Failed to load HTML for page "${page}"`);
        })
        .catch(error => {
            console.error(error.message);
            return "<h1>Page Not Found</h1>";
        });

    body.querySelector("main#content").innerHTML = renderComponents(html);

    // Dynamically load page's JS
    if (pages[page].js) {
        console.debug(`Loading additional JS for page "${page}".`);
        const pageJsPath = "page/" + page + "/" + pages[page].js;
        if (pages[page].js.search("module") != -1) {
            try {
                const pageModule = await import("/" + pageJsPath);
                if (typeof pageModule.default === "function") {
                    console.log(`Calling module init function (default).`);
                    pageModule.default(); // Call page-specific initialization
                }
            } catch (error) {
                console.error("Error loading page module: ", error);
            }
        } else {
            await loadJS(pageJsPath, () => {
                if (typeof window[`${page}Init`] === "function") {
                    console.log(`Calling page init function (${page}Init).`);
                    window[`${page}Init`](); // Call page-specific initialization
                }
            });

        }
    } else {
        console.debug(`No additional JS needed for page "${page}".`);
    }

    updateUrl(page);

    // Scroll to top
    window.scrollTo(0, 0);

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

// Parse an attribute into an object.
const parseAttributes = (attributeString) => {
    const attrs = {};
    const regex = /([a-zA-Z0-9_:-]+)\s*=\s*"([^"]*)"/g;
    let match;
    while ((match = regex.exec(attributeString)) !== null) {
        attrs[match[1]] = match[2];
    }
    return attrs;
};

// Render components (replace custom component tag)
const renderComponents = (html) => {
    const componentRegex = /<c:([a-zA-Z0-9_]+)\s*([^>]*?)\/?>/g;

    return html.replace(componentRegex, (match, componentName, attributeString) => {
        const attrs = parseAttributes(attributeString);

        // Replace any undefined attribute values with an empty string.
        // Object.keys(attrs).forEach(key => {
        //     if (attrs[key] === undefined) {
        //         attrs[key] = '';
        //     }
        // });

        console.log(`Rendering component: ${componentName}`, attrs);

        // If component exists and has a render function
        if (components[componentName] && typeof components[componentName].func === 'function') {
            return components[componentName].func(attrs);
        }

        // If the component is not found, return the original tag.
        return match;
    });
};


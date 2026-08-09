// ===============================
// UNIVERSAL COMPONENTS
// ===============================

function renderNavbar() {
    return `
<header class="site-header">

    <nav class="navbar container">

        <a href="index.html" class="brand">

            <img
                src="images/logo-placeholder.png"
                alt="Cucina Orlando"
                class="logo-image">

            <span class="logo-text">
                Cucina Orlando
            </span>

        </a>

        <button
            id="menu-toggle"
            class="mobile-menu-button"
            aria-label="Open navigation">

            ☰

        </button>

        <div class="nav-links">

            <a href="index.html">Home</a>

            <a href="recipes.html">Browse recipes</a>

            <a href="random.html">Randomize</a>

        </div>

    </nav>

</header>
`;
}

function renderFooter() {
    return `
<footer>

    <div class="container footer-content">

        <h2>Cucina Orlando</h2>

        <p>
            Simple family recipes collected,
            tested and shared one meal at a time.
        </p>

        <a href="https://YOUR-PORTFOLIO-LINK.com">
            Created by Gabrielle Fuselier →
        </a>

    </div>

</footer>
`;
}

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector("#navbar");

    if (navbar) {
        navbar.innerHTML = renderNavbar();
    }

    const footer = document.querySelector("#footer");

    if (footer) {
        footer.innerHTML = renderFooter();
    }

    const menuButton = document.querySelector("#menu-toggle");

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            document
                .querySelector(".nav-links")
                .classList.toggle("open");

        });

    }

    window.addEventListener("scroll", () => {

        const header = document.querySelector(".site-header");
    
        if (!header) return;
    
        if (window.scrollY > 40) {
    
            header.classList.add("scrolled");
    
        } else {
    
            header.classList.remove("scrolled");
    
        }
    
    });
});

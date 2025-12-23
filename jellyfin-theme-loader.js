(function () {

    let desktopLoaded = false;
    let IS_TV;

    function isTV() {
        if (IS_TV !== undefined) return IS_TV;
        IS_TV =
            document.documentElement.classList.contains("layout-tv") ||
            /TV|Android TV|SmartTV|Tizen|WebOS/i.test(navigator.userAgent);
        return IS_TV;
    }

    function loadCSS(href) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }

    function loadJS(src) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    }

    /* 📺 CSS SOLO TV */
    function tvCSS() {
        return `
            #customTabButton_1 {
                display: none !important;
            }
        `;
    }

    function applyTVCSS() {
        if (!isTV()) return;
        if (document.getElementById("tv-only-css")) return;

        const style = document.createElement("style");
        style.id = "tv-only-css";
        style.textContent = tvCSS();
        document.head.appendChild(style);
    }

    function init() {

        /* 📺 TV */
        if (isTV()) {
            applyTVCSS();
            return;
        }

        /* 💻 DESKTOP */
        if (desktopLoaded) return;
        desktopLoaded = true;

        /* 1️⃣ ElegantFin base */
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");

        /* 2️⃣ ElegantFin add-ons */
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/media-bar-plugin-support-latest-min.css");

        /* 3️⃣ Plugins visuales */
        loadCSS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.css");
        loadJS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.js");
    }

    new MutationObserver(mutations => {
        for (const m of mutations) {
            if (m.attributeName === "class") {
                init();
            }
        }
    }).observe(document.documentElement, { attributes: true });

    init();
})();

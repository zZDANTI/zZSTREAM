(function () {

    function isTV() {
        return (
            document.documentElement.classList.contains("layout-tv") ||
            /TV|Android TV|SmartTV|Tizen|WebOS/i.test(navigator.userAgent)
        );
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

    /* ==================================================
       📺 ÚNICA FUNCIÓN PARA CSS DE TV
       TODO lo que pongas aquí SOLO afecta a la TV
       ================================================== */
    function tvCSS() {
        return `
            /* 📺 TV ONLY */

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

         /*BARRA NAV DE PELICULAS CSS Y JS*/
        loadCSS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.css");
        loadJS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.js");

        /* 💻 DESKTOP Y MOVIL*/
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/media-bar-plugin-support-latest-min.css");
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");
        

    }

    new MutationObserver(init)
        .observe(document.documentElement, { attributes: true });

    init();
})();

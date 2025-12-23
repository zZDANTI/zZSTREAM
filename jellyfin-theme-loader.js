(function () {

    function isTV() {
        return (
            document.documentElement.classList.contains("layout-tv") ||
            navigator.userAgent.match(/TV|Android TV|SmartTV|Tizen|WebOS/i)
        );
    }

    function loadCSS(href) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }

    function init() {
        if (isTV()) return; // ❌ TV → no cargar nada

        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");
        loadCSS("https://cdn.jsdelivr.net/gh/MakD/zombie-release@latest/zombie_revived.css");
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/media-bar-plugin-support-latest-min.css");
    }

    new MutationObserver(init)
        .observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    init();
})();

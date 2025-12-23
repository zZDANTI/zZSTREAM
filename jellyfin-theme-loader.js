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

    function loadJS(src, async = true) {
        const script = document.createElement("script");
        script.src = src;
        script.async = async;
        document.head.appendChild(script);
    }


    function init() {
        if (isTV()) return; // ❌ TV → no cargar nada en la TV.

         // 🎨 CSS
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/ElegantFin-jellyfin-theme-build-latest-minified.css");
        loadCSS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.css");
        loadCSS("https://cdn.jsdelivr.net/gh/lscambo13/ElegantFin@main/Theme/assets/add-ons/media-bar-plugin-support-latest-min.css");

        // 🧠 JS
        loadJS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.js");
    }

    new MutationObserver(init)
        .observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    init();
})();

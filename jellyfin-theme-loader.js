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

        // 👉 Insertar ANTES del CSS principal de Jellyfin
        const jellyfinCSS = document.querySelector('link[href*="main.jellyfin"]');
        if (jellyfinCSS) {
            jellyfinCSS.parentNode.insertBefore(link, jellyfinCSS);
        } else {
            document.head.appendChild(link);
        }
    }


    function loadJS(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
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

    async function init() {

        /* 📺 TV */
        if (isTV()) {
            applyTVCSS();
            return;
        }

        /* 💻 DESKTOP Y TV */
        if (desktopLoaded) return;
        desktopLoaded = true;

         /*BARRA NAV DE PELICULAS CSS Y JS*/
        loadCSS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.css");
        await loadJS("https://cdn.jsdelivr.net/gh/MakD/Jellyfin-Media-Bar@latest/slideshowpure.js");

        /*Globales necesarias para los scripts de abajo*/
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/utils.js");
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/cardBuilder.js");
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/localStorageCache.js");
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/modal.js");
        
        
        /**CSS para scripts importados */
        loadCSS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/watchlist.css");
        loadCSS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/modal.css");
        loadCSS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/cardBuilder.css");
    
        /*Funciones complemetarias*/
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/watchlist.js");
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/removeContinue.js");
        await loadJS("https://cdn.jsdelivr.net/gh/ZZDANTI/zZSTREAM@latest/scripts/seriesInfo.js");
        

        
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

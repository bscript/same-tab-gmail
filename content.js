(function () {
    function shouldHandleHref(href) {
        if (!href) return false;
        try {
            const u = new URL(href, location.href);
            return u.hostname === 'mail.google.com' && u.pathname.startsWith('/mail/u/');
        } catch (e) {
            return false;
        }
    }
    document.addEventListener('click', (e) => {
        // Find the nearest anchor
        let a = e.target;
        while (a && a.nodeName !== 'A') a = a.parentElement;
        if (!a) return;
        const href = a.getAttribute('href');
        if (!shouldHandleHref(href)) return;
        // Prevent the default which may open a new tab, then navigate current tab
        e.preventDefault();
        e.stopPropagation();


        const url = new URL(href, location.href).toString();
        window.location.href = url;
    }, true);
})();
// Site Favicon & Title Customizer - Load this on all pages
(function() {
    const ICON_STORAGE_KEY = 'duckmath_custom_icon';
    const TITLE_STORAGE_KEY = 'duckmath_custom_title';
    
    // Load saved settings
    function loadCustomSettings() {
        const savedIcon = localStorage.getItem(ICON_STORAGE_KEY);
        const savedTitle = localStorage.getItem(TITLE_STORAGE_KEY);
        
        if (savedIcon) {
            updateFavicon(savedIcon);
        }
        
        if (savedTitle) {
            document.title = savedTitle;
        }
    }
    
    // Update favicon
    function updateFavicon(iconUrl) {
        if (iconUrl === 'blank') {
            // Set blank favicon
            const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
            faviconLinks.forEach(link => {
                link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>';
            });
        } else {
            const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
            faviconLinks.forEach(link => {
                link.href = iconUrl;
            });
        }
    }
    
    // Load on DOMContentLoaded and on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCustomSettings);
    } else {
        loadCustomSettings();
    }
    
    // Also check on window load
    window.addEventListener('load', loadCustomSettings);
})();
// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Language toggle handling (Swedish / English)
    const langToggle = document.getElementById("lang-toggle");
    const htmlElement = document.documentElement;
    
    // Check for a saved language preference from a previous visit
    const savedLang = localStorage.getItem("preferred-lang");
    if (savedLang) {
        htmlElement.setAttribute("lang", savedLang);
    }

    // Listen for clicks on the language toggle button
    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const currentLang = htmlElement.getAttribute("lang");
            
            if (currentLang === "sv") {
                htmlElement.setAttribute("lang", "en");
                localStorage.setItem("preferred-lang", "en"); // Save choice
            } else {
                htmlElement.setAttribute("lang", "sv");
                localStorage.setItem("preferred-lang", "sv"); // Save choice
            }
        });
    }

    // Scroll animations using Intersection Observer
    const revealElements = document.querySelectorAll(".reveal-fade");

    // Configuration for when elements should fade in
    const observerOptions = {
        root: null,         // Uses the viewport
        rootMargin: "0px",  // No extra margins
        threshold: 0.15     // Triggers when 15% of the element is visible
    };

    // Create the observer to handle the animation class
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the element enters the screen
            if (entry.isIntersecting) {
                entry.target.classList.add("active"); // Adds CSS class to trigger fade-in
                observer.unobserve(entry.target);     // Stop observing once animated
            }
        });
    }, observerOptions);

    // Start observing each target element
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
});
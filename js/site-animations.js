const { animate, stagger, spring } = Motion;

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animate the Page Title (Slide down + Fade)
    animate("h1, .page-title", 
        { y: [-50, 0], opacity: [0, 1] }, 
        { duration: 0.8, easing: spring() }
    );

    // 2. Staggered Animation for Blog Posts (The "Framer" look)
    // Assuming your index.md uses <li> or <article> tags for posts
    animate(
        ".post-list li, .post-content", // Adjust selector to match your HTML
        { y: [30, 0], opacity: [0, 1] },
        { 
            delay: stagger(0.1), // Delay each item by 0.1s
            duration: 0.5, 
            easing: "ease-out" 
        }
    );

    // 3. Animate Images on Scroll (Optional)
    // This makes images fade in as they enter the viewport
    document.querySelectorAll("img").forEach((img) => {
        Motion.inView(img, ({ target }) => {
            animate(target, 
                { opacity: [0, 1], scale: [0.95, 1] }, 
                { duration: 0.6 }
            );
        });
    });
});

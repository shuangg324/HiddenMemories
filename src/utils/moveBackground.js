const scaleFactor = 1 / 20;

export default function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
        const boolInt = i % 2 === 0 ? 1 : -1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`;
    }
}

// Add this export:
export const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate;
                const delay = element.dataset.delay || '';
                
                if (animationType) {
                    element.classList.add(`animate-${animationType}`);
                    if (delay) {
                        element.classList.add(`animate-delay-${delay}`);
                    }
                }
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
    return observer;
};
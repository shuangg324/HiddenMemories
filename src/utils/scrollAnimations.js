// Create this file: src/utils/scrollAnimations.js

export const initScrollAnimations = () => {
    // Create intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add animation class based on data attribute
          const animationType = element.dataset.animate;
          const delay = element.dataset.delay || '';
          
          if (animationType) {
            element.classList.add(`animate-${animationType}`);
            if (delay) {
              element.classList.add(`animate-delay-${delay}`);
            }
          }
          
          // Stop observing this element
          observer.unobserve(element);
        }
      });
    }, observerOptions);
  
    // Find all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
  
    return observer;
  };
  
  // Staggered animation for lists
  export const staggerAnimateChildren = (parentElement, animationType = 'fade-in-up', delayIncrement = 100) => {
    const children = parentElement.children;
    
    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        child.classList.add(`animate-${animationType}`);
      }, index * delayIncrement);
    });
  };
  
  // Enhanced typing effect
  export const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  };
  
  // Parallax effect for shapes
  export const enhanceShapeMovement = (event) => {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX;
    const y = event.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.01;
      const xOffset = (x - centerX) * speed;
      const yOffset = (y - centerY) * speed;
      const rotation = (x - centerX) * speed * 10;
      
      shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
      shape.style.transition = 'transform 0.1s ease-out';
    });
  };
  
  // Add smooth reveal animation to images
  export const animateImageLoad = (img) => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    img.onload = () => {
      setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 100);
    };
  };
  
  // Counter animation
  export const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    requestAnimationFrame(updateCounter);
  };
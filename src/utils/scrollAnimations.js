// Enhanced scrollAnimations.js with better timing and section awareness
// src/utils/scrollAnimations.js

export const initScrollAnimations = () => {
    // Better observer options for faster response
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% is visible
      rootMargin: '0px 0px -100px 0px' // Start animation 100px before element fully enters
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add animation class based on data attribute
          const animationType = element.dataset.animate;
          const delay = element.dataset.delay || '';
          
          if (animationType) {
            // IMPROVED: Faster delays and better timing
            const delayMs = delay ? parseInt(delay) * 50 : 0; // Reduced from 100ms to 50ms
            
            setTimeout(() => {
              element.classList.add(`animate-${animationType}`);
              if (delay) {
                element.classList.add(`animate-delay-${delay}`);
              }
              
              // Make sure element becomes visible
              element.style.opacity = '';
              element.style.visibility = '';
              
              // Debug log
              console.log(`🎬 Animated: ${animationType} with ${delayMs}ms delay`);
            }, delayMs);
          }
          
          // Stop observing this element
          observer.unobserve(element);
        }
      });
    }, observerOptions);
  
    // IMPROVED: Faster DOM ready check
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      console.log(`🎬 Found ${animatedElements.length} elements to animate`);
      
      animatedElements.forEach(el => {
        // Set initial state for animation
        if (!el.classList.contains('animate-fade-in-up') && 
            !el.classList.contains('animate-fade-in-left') && 
            !el.classList.contains('animate-fade-in-right')) {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        }
        observer.observe(el);
      });
    }, 50); // Reduced from 100ms to 50ms
  
    return observer;
  };
  
  // NEW: Section-aware animation initializer
  export const initSectionAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          
          // Find all animated elements within this section
          const sectionElements = section.querySelectorAll('[data-animate]');
          
          sectionElements.forEach((element, index) => {
            const animationType = element.dataset.animate;
            const delay = element.dataset.delay || index; // Use index if no delay specified
            
            if (animationType) {
              // Fast, sequential animation within the section
              const delayMs = parseInt(delay) * 100; // 100ms between each element
              
              setTimeout(() => {
                element.classList.add(`animate-${animationType}`);
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                
                console.log(`🎬 Section animation: ${animationType} (${delayMs}ms)`);
              }, delayMs);
            }
          });
          
          observer.unobserve(section);
        }
      });
    }, observerOptions);
  
    // Observe main sections
    const sections = document.querySelectorAll('section, main');
    sections.forEach(section => {
      if (section.querySelectorAll('[data-animate]').length > 0) {
        observer.observe(section);
      }
    });
  
    return observer;
  };
  
  // Original page animations function (add if missing)
  export const initPageAnimations = (config = {}) => {
    const observers = [];
    
    // Initialize scroll animations if enabled
    if (config.enableScrollAnimations !== false) {
      observers.push(initScrollAnimations());
      observers.push(initSectionAnimations());
    }
    
    // Add other animation types here (parallax, counters, etc.)
    
    // Return cleanup function
    return () => {
      observers.forEach(observer => {
        if (observer && observer.disconnect) {
          observer.disconnect();
        }
      });
    };
  };
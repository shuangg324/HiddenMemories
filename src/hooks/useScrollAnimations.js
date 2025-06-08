// src/hooks/useScrollAnimations.js
// Enhanced React Hook with section animations support

import { useEffect } from 'react';
import { initScrollAnimations, initSectionAnimations, initPageAnimations } from '../utils/scrollAnimations';

// Simple hook for basic scroll animations
export const useScrollAnimations = () => {
  useEffect(() => {
    const observer = initScrollAnimations();
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
};

// NEW: Hook for section-based animations
export const useSectionAnimations = () => {
  useEffect(() => {
    const observer = initSectionAnimations();
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
};

// Advanced hook for full page animations with section support
export const usePageAnimations = (config = {}) => {
  useEffect(() => {
    const cleanup = initPageAnimations({
      enableScrollAnimations: true,
      enableSectionAnimations: true,
      ...config
    });
    
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [config]);
};

// Hook for individual element animations with improved timing
export const useElementAnimation = (elementRef, animationType = 'fade-in-up', delay = 0) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Use improved timing (50ms base instead of 100ms)
          setTimeout(() => {
            element.classList.add(`animate-${animationType}`);
            element.style.opacity = '1';
            element.style.visibility = 'visible';
          }, delay * 50); // Faster timing
          
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' } // Improved rootMargin
    );

    // Set initial state
    elementRef.current.style.opacity = '0';
    elementRef.current.style.visibility = 'hidden';
    
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, animationType, delay]);
};

// Hook for staggered list animations with faster timing
export const useStaggeredAnimation = (containerRef, animationType = 'fade-in-up', delayIncrement = 100) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          
          Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.visibility = 'hidden';
            
            // Improved timing - use 50ms base for faster animations
            setTimeout(() => {
              child.classList.add(`animate-${animationType}`);
              child.style.opacity = '1';
              child.style.visibility = 'visible';
            }, index * Math.max(50, delayIncrement)); // Minimum 50ms delay
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' } // Better trigger point
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, animationType, delayIncrement]);
};
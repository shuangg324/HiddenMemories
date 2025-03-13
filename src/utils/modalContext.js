import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for modal state
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset form and overlays
  const resetModalContent = () => {
    const form = document.querySelector("#contact__form");
    const success = document.querySelector(".modal__overlay--success");
    const loading = document.querySelector(".modal__overlay--loading");

    if (form) form.reset();
    if (success) success.classList.remove("modal__overlay--visible");
    if (loading) loading.classList.remove("modal__overlay--visible");
  };

  // Toggle modal with animation handling
  const toggleModal = () => {
    if (isAnimating) return; // Prevent interaction during animation
    
    setIsAnimating(true);
    
    if (isModalOpen) {
      // Close modal
      document.body.classList.remove("modal--open");
      resetModalContent();
      setTimeout(() => {
        setIsModalOpen(false);
        setIsAnimating(false);
      }, 300); // Match this to your CSS transition duration
    } else {
      // Open modal
      window.scrollTo(0, 0);
      setIsModalOpen(true);
      document.body.classList.add("modal--open");
      setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this to your CSS transition duration
    }
  };
  
  // Explicitly open modal
  const openModal = () => {
    if (isAnimating || isModalOpen) return; // Prevent if already open or animating
    
    setIsAnimating(true);
    window.scrollTo(0, 0);
    setIsModalOpen(true);
    document.body.classList.add("modal--open");
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match this to your CSS transition duration
  };
  
  // Explicitly close modal
  const closeModal = () => {
    if (isAnimating || !isModalOpen) return; // Prevent if already closed or animating
    
    setIsAnimating(true);
    document.body.classList.remove("modal--open");
    resetModalContent();
    
    setTimeout(() => {
      setIsModalOpen(false);
      setIsAnimating(false);
    }, 300); // Match this to your CSS transition duration
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("modal--open");
    };
  }, []);

  return (
    <ModalContext.Provider value={{ 
      isModalOpen, 
      isAnimating,
      toggleModal, 
      openModal,
      closeModal,
      setIsModalOpen
    }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
import React, { createContext, useState, useContext } from 'react';

// Create a context for modal state
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => {
      if (!prevState) {
        window.scrollTo(0, 0);
      }

      // When closing the modal, reset form and states
      if (prevState) {
        const form = document.querySelector("#contact__form");
        const success = document.querySelector(".modal__overlay--success");
        const loading = document.querySelector(".modal__overlay--loading");

        if (form) form.reset();
        if (success) success.classList.remove("modal__overlay--visible");
        if (loading) loading.classList.remove("modal__overlay--visible");
      }

      // Toggle modal state and body class
      document.body.classList.toggle("modal--open", !prevState);
      return !prevState;
    });
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal, setIsModalOpen }}>
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
  
    // Return an array with isModalOpen and setIsModalOpen to match useState destructuring
    return context;
  };
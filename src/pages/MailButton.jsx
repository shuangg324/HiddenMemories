import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../utils/modalContext';

const MailButton = () => {
  const { toggleModal } = useModal();

  return (
    <button 
      className="mail__btn click" 
      onClick={(e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        toggleModal();
      }}
    >
      <FontAwesomeIcon icon={faEnvelope} />
    </button>
  );
};

export default MailButton;
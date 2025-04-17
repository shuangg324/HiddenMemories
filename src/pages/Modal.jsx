import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../utils/modalContext.js';
import { contact } from '../utils/toggleModal.js';

const Modal = () => {
    const { isModalOpen, closeModal, setIsModalOpen } = useModal();
    const modalRef = useRef(null);

    // Handle click outside to close the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current && 
                !modalRef.current.contains(event.target) &&
                !document.querySelector('.mail__btn')?.contains(event.target) &&
                !document.querySelector('.navbar')?.contains(event.target)
            ) {
                closeModal();
            }
        };

        const handleCloseModal = () => {
            closeModal();
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            
            // Store the current value of modalRef
            const currentModalRef = modalRef.current;
            
            if (currentModalRef) {
                currentModalRef.addEventListener('closeModal', handleCloseModal);
            }
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                
                if (currentModalRef) {
                    currentModalRef.removeEventListener('closeModal', handleCloseModal);
                }
            };
        }
    }, [isModalOpen, closeModal]);

    return (
        <div className={`modal ${isModalOpen ? 'modal--open' : ''}`} ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="modal__left modal__half modal__about" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title modal__title--about">Here's a bit about us.</h3>
                <p className="modal__para">
                    We are experienced Bartenders with over 5+ years working in high-end restaurants and bars.
                    Whether you're planning an Elegant Soirée or a Casual Celebration,
                    our mobile bar service is designed to elevate your event with custom-crafted cocktails, exceptional service, and a personalized touch.
                    <br />
                    Let us turn your gathering into an unforgettable experience - Book Us today!
                    <br />
                    *Servicing LA County and Surrounding Areas.
                </p>
            </div>
            <div className="modal__right modal__half modal__contact" onClick={(e) => e.stopPropagation()}>
                <i className="fas fa-times modal__exit click" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </i>
                <h3 className="modal__title modal__title--contact">Let's have a chat!</h3>
                <p className="modal__sub-title modal__sub-title--contact">We'd love to be part of your next event!</p>
                <form id="contact__form" onSubmit={(event) => contact(event, setIsModalOpen)}>
                    <div className="form__item">
                        <p className="form__item--label" htmlFor="user_name">Name</p>
                        <input className="input" name="user_name" type="text" required />
                    </div>
                    <div className="form__item">
                        <p className="form__item--label" htmlFor="user_email">Email</p>
                        <input className="input" name="user_email" type="email" required />
                    </div>
                    <div className="form__item">
                        <p className="form__item--label" htmlFor="message">Message</p>
                        <textarea className="input" name="message" required></textarea>
                    </div>
                    <button id="contact__submit" className="form__submit">Send it my way</button>
                </form>
                <div className="modal__overlay modal__overlay--loading">
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
                <div className="modal__overlay modal__overlay--success">
                    Thanks for the message! Looking forward to speaking to you soon.
                </div>
            </div>
        </div>
    );
};

export default Modal;
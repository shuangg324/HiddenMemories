import { useRef, useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../utils/modalContext.js';
import { contact } from '../utils/toggleModal.js';

/* Must be >= longest CSS exit animation (door close 220ms + drop delay 100ms + drop 520ms = 640ms) */
const EXIT_MS = 680;

/* How long to ignore outside-clicks after opening (> enter animation: ~600ms) */
const OPEN_GRACE_MS = 660;

const Modal = () => {
    const { isModalOpen, setIsModalOpen } = useModal();
    const modalRef = useRef(null);

    /* CSS class for exit animation */
    const [isClosing, setIsClosing] = useState(false);

    /* Refs so handleClose / handleClickOutside never change reference */
    const isClosingRef  = useRef(false);
    const justOpenedRef = useRef(false);
    const graceTimer    = useRef(null);

    /* Set grace period whenever the modal opens */
    useEffect(() => {
        if (isModalOpen && !isClosing) {
            justOpenedRef.current = true;
            clearTimeout(graceTimer.current);
            graceTimer.current = setTimeout(() => {
                justOpenedRef.current = false;
            }, OPEN_GRACE_MS);
        }
        return () => clearTimeout(graceTimer.current);
    }, [isModalOpen, isClosing]);

    /* Stable close handler — refs avoid stale closure & useEffect churn */
    const handleClose = useCallback(() => {
        if (isClosingRef.current || justOpenedRef.current) return;

        isClosingRef.current = true;
        setIsClosing(true);
        document.body.classList.remove('modal--open');

        const form    = document.querySelector('#contact__form');
        const success = document.querySelector('.modal__overlay--success');
        const loading = document.querySelector('.modal__overlay--loading');
        if (form)    form.reset();
        if (success) success.classList.remove('modal__overlay--visible');
        if (loading) loading.classList.remove('modal__overlay--visible');

        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
            isClosingRef.current = false;
        }, EXIT_MS);
    }, [setIsModalOpen]); /* stable — setIsModalOpen never changes */

    /* Click-outside listener — only depends on isModalOpen */
    useEffect(() => {
        if (!isModalOpen) return;

        const handleClickOutside = (e) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target) &&
                !document.querySelector('.mail__btn')?.contains(e.target) &&
                !document.querySelector('.navbar')?.contains(e.target)
            ) {
                handleClose();
            }
        };

        const handleCloseEvent = () => handleClose();

        document.addEventListener('mousedown', handleClickOutside);
        modalRef.current?.addEventListener('closeModal', handleCloseEvent);

        const ref = modalRef.current;
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            ref?.removeEventListener('closeModal', handleCloseEvent);
        };
    }, [isModalOpen, handleClose]);

    return (
        <>
        {/* Radial-wipe backdrop */}
        {isModalOpen && (
            <div
                className={`modal-backdrop ${isClosing ? 'modal-backdrop--out' : 'modal-backdrop--in'}`}
                aria-hidden="true"
            />
        )}

        <div
            className={`modal ${isModalOpen ? 'modal--open' : ''} ${isClosing ? 'modal--closing' : ''}`}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
        >
            <button className="modal__exit" onClick={handleClose} aria-label="Close">
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="modal__left modal__half modal__about" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title modal__title--about">Here's a bit about us.</h3>
                <p className="modal__para">
                    We are a small, passionate crew of bartenders who genuinely love what we do.
                    Working in upscale bars and restaurants, we've learned that great service isn't
                    just about the drink; it's about connection, atmosphere, and the little moments that stick with people long after the last call.
                    <br />
                    Let us turn your gathering into an unforgettable experience - Book Us today!
                    <br />
                    <br />
                    <span className="italic">*Servicing LA County and Surrounding Areas.</span>
                </p>
            </div>
            <div className="modal__right modal__half modal__contact" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal__title modal__title--contact">Let's have a chat!</h3>
                <p className="modal__sub-title modal__sub-title--contact">We'd love to be part of your next event.</p>
                <form id="contact__form" onSubmit={(event) => contact(event, setIsModalOpen)}>
                    <div className="modal__form-row">
                        <div className="form__item">
                            <label className="form__item--label" htmlFor="user_name">Your name</label>
                            <input className="input" id="user_name" name="user_name" type="text" placeholder="Jane Smith" required />
                        </div>
                        <div className="form__item">
                            <label className="form__item--label" htmlFor="user_email">Email address</label>
                            <input className="input" id="user_email" name="user_email" type="email" placeholder="jane@example.com" required />
                        </div>
                    </div>
                    <div className="form__item">
                        <label className="form__item--label" htmlFor="message">Tell us about your event</label>
                        <textarea className="input modal__textarea" id="message" name="message" placeholder="Date, location, number of guests, vibe — anything helps!" required></textarea>
                    </div>
                    <button id="contact__submit" className="form__submit">Send it our way →</button>
                </form>
                <div className="modal__overlay modal__overlay--loading">
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
                <div className="modal__overlay modal__overlay--success">
                    Thanks for the message! Looking forward to speaking to you soon.
                </div>
            </div>
        </div>
        </>
    );
};

export default Modal;

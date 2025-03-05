import emailjs from "emailjs-com";

export const toggleModal = (setIsModalOpen) => {
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

export const handleClickOutside = (event, setIsModalOpen) => {
    if (event.target === event.currentTarget) {
        toggleModal(setIsModalOpen);
    }
};

export const contact = (event, setIsModalOpen) => {
    event.preventDefault();

    const loading = document.querySelector(".modal__overlay--loading");
    const success = document.querySelector(".modal__overlay--success");

    loading.classList.add("modal__overlay--visible");

    // Using EmailJS to send the form
    emailjs
        .sendForm("service_sd6g1hw", "template_eph0ydf", event.target, "7j7vJcTfHGJ0hv0R4")
        .then(() => {
            loading.classList.remove("modal__overlay--visible");
            success.classList.add("modal__overlay--visible");

            setTimeout(() => {
                const modalContext = document.querySelector('.modal');
                if (modalContext) {
                    // Dispatch a custom event to trigger modal close
                    const event = new Event('closeModal');
                    modalContext.dispatchEvent(event);
                }
                setIsModalOpen(false);
            }, 3000);
        })
        .catch(() => {
            loading.classList.remove("modal__overlay--visible");
            alert("The email service is temporarily unavailable. Please contact me directly at hiddenmemoriesbar@gmail.com");
        });
};


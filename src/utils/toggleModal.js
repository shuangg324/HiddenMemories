import emailjs from "emailjs-com";

export const contact = (event, setIsModalOpen) => {
    event.preventDefault();

    const loading = document.querySelector(".modal__overlay--loading");
    const success = document.querySelector(".modal__overlay--success");

    loading.classList.add("modal__overlay--visible");

    emailjs
        .sendForm("service_t3znxtz", "template_eph0ydf", event.target, "7j7vJcTfHGJ0hv0R4")
        .then(() => {
            loading.classList.remove("modal__overlay--visible");
            success.classList.add("modal__overlay--visible");

            setTimeout(() => {
                const modal = document.querySelector('.modal');
                if (modal) modal.dispatchEvent(new Event('closeModal'));
                setIsModalOpen(false);
            }, 3000);
        })
        .catch(() => {
            loading.classList.remove("modal__overlay--visible");
            alert("The email service is temporarily unavailable. Please contact us directly at hiddenmemoriesbar@gmail.com");
        });
};

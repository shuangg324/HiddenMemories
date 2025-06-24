import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
import moveBackground from '../utils/moveBackground';
import '../App.css';

const WeddingContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    partnerName: '',
    email: '',
    phone: '',
    eventDate: '',
    venue: '',
    guestCount: '',
    interested: '',
    stage: '',
    hearAbout: '',
    moodboard: '',
    message: ''
  });

  console.log('Current form data:', formData); // Debug log

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef(null);
  const formRef = useRef(null);

  // Use the exact same animation system as Home page
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animate;
          const delay = element.dataset.delay || '';
          
          if (animationType) {
            const delayMs = delay ? parseInt(delay) * 100 : 0; // Use 100ms like Home page
            
            setTimeout(() => {
              element.classList.add(`animate-${animationType}`);
              if (delay) {
                element.classList.add(`animate-delay-${delay}`);
              }
              
              // Make sure element becomes visible
              element.style.opacity = '';
              element.style.visibility = '';
            }, delayMs);
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Initialize exactly like Home page
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      console.log(`🎬 Found ${animatedElements.length} elements to animate`);
      
      animatedElements.forEach(el => {
        // Set initial state for animation - exactly like Home page
        if (!el.classList.contains('animate-fade-in-up') && 
            !el.classList.contains('animate-fade-in-left') && 
            !el.classList.contains('animate-fade-in-right')) {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        }
        observer.observe(el);
      });
    }, 50);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const validateAndScrollToError = () => {
    console.log('Starting validation...'); // Debug log
    
    const requiredFields = [
      { id: 'firstName', name: 'Your Name' },
      { id: 'email', name: 'Email' },
      { id: 'phone', name: 'Phone Number' },
      { id: 'eventDate', name: 'Event Date' },
      { id: 'interested', name: 'I\'m interested in' },
      { id: 'stage', name: 'Planning Stage' },
      { id: 'hearAbout', name: 'How did you hear about us' }
    ];

    for (const field of requiredFields) {
      const value = formData[field.id];
      console.log(`Checking ${field.name}: "${value}"`); // Debug log
      
      if (!value || value.trim() === '') {
        console.log(`Validation failed on: ${field.name}`); // Debug log
        const inputElement = document.getElementById(field.id);
        if (inputElement) {
          inputElement.parentElement.classList.add('error');
          inputElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          inputElement.focus();
        }
        return false;
      }
    }
    
    console.log('All validation passed!'); // Debug log
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!'); // Debug log
    console.log('Form data:', formData); // Debug log
    
    if (!validateAndScrollToError()) {
      console.log('Validation failed'); // Debug log
      return;
    }
    
    console.log('Validation passed, sending email...'); // Debug log
    
    setIsSubmitting(true);

    // Debug: Log what we're sending
    const emailData = {
      user_name: formData.firstName, // Just use firstName since it contains full name
      partner_name: formData.partnerName,
      user_email: formData.email,
      phone: formData.phone,
      event_date: formData.eventDate,
      venue: formData.venue,
      guest_count: formData.guestCount,
      interested_in: formData.interested,
      planning_stage: formData.stage,
      heard_about: formData.hearAbout,
      moodboard_link: formData.moodboard,
      message: `
Event Details:
- Name: ${formData.firstName}
- Partner: ${formData.partnerName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Event Date: ${formData.eventDate}
- Venue: ${formData.venue}
- Guest Count: ${formData.guestCount}
- Interested In: ${formData.interested}
- Planning Stage: ${formData.stage}
- Heard About Us: ${formData.hearAbout}
- Moodboard: ${formData.moodboard}
- Additional Message: ${formData.message}
      `,
      to_email: 'hiddenmemoriesbar@gmail.com'
    };

    console.log('Sending email with data:', emailData);

    try {
      const result = await emailjs.send(
        'service_t3znxtz',
        'template_eph0ydf',
        emailData,
        '7j7vJcTfHGJ0hv0R4'
      );

      console.log('EmailJS Success:', result);
      alert('Thank you! Your wedding inquiry has been sent successfully. We\'ll get back to you soon!');
      
      // Reset form
      setFormData({
        firstName: '',
        partnerName: '',
        email: '',
        phone: '',
        eventDate: '',
        venue: '',
        guestCount: '',
        interested: '',
        stage: '',
        hearAbout: '',
        moodboard: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error Details:', error);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      
      // More specific error messages
      if (error.status === 400) {
        alert('Error: Invalid template or service ID. Please contact us directly at hiddenmemoriesbar@gmail.com');
      } else if (error.status === 401) {
        alert('Error: Authentication failed. Please contact us directly at hiddenmemoriesbar@gmail.com');
      } else {
        alert('Sorry, there was an error sending your message. Please try again or contact us directly at hiddenmemoriesbar@gmail.com');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="App" onMouseMove={(event) => moveBackground(event)}>
      <div className="container">
        
        {/* ANIMATED: Header section - individual element animations */}
        <div className="header">
          <h1 className="section__title dark-mode-title" data-animate="fade-in-up" data-delay="0">Contact me!</h1>
          <p className="contact__header" data-animate="fade-in-up" data-delay="2">Please fill out the form and I will reach out to you shortly</p>
        </div>

        <div className="form-container" data-animate="fade-in-up" data-delay="1">
          <form ref={formRef} id="contactForm" onSubmit={handleSubmit}>
            
            {/* ANIMATED: Name field */}
            <div className="form-group" data-animate="fade-in-left" data-delay="2">
              <label htmlFor="firstName" className="required">Your Name</label>
              <input 
                type="text" 
                id="firstName" 
                placeholder="Please provide your full name" 
                required
                value={formData.firstName}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* ANIMATED: Partner name */}
            <div className="form-group" data-animate="fade-in-up" data-delay="4">
              <label htmlFor="partnerName">Partner's Name</label>
              <input 
                type="text" 
                id="partnerName" 
                placeholder="Please provide your partner's full name"
                value={formData.partnerName}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* ANIMATED: Contact info row */}
            <div className="form-row">
              <div className="form-group" data-animate="fade-in-left" data-delay="5">
                <label htmlFor="email" className="required">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Please provide your email address" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group" data-animate="fade-in-right" data-delay="6">
                <label htmlFor="phone" className="required">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="Please provide your phone number" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* ANIMATED: Event date */}
            <div className="form-group" data-animate="fade-in-up" data-delay="7">
              <label htmlFor="eventDate" className="required">Event Date</label>
              <div className="date-input-container">
                <input 
                  ref={dateInputRef}
                  type="date" 
                  id="eventDate" 
                  placeholder="Select your event date"
                  required
                  min="2025-01-01"
                  max="2030-12-31"
                  value={formData.eventDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="date-input"
                />
                <FontAwesomeIcon 
                  icon={faCalendarDays} 
                  className="calendar-icon"
                  onClick={handleCalendarClick}
                  title="Select date from calendar"
                />
              </div>
            </div>

            {/* ANIMATED: Venue */}
            <div className="form-group" data-animate="fade-in-up" data-delay="9">
              <label htmlFor="venue">Event Venue</label>
              <input 
                type="text" 
                id="venue" 
                placeholder="Where will your special day take place?"
                value={formData.venue}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* ANIMATED: Guest count */}
            <div className="form-group" data-animate="fade-in-up" data-delay="8">
              <label htmlFor="guestCount">Estimated Number of Guests</label>
              <select 
                id="guestCount" 
                value={formData.guestCount}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select guest count</option>
                <option value="1-25">1-25 guests</option>
                <option value="26-50">26-50 guests</option>
                <option value="51-75">51-75 guests</option>
                <option value="76-100">76-100 guests</option>
                <option value="101-150">101-150 guests</option>
                <option value="151-200">151-200 guests</option>
                <option value="200+">200+ guests</option>
              </select>
            </div>

            {/* ANIMATED: Dropdown selections */}
            <div className="form-group" data-animate="fade-in-up" data-delay="10">
              <label htmlFor="interested" className="required">I'm interested in:</label>
              <select 
                id="interested" 
                required
                value={formData.interested}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="" disabled>Select</option>
                <option value="fullDay">Open Bar</option>
                <option value="halfDay">Custom Set Menu</option>
                <option value="elopement">Non-alcoholic Drinks</option>
                <option value="engagement">Beer/Wine</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group" data-animate="fade-in-up" data-delay="11">
              <label htmlFor="stage" className="required">What stage of the process are you in?</label>
              <select 
                id="stage" 
                required
                value={formData.stage}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="" disabled>Select</option>
                <option value="justEngaged">Just Exploring</option>
                <option value="startingPlanning">Starting to Plan</option>
                <option value="vendorShopping">Shopping for Vendors</option>
                <option value="finalTouches">I want you for my event</option>
              </select>
            </div>

            <div className="form-group" data-animate="fade-in-up" data-delay="12">
              <label htmlFor="hearAbout" className="required">How did you hear about us?</label>
              <select 
                id="hearAbout" 
                required
                value={formData.hearAbout}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="" disabled>Select</option>
                <option value="google">Google Search</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="theknot">The Knot/Thumbtack</option>
                <option value="referral">Friend/Vendor Referral</option>
                <option value="pastClient">Past Client</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* ANIMATED: Additional fields */}
            <div className="form-group" data-animate="fade-in-up" data-delay="13">
              <label htmlFor="moodboard">Do you have a mood board or Pinterest board for your event? I would love to see your vision.</label>
              <input 
                type="text" 
                id="moodboard" 
                placeholder="Share a link to your inspiration"
                value={formData.moodboard}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group" data-animate="fade-in-up" data-delay="14">
              <label htmlFor="message">Anything you'd like to share or questions you might have:</label>
              <textarea 
                id="message" 
                placeholder="Tell me more about your special day..."
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* ANIMATED: Submit button */}
            <div className="submit-container" data-animate="fade-in-up" data-delay="15">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Background shapes */}
      <div>
        {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
          <FontAwesomeIcon key={`${index}-1`} icon={icon} className={`shape shape--${index * 2}`} />,
          <FontAwesomeIcon key={`${index}-2`} icon={icon} className={`shape shape--${index * 2 + 1}`} />
        ]).concat([
          <FontAwesomeIcon 
            key="9" 
            icon={faGlassMartini} 
            className="shape shape--9"
            aria-hidden="true"
          />
        ])}
      </div>
    </div>
  );
};

export default WeddingContactForm;
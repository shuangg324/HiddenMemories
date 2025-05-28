import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com'; // Make sure this is installed
import moveBackground from '../utils/moveBackground';
import '../App.css';

const WeddingContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    partnerName: '',
    email: '',
    phone: '',
    eventDate: '',
    venue: '',
    interested: '',
    stage: '',
    hearAbout: '',
    moodboard: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef(null);
  const formRef = useRef(null);

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
    console.log('Validation function called'); // This should show in console
    
    const requiredFields = [
      { id: 'firstName', name: 'First Name' },
      { id: 'lastName', name: 'Last Name' },
      { id: 'email', name: 'Email' },
      { id: 'phone', name: 'Phone Number' },
      { id: 'eventDate', name: 'Event Date' },
      { id: 'interested', name: 'I\'m interested in' },
      { id: 'stage', name: 'Planning Stage' },
      { id: 'hearAbout', name: 'How did you hear about us' }
    ];
  
    for (const field of requiredFields) {
      const value = formData[field.id];
      console.log(`Checking field ${field.id}:`, value); // Debug log
      
      if (!value || value.trim() === '') {
        console.log(`Field ${field.id} is empty!`); // Debug log
        
        // Find the input element
        const inputElement = document.getElementById(field.id);
        if (inputElement) {
          console.log(`Found input element for ${field.id}`); // Debug log
          
          // Add error styling
          inputElement.parentElement.classList.add('error');
          
          // Scroll to element
          inputElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          inputElement.focus();
        }
        
        return false;
      }
    }
    
    console.log('All fields valid'); // Debug log
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called!'); // This should show
  console.log('Form data:', formData);

  alert('Form submitted!');
    
    // Validate required fields and scroll to first empty one
    if (!validateAndScrollToError()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Using the same EmailJS configuration as your modal
      const result = await emailjs.send(
        'service_t3znxtz',    // Your service ID
        'template_eph0ydf',   // Your template ID  
        {
          // Map form data to email template variables
          user_name: `${formData.firstName} ${formData.lastName}`,
          partner_name: formData.partnerName,
          user_email: formData.email,
          phone: formData.phone,
          event_date: formData.eventDate,
          venue: formData.venue,
          interested_in: formData.interested,
          planning_stage: formData.stage,
          heard_about: formData.hearAbout,
          moodboard_link: formData.moodboard,
          message: `
Event Details:
- First Name: ${formData.firstName}
- Last Name: ${formData.lastName}
- Partner: ${formData.partnerName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Event Date: ${formData.eventDate}
- Venue: ${formData.venue}
- Interested In: ${formData.interested}
- Planning Stage: ${formData.stage}
- Heard About Us: ${formData.hearAbout}
- Moodboard: ${formData.moodboard}
- Additional Message: ${formData.message}
          `,
          to_email: 'hiddenmemoriesbar@gmail.com'
        },
        '7j7vJcTfHGJ0hv0R4'  // Your public key
      );

      console.log('Email sent successfully:', result);
      alert('Thank you! Your wedding inquiry has been sent successfully. We\'ll get back to you soon!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        partnerName: '',
        email: '',
        phone: '',
        eventDate: '',
        venue: '',
        interested: '',
        stage: '',
        hearAbout: '',
        moodboard: '',
        message: ''
      });

    } catch (error) {
      console.error('Email send failed:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly at hiddenmemoriesbar@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <div className="App" onMouseMove={(event) => moveBackground(event)}>
        <div className="container">
          <div className="header">
            <h1 className="section__title dark-mode-title">Contact me!</h1>
            <p className="contact__header">Please fill out the form and I will reach out to you shortly</p>
          </div>

          <div className="form-container">
            <form ref={formRef} id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName" className="required">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="Please provide your first name" 
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="required">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="Please provide your last name" 
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="hearAbout" className="required">How did you hear about me?</label>
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

              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="message">Anything you'd like to share or questions you might have:</label>
                <textarea 
                  id="message" 
                  placeholder="Tell me more about your special day..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>

        <div>
          {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
            <FontAwesomeIcon key={`${index}-1`} icon={icon} className={`shape shape--${index * 2}`} />,
            <FontAwesomeIcon key={`${index}-2`} icon={icon} className={`shape shape--${index * 2 + 1}`} />
          ])}
        </div>
      </div>
    </>
  );
};

export default WeddingContactForm;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer } from '@fortawesome/free-solid-svg-icons';
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! Thank you for reaching out.');
    // Here you would typically send the data to your backend
    console.log(formData);
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
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName" className="required">First</label>
              <input 
                type="text" 
                id="firstName" 
                placeholder="Please provide your first name" 
                required
                value={formData.firstName}
                onChange={handleChange}
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventDate" className="required">Event Date</label>
              <div className="date-input">
                <input 
                  type="text" 
                  id="eventDate" 
                  placeholder="Apr 4, 2025" 
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="interested" className="required">I'm interested in:</label>
              <select 
                id="interested" 
                required
                value={formData.interested}
                onChange={handleChange}
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Anything you'd like to share or questions you might have:</label>
              <textarea 
                id="message" 
                placeholder="Tell me more about your special day..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send</button>
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
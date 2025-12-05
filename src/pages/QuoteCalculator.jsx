import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faUsers, 
  faClock, 
  faGlassMartini,
  faCheckCircle,
  faInfoCircle,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const QuoteCalculator = () => {
  const [formData, setFormData] = useState({
    guestCount: '',
    serviceHours: '5',
    addOns: []
  });

  const [quote, setQuote] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Pricing structure
  const pricing = useMemo(() => ({
    basePackage: 1000, // 5 hours
    baseHours: 5,
    additionalHour: 150,
    addOns: {
      mixers: { price: 5, name: 'Premium Mixers*', perGuest: true },
      garnishes: { price: 2, name: 'Specialty Garnishes', perGuest: true },
      waterStation: { price: 2, name: 'Water Station*', perGuest: true },
      ice: { price: 2, name: 'Ice Service', perGuest: true },
      glassware: { price: 5, name: 'Glassware Upgrade', perGuest: true },
      extraBartender: { price: 300, name: 'Additional Bartender (per 75 guests)', perGuest: false, per75Guests: true }
    }
  }), []);

  // Calculate quote whenever form changes
  

// Wrap calculateQuote in useCallback so it can safely be a dependency
const calculateQuote = useCallback(() => {
  const guests = parseInt(formData.guestCount) || 0;
  const hours = parseInt(formData.serviceHours) || 5;

  // Base package cost
  let total = pricing.basePackage;

  // Additional hours beyond base
  const additionalHoursCost = hours > pricing.baseHours ? (hours - pricing.baseHours) * pricing.additionalHour : 0;
  total += additionalHoursCost;

  // Add-ons
  let addOnTotal = 0;
  const breakdown = [];

  formData.addOns.forEach((addOnKey) => {
    const addOn = pricing.addOns[addOnKey];
    if (!addOn) return;

    let cost = 0;

    if (addOn.per75Guests) {
      // Extra bartenders: 1 per 75 guests AFTER the first included bartender
      const extraBartenders = Math.floor(guests / 75);
      cost = addOn.price * extraBartenders;

      breakdown.push({
        name: `${addOn.name} (${extraBartenders} extra)`,
        cost,
        perGuest: false
      });

    } else {
      cost = addOn.perGuest ? addOn.price * guests : addOn.price;
      breakdown.push({
        name: addOn.name,
        cost,
        perGuest: addOn.perGuest
      });
    }

    addOnTotal += cost;
  });

  total += addOnTotal;

  const recommendExtraBartender = guests > 75 && !formData.addOns.includes('extraBartender');

  setQuote({
    basePackage: pricing.basePackage,
    additionalHours: additionalHoursCost,
    addOns: breakdown,
    addOnTotal,
    total,
    guests,
    hours,
    recommendExtraBartender
  });
}, [formData, pricing, setQuote]);

// useEffect now clean, no warnings
useEffect(() => {
  calculateQuote();
}, [calculateQuote]);


  const handleGuestChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 500)) {
      setFormData(prev => ({ ...prev, guestCount: value }));
    }
  };

  const handleHoursChange = (e) => {
    setFormData(prev => ({ ...prev, serviceHours: e.target.value }));
  };

  const handleAddOnToggle = (addOnKey) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnKey)
        ? prev.addOns.filter(key => key !== addOnKey)
        : [...prev.addOns, addOnKey]
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8f3 0%, #ebddc9 100%)',
      padding: '40px 20px',
      fontFamily: "'Bebas Neue', sans-serif"
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <FontAwesomeIcon 
            icon={faCalculator} 
            style={{
              fontSize: '3rem',
              color: '#849f4f',
              marginBottom: '20px',
              animation: 'bounceIn 0.8s ease-out'
            }}
          />
          <h1 style={{
            fontSize: '48px',
            color: '#7d3327',
            marginBottom: '10px',
            letterSpacing: '2px'
          }}>
            Free Quote Calculator
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#dda165',
            fontFamily: "'Roboto', sans-serif"
          }}>
            Get an instant estimate for your event
          </p>
        </div>

        {/* Main Calculator */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Input Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid rgba(221, 161, 101, 0.2)',
            animation: 'fadeInLeft 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: '28px',
              color: '#7d3327',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FontAwesomeIcon icon={faGlassMartini} />
              Event Details
            </h2>

            {/* Guest Count */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '18px',
                color: '#7d3327',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>
                <FontAwesomeIcon icon={faUsers} />
                Number of Guests
              </label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={handleGuestChange}
                placeholder="Enter guest count"
                min="1"
                max="500"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '18px',
                  border: '2px solid #dda165',
                  borderRadius: '8px',
                  background: '#fff8f3',
                  color: '#360a05',
                  fontFamily: "'Roboto', sans-serif"
                }}
              />
            </div>

            {/* Service Hours */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '18px',
                color: '#7d3327',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>
                <FontAwesomeIcon icon={faClock} />
                Hours of Service
              </label>
              <select
                value={formData.serviceHours}
                onChange={handleHoursChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '18px',
                  border: '2px solid #dda165',
                  borderRadius: '8px',
                  background: '#fff8f3',
                  color: '#360a05',
                  cursor: 'pointer',
                  fontFamily: "'Roboto', sans-serif"
                }}
              >
                {[5, 6, 7, 8].map(hour => (
                  <option key={hour} value={hour}>
                    {hour} {hour === 1 ? 'hour' : 'hours'} {hour === 5 ? '(Standard)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Add-ons */}
            <div>
              <h3 style={{
                fontSize: '20px',
                color: '#7d3327',
                marginBottom: '15px'
              }}>
                Select Add-ons
              </h3>
              {Object.entries(pricing.addOns).map(([key, addOn]) => (
  <div
    key={key}
    onClick={() => handleAddOnToggle(key)}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      marginBottom: '10px',
      border: `2px solid ${
        formData.addOns.includes(key) ? '#849f4f' : '#dda165'
      }`,
      borderRadius: '8px',
      background: formData.addOns.includes(key)
        ? 'rgba(132, 159, 79, 0.1)'
        : '#fff8f3',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{
          color: formData.addOns.includes(key) ? '#849f4f' : '#dda165',
          fontSize: '20px',
        }}
      />
      <span
        style={{
          fontSize: '16px',
          color: '#7d3327',
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {addOn.name}
      </span>
    </div>

    <span
      style={{
        fontSize: '16px',
        color: '#849f4f',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {addOn.perGuest
        ? `$${addOn.price}/guest`
        : addOn.per75Guests
        ? `$${addOn.price}`
        : formatCurrency(addOn.price)}
    </span>
  </div>
))}

            </div>
          </div>

          {/* Quote Display */}
          <div style={{
            background: 'linear-gradient(135deg, #849f4f 0%, #7d3327 100%)',
            borderRadius: '20px',
            padding: '30px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            animation: 'fadeInRight 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: '28px',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FontAwesomeIcon icon={faCalculator} />
              Your Estimate
            </h2>

            {quote && formData.guestCount ? (
              <>
                {/* Total */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '25px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '18px',
                    marginBottom: '10px',
                    opacity: 0.9
                  }}>
                    Estimated Total
                  </div>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                  }}>
                    {formatCurrency(quote.total)}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    marginTop: '10px',
                    opacity: 0.8,
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    For {quote.guests} guests • {quote.hours} hours
                  </div>
                </div>

                {/* Breakdown Toggle */}
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>Price Breakdown</span>
                  <FontAwesomeIcon icon={showBreakdown ? faChevronUp : faChevronDown} />
                </button>

                {/* Breakdown Details */}
                {showBreakdown && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <span>Base Package (5 hours)</span>
                      <span>{formatCurrency(quote.basePackage)}</span>
                    </div>

                    {quote.additionalHours > 0 && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        <span>Additional Hours ({quote.hours - 5})</span>
                        <span>{formatCurrency(quote.additionalHours)}</span>
                      </div>
                    )}

                    {quote.addOns.length > 0 && (
                      <>
                        <div style={{
                          marginTop: '15px',
                          marginBottom: '10px'
                        }}>
                          Add-ons:
                        </div>
                        {quote.addOns.map((addOn, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '8px',
                              paddingLeft: '15px',
                              fontSize: '16px'
                            }}
                          >
                            <span>{addOn.name}</span>
                            <span>{formatCurrency(addOn.cost)}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {/* Recommendation */}
                {quote.recommendExtraBartender && (
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.2)',
                    border: '2px solid rgba(212, 175, 55, 0.5)',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '20px',
                    display: 'flex',
                    gap: '10px',
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '20px', flexShrink: 0 }} />
                    <div style={{ fontSize: '20px' }}>
                      For {quote.guests} guests, we recommend adding additional bartender(s) for the best service experience.
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  fontFamily: "'Roboto', sans-serif"
                }}>
                  <p style={{
                    fontSize: '20px',
                    marginBottom: '15px',
                    opacity: 0.9
                  }}>
                    Ready to book your event? Contact us for a detailed quote and to discuss your custom needs.
                  </p>
                  <a
  href="/contact"
  style={{
    display: 'block',
    width: '100%',
    padding: '14px',
    background: 'white',
    color: '#7d3327',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    letterSpacing: '1px'
  }}
>
  Get Final Quote
</a>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                opacity: 0.7,
                fontFamily: "'Roboto', sans-serif"
              }}>
                <FontAwesomeIcon 
                  icon={faGlassMartini} 
                  style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }}
                />
                <p>Enter your event details to see an instant quote</p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#7d3327',
          fontFamily: "'Roboto', sans-serif",
          animation: 'fadeInUp 0.8s ease-out 0.3s backwards'
        }}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
          <strong>Note:</strong> This is an estimated quote. Final pricing may vary based on specific event requirements, location, and availability. Contact us for a detailed, personalized quote.
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        input:focus, select:focus {
          outline: none;
          border-color: #849f4f;
          box-shadow: 0 0 0 3px rgba(132, 159, 79, 0.2);
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }
          
          h2 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteCalculator;
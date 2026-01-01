import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck, 
  faPhone,
  faArrowRight,
  faChevronDown,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const ModernLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Roboto', sans-serif",
      margin: 0,
      padding: 0
    }}>
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#1a1a1a'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `scale(${1 + scrollY * 0.0005})`,
          transition: 'transform 0.1s ease-out'
        }}>
          {/* Gradient Overlay - Warm Luxury Colors */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.85) 0%, rgba(97, 64, 81, 0.75) 50%, rgba(26, 26, 26, 0.85) 100%)'
          }} />
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '40px 20px',
          maxWidth: '900px',
          width: '100%'
        }}>
          {/* Premium Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 87, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 87, 0.3)',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '30px',
            animation: 'fadeInDown 1s ease-out'
          }}>
            <FontAwesomeIcon icon={faStar} style={{ color: '#D4AF57', fontSize: '14px' }} />
            <span style={{
              color: '#D4AF57',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Premium Mobile Bar Services
            </span>
            <FontAwesomeIcon icon={faStar} style={{ color: '#D4AF57', fontSize: '14px' }} />
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(42px, 8vw, 84px)',
            fontWeight: '300',
            color: '#FFFFFF',
            marginBottom: '20px',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            animation: 'fadeInUp 1s ease-out 0.2s backwards',
            fontFamily: "'Playfair Display', serif"
          }}>
            Elevate Every
            <br />
            <span style={{
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4AF57 0%, #C19A6B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Celebration
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '40px',
            lineHeight: 1.6,
            fontWeight: '300',
            letterSpacing: '0.5px',
            animation: 'fadeInUp 1s ease-out 0.4s backwards'
          }}>
            Crafting unforgettable moments with bespoke cocktails
            <br />
            and sophisticated service across LA County
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '50px',
            animation: 'fadeInUp 1s ease-out 0.6s backwards'
          }}>
            <button style={{
              padding: '18px 45px',
              fontSize: '18px',
              fontWeight: '600',
              letterSpacing: '1px',
              border: 'none',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #D4AF57 0%, #C19A6B 100%)',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(212, 175, 87, 0.3)',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 175, 87, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 87, 0.3)';
            }}
            >
              <FontAwesomeIcon icon={faCalendarCheck} />
              Book Your Event
            </button>

            <button style={{
              padding: '18px 45px',
              fontSize: '18px',
              fontWeight: '600',
              letterSpacing: '1px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 87, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            >
              <FontAwesomeIcon icon={faPhone} />
              (626) 367-4586
            </button>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            animation: 'fadeInUp 1s ease-out 0.8s backwards'
          }}>
            {[
              { label: 'Licensed & Insured', value: '✓' },
              { label: '5+ Years', value: '500+' },
              { label: 'Custom Menus', value: '✓' }
            ].map((item, index) => (
              <div key={index} style={{
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#D4AF57',
                  marginBottom: '5px'
                }}>
                  {item.value}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          cursor: 'pointer',
          zIndex: 10
        }}>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '24px'
            }}
          />
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section style={{
        padding: '100px 20px',
        background: '#2A2A2A',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '300',
              color: '#FFFFFF',
              marginBottom: '20px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Signature Experiences
            </h2>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #D4AF57, transparent)',
              margin: '0 auto'
            }} />
          </div>

          {/* 3 Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                title: 'Weddings',
                description: 'Craft the perfect toast for your special day with our bespoke cocktail creations and elegant bar setups.',
                image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600'
              },
              {
                title: 'Corporate Events',
                description: 'Impress clients and colleagues with sophisticated service and premium beverages tailored to your brand.',
                image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600'
              },
              {
                title: 'Private Parties',
                description: 'Transform your celebration into an unforgettable experience with custom cocktails and expert bartenders.',
                image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600'
              }
            ].map((item, index) => (
              <div key={index} style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0',
                background: '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.5s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 175, 87, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
              >
                <div style={{
                  position: 'relative',
                  paddingBottom: '75%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={item.image}
                    alt={item.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(26,26,26,0.7) 100%)'
                  }} />
                </div>
                <div style={{
                  padding: '30px'
                }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '400',
                    color: '#FFFFFF',
                    marginBottom: '15px',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.8,
                    marginBottom: '20px'
                  }}>
                    {item.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#D4AF57',
                    fontSize: '15px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer'
                  }}>
                    Learn More
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '12px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #614051 0%, #1a1a1a 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 87, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: '300',
            color: '#FFFFFF',
            marginBottom: '20px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Ready to Create
            <br />
            <span style={{
              fontWeight: '700',
              color: '#D4AF57'
            }}>
              Magic Together?
            </span>
          </h2>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            lineHeight: 1.7
          }}>
            Book your free consultation today and let's bring your vision to life
          </p>

          <button style={{
            padding: '20px 55px',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '1px',
            border: 'none',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #D4AF57 0%, #C19A6B 100%)',
            color: '#1a1a1a',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 40px rgba(212, 175, 87, 0.4)',
            textTransform: 'uppercase'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(212, 175, 87, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 175, 87, 0.4)';
          }}
          >
            Get Your Free Quote
            <FontAwesomeIcon icon={faArrowRight} />
          </button>

          <div style={{
            marginTop: '30px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '1px'
          }}>
            ✦ Free Consultation • Custom Pricing • No Obligations
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&family=Roboto:wght@300;400;600&display=swap');

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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernLandingPage;
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonPrimary from "./ButtonPrimary";
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      }
    });

    // Animate Header
    tl.fromTo(".cta-header-anim", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
    
    // Slide in the Form (Left) and Info Card (Right)
    tl.fromTo(".cta-split-left", 
      { x: -30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
    tl.fromTo(".cta-split-right", 
      { x: 30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="cta" id="evaluation" ref={sectionRef}>
      <div className="cta-wrapper">
        <div className="cta-text-content">
          <div className="scramble v1 cta-header-anim" style={{ color: "#229eff", marginBottom: "1rem" }}>BUSINESS EVALUATION</div>
          <h2 className="medium-big-text cta-header-anim" style={{ color: "#ffffff", marginBottom: "1.5rem" }}>
            Start With a Clear Understanding
          </h2>
          <p className="small-text text-secondary cta-header-anim" style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "3.5rem", fontSize: "1.1rem", lineHeight: "1.6" }}>
            The evaluation gives you a structured view of your business — how it operates today, what it's worth, and where value can be increased.
          </p>
        </div>

        <div className="cta-split-layout">
          
          {/* LEFT: Clean Form */}
          <div className="cta-split-left">
            <div className="cta-form-container">
              {isSubmitted ? (
                <div className="form-success-message">
                  <div className="success-icon">
                    <CheckCircle size={32} strokeWidth={2} />
                  </div>
                  <h3 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.8rem" }}>Request Received</h3>
                  <p style={{ color: "#a3a3a3", fontSize: "1.05rem", lineHeight: "1.5" }}>We will be in touch shortly to schedule your confidential evaluation.</p>
                </div>
              ) : (
                <form className="evaluation-form" onSubmit={handleSubmit}>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input type="text" id="name" className="form-input" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Work Email</label>
                      <input type="email" id="email" className="form-input" required placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company" className="form-label">Company Name</label>
                      <input type="text" id="company" className="form-input" required placeholder="Acme Corp" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                      <input type="tel" id="phone" className="form-input" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  {/* Textarea added to perfectly balance the height with the right card */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Current Operational Challenge</label>
                    <textarea 
                      id="message" 
                      className="form-input form-textarea" 
                      rows={3} 
                      placeholder="Briefly describe what feels broken or inefficient right now..."
                    ></textarea>
                  </div>

                  {/* Buttons side by side */}
                  <div className="form-action-row">
                    <ButtonPrimary href="#schedule" label="Schedule Call" />
                    <button type="submit" className="form-submit-btn">
                      Submit Form <ArrowRight className="btn-arrow" size={18} strokeWidth={2.5} />
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Contact Info Card */}
          <div className="cta-split-right">
            <div className="info-card">
              <div className="info-card-header">
                <h3 className="info-title">Contact Us</h3>
                <p className="info-subtitle">Prefer to reach out directly? Our team is available to assist you.</p>
              </div>
              
              <ul className="contact-list">
                <li>
                  <div className="contact-icon">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div className="contact-details">
                    <strong>Email</strong>
                    <a href="mailto:hello@vantage.com">hello@vantage.com</a>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <Phone size={24} strokeWidth={1.5} />
                  </div>
                  <div className="contact-details">
                    <strong>Phone</strong>
                    <a href="tel:+12367889">(+123) 678 89</a>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <div className="contact-details">
                    <strong>Office</strong>
                    <span>San Francisco, CA<br/>United States</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
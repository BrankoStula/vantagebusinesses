import Image from "next/image";

export default function Footer() {
  return (
    <>
      <section className="main-section fixed">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="wrapper-footer">
            <div className="block-footer">

              {/* ── Main grid ──────────────────────────────────── */}
              <div className="footer-main">

                {/* Brand */}
                <div className="footer-brand">
                  <a href="#hero" className="w-inline-block footer-logo-link">
                    <Image
                      src="/logo.svg"
                      alt="Vantage Business Solutions"
                      width={120}
                      height={32}
                      className="footer-logo-image"
                    />
                  </a>
                  <p className="footer-tagline">
                    Transforming operational inefficiency into enterprise value.
                  </p>
                  <p className="footer-desc">
                    We work with ambitious businesses to identify profit leaks,
                    unify systems, automate workflows, and increase valuation.
                  </p>
                </div>

                {/* Navigate */}
                <div className="footer-col">
                  <div className="footer-col-title">Navigate</div>
                  <nav className="footer-nav">
                    <a href="#product" className="footer-link">Product</a>
                    <a href="#lab" className="footer-link">Lab</a>
                    <a href="#workflow" className="footer-link">Workflow</a>
                    <a href="#integration" className="footer-link">Integration</a>
                    <a href="#calculator" className="footer-link">ROI Calculator</a>
                    <a href="#evaluation" className="footer-link">Free Evaluation</a>
                  </nav>
                </div>

                {/* What We Do */}
                <div className="footer-col">
                  <div className="footer-col-title">What We Do</div>
                  <ul className="footer-services">
                    <li>Profit Leak Analysis</li>
                    <li>Systems Integration</li>
                    <li>Workflow Automation</li>
                    <li>Enterprise Valuation</li>
                    <li>Business Exit Strategy</li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="footer-col footer-col--contact">
                  <div className="footer-col-title">Get In Touch</div>

                  <div className="footer-contact-group">
                    <div className="footer-contact-label">Email</div>
                    <a href="mailto:jay@vantagebusinesses.com" className="footer-link">
                      jay@vantagebusinesses.com
                    </a>
                    <a href="mailto:ben@vantagebusinesses.com" className="footer-link">
                      ben@vantagebusinesses.com
                    </a>
                  </div>

                  <div className="footer-contact-sep" />

                  <div className="footer-contact-group">
                    <div className="footer-contact-label">Phone</div>
                    <a href="tel:+14036078677" className="footer-link footer-link--mono">
                      Jay — +1 (403) 607-8677
                    </a>
                    <a href="tel:+447538047967" className="footer-link footer-link--mono">
                      Ben — +44 7538 047967
                    </a>
                  </div>
                </div>

              </div>

              {/* ── Bottom bar ─────────────────────────────────── */}
              <div className="footer-bottom">
                <div className="footer-copyright">
                  © 2025 Vantage Businesses. All rights reserved.
                </div>
                <div className="footer-bottom-center">
                  <div className="scramble">OPERATIONAL EXCELLENCE, GLOBALLY.</div>
                </div>
                <div className="footer-bottom-right">
                  <a href="mailto:jay@vantagebusinesses.com" className="footer-contact-btn">
                    Contact Jay
                  </a>
                  <a href="mailto:ben@vantagebusinesses.com" className="footer-contact-btn">
                    Contact Ben
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section id="contact-anchor" className="wrapper-footer anchor" />
    </>
  );
}

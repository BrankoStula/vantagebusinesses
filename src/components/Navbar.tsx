"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#product", label: "Product" },
    { href: "#lab", label: "Lab" },
    { href: "#workflow", label: "Workflow" },
    { href: "#integration", label: "Integration" },
  ];

  return (
    <div className="navbar">
      <div className="wrapper-navbar logo">
        <a href="#hero" className="w-inline-block">
          <Image
            src="/images/Logo-Quantara-Light.png"
            alt="Quantara"
            width={120}
            height={32}
            className="logo-navbar"
            style={{ width: "auto", height: "auto" }}
          />
        </a>
      </div>

      {/* Desktop menu */}
      <div className="wrapper-navbar menu">
        <div className="wrapper-link-navbar">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="link-menu w-inline-block">
              <div className="text-secondary menu v1">{link.label}</div>
            </a>
          ))}
        </div>
        <a href="#contact" className="button-primary w-inline-block">
          <div className="wrapper-button-primary">
            <div className="wrapper-button-primary-text">
              <div className="text-menu">Contact Us</div>
            </div>
            <div className="wrapper-button-primary-bg">
              <div className="bg-button-primary"></div>
            </div>
          </div>
        </a>
      </div>

      {/* Mobile nav */}
      <div className={`navbar-mobile w-nav${mobileOpen ? " navbar-mobile-open" : ""}`}>
        <div className="w-container">
          <nav role="navigation" className={`nav-menu w-nav-menu${mobileOpen ? " open" : ""}`}>
            <div className="menu-button w-nav-button" onClick={() => setMobileOpen(false)}>
              <div className="icon-close w-icon-nav-menu"></div>
            </div>
            <div className="wrapper-list-menu">
              <div className="list-menu">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="w-inline-block"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="menu-mobile">{link.label}</div>
                  </a>
                ))}
                <a href="#contact" className="w-inline-block" onClick={() => setMobileOpen(false)}>
                  <div className="menu-mobile">Contact Us</div>
                </a>
              </div>
              <div className="list-menu-info">
                <div className="scramble">LOCATION</div>
                <div className="wrapper-list-menu-info">
                  <div className="medium-text">San Francisco, CA</div>
                </div>
              </div>
              <div className="list-menu-info">
                <div className="scramble">CONTACT</div>
                <div className="wrapper-list-menu-info">
                  <div className="medium-text">hello@quantara.ai</div>
                  <div className="medium-text">(+123) 678 89</div>
                </div>
              </div>
            </div>
          </nav>
          <div className="menu-button w-nav-button" onClick={() => setMobileOpen(true)}>
            <div className="w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

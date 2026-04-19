"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import ButtonPrimary from "./ButtonPrimary";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navMenuRef = useRef<HTMLElement>(null);
  const didOpenRef = useRef(false);

  const navLinks = [
    { href: "#product", label: "Product" },
    { href: "#lab", label: "Lab" },
    { href: "#workflow", label: "Workflow" },
    { href: "#integration", label: "Integration" },
  ];

  // Slide the mobile nav panel in/out — mirrors Webflow's over-right animation
  // data-duration="400" data-easing="ease-in" data-easing2="ease-in-out"
  useGSAP(() => {
    const menu = navMenuRef.current;
    if (!menu) return;

    if (mobileOpen) {
      didOpenRef.current = true;
      gsap.fromTo(menu,
        { x: "100%", display: "flex" },
        { x: "0%", duration: 0.4, ease: "power1.out" }
      );
    } else if (didOpenRef.current) {
      gsap.to(menu, {
        x: "100%",
        duration: 0.4,
        ease: "power1.in",
        onComplete: () => { gsap.set(menu, { display: "none" }); },
      });
    }
  }, { dependencies: [mobileOpen] });

  const close = () => setMobileOpen(false);

  return (
    <div className="navbar">
      <div className="wrapper-navbar logo">
        <a href="#hero" className="w-inline-block">
          {/* UPDATED LOGO PATH AND ALT TEXT */}
          <Image
            src="/logo.svg"
            alt="Vantage Business Solutions"
            width={120}
            height={32}
            className="logo-navbar"
            priority
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
        <ButtonPrimary href="#contact" label="Contact Us" />
      </div>

      {/* Mobile nav — data-collapse="tiny" activates hamburger at ≤479px via webflow.css */}
      <div data-collapse="tiny" data-animation="over-right" role="banner" className="navbar-mobile w-nav">
        <div className="w-container">
          {/* Panel — starts off-screen; GSAP slides it in/out */}
          <nav role="navigation" ref={navMenuRef} className="nav-menu w-nav-menu">
            <div className="menu-button w-nav-button" onClick={close}>
              <div className="icon-close w-icon-nav-menu"></div>
            </div>
            <div className="wrapper-list-menu">
              <div className="list-menu">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="w-inline-block" onClick={close}>
                    <div className="menu-mobile">{link.label}</div>
                  </a>
                ))}
                <a href="#contact" className="w-inline-block" onClick={close}>
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
                  <div className="medium-text">hello@vantage.com</div>
                  <div className="medium-text">(+123) 678 89</div>
                </div>
              </div>
            </div>
          </nav>

          {/* Hamburger button — shown at ≤479px by webflow.css [data-collapse='tiny'] rule */}
          <div className="menu-button w-nav-button" onClick={() => setMobileOpen(true)}>
            <div className="w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
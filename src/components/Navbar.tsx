"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import ButtonPrimary from "./ButtonPrimary";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navMenuRef = useRef<HTMLElement>(null);
  const mobileShellRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLSpanElement>(null);
  const middleBarRef = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLSpanElement>(null);
  const mobileTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const navLinks = [
    { href: "#product", label: "Product" },
    { href: "#lab", label: "Lab" },
    { href: "#workflow", label: "Workflow" },
    { href: "#integration", label: "Integration" },
  ];

  useGSAP(() => {
    const menu = navMenuRef.current;
    const topBar = topBarRef.current;
    const middleBar = middleBarRef.current;
    const bottomBar = bottomBarRef.current;

    if (!menu || !topBar || !middleBar || !bottomBar) return;

    const menuItems = gsap.utils.toArray<HTMLElement>(".menu-mobile, .list-menu-info", menu);

    gsap.set(menu, {
      yPercent: -100,
      autoAlpha: 0,
      display: "none",
      pointerEvents: "none",
    });
    gsap.set(menuItems, { y: -18, autoAlpha: 0 });
    gsap.set([topBar, middleBar, bottomBar], {
      x: 0,
      y: 0,
      rotate: 0,
      scaleX: 1,
      autoAlpha: 1,
      transformOrigin: "50% 50%",
    });

    const timeline = gsap.timeline({ paused: true });

    timeline
      .set(menu, { display: "flex", pointerEvents: "auto" })
      .to(
        menu,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.62,
          ease: "power3.out",
        },
        0
      )
      .to(
        topBar,
        {
          y: 7,
          rotate: 45,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.05
      )
      .to(
        middleBar,
        {
          autoAlpha: 0,
          scaleX: 0.35,
          duration: 0.24,
          ease: "power2.out",
        },
        0.08
      )
      .to(
        bottomBar,
        {
          y: -7,
          rotate: -45,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.05
      )
      .to(
        menuItems,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.2
      );

    timeline.eventCallback("onReverseComplete", () => {
      gsap.set(menu, { display: "none", pointerEvents: "none" });
      gsap.set(menuItems, { y: -18, autoAlpha: 0 });
    });

    mobileTimelineRef.current = timeline;

    return () => {
      timeline.kill();
      mobileTimelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timeline = mobileTimelineRef.current;
    if (!timeline) return;

    if (mobileOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [mobileOpen]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    if (mobileOpen) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <div className="navbar">
      <div className="wrapper-navbar logo">
        <a href="#hero" className="w-inline-block">
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

      <div className="navbar-mobile">
        <div className="wrapper-navbar mobile-trigger-shell" ref={mobileShellRef}>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">{mobileOpen ? "Close navigation menu" : "Open navigation menu"}</span>
            <span className="burger-bars" aria-hidden="true">
              <span ref={topBarRef} className="burger-bar top"></span>
              <span ref={middleBarRef} className="burger-bar middle"></span>
              <span ref={bottomBarRef} className="burger-bar bottom"></span>
            </span>
          </button>
        </div>

        <nav
          id="mobile-menu-panel"
          role="navigation"
          ref={navMenuRef}
          className="mobile-nav-panel"
          aria-hidden={!mobileOpen}
        >
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
              <div className="scramble">JAY — NORTH AMERICA</div>
              <div className="wrapper-list-menu-info">
                <a href="mailto:jay@vantagebusinesses.com" className="w-inline-block">
                  <div className="medium-text">jay@vantagebusinesses.com</div>
                </a>
                <a href="tel:+14036078677" className="w-inline-block">
                  <div className="medium-text">+1 (403) 607-8677</div>
                </a>
              </div>
            </div>

            <div className="list-menu-info">
              <div className="scramble">BEN — UNITED KINGDOM</div>
              <div className="wrapper-list-menu-info">
                <a href="mailto:ben@vantagebusinesses.com" className="w-inline-block">
                  <div className="medium-text">ben@vantagebusinesses.com</div>
                </a>
                <a href="tel:+447538047967" className="w-inline-block">
                  <div className="medium-text">+44 7538 047967</div>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

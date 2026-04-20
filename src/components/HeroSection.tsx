"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

const HERO_TEXT_LINES = [
  "Revenue isn't the problem.",
  "Operations are."
];
const HERO_TEXT = HERO_TEXT_LINES.join(" ");

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance animation
  useGSAP(() => {
    const heroChars = gsap.utils.toArray<HTMLElement>(".text-hero-char");
    const heroSubcontent = [
      ".wrapper-subcontent-hero.v1",
      ".wrapper-subcontent-hero.v2",
      ".wrapper-subcontent-hero.v3",
    ];

    // Set initial states via GSAP so it owns the transforms and colors.
    gsap.set(".wrapper-navbar.logo", { opacity: 0, y: -20 });
    gsap.set(".wrapper-navbar.menu", { opacity: 0, y: -20 });
    gsap.set(".wrapper-sub-title-hero .text", { yPercent: 110 });
    gsap.set(heroChars, { color: "#ffffff" });
    gsap.set(".bg-animation-hero", {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "50% 50%",
    });
    // Subcontent elements have CSS translate positioning, so GSAP takes over the
    // composed transform from their current translate and adds scale on top.
    gsap.set(heroSubcontent, {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "50% 50%",
    });
    gsap.set(".lottie-scroll", { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const heroTextTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(".bg-animation-hero", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }, 0)
      .to(".wrapper-navbar.logo", { opacity: 1, y: 0, duration: 0.7 }, 0.05)
      .to(".wrapper-navbar.menu", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to(".wrapper-sub-title-hero .text", { yPercent: 0, duration: 0.8 }, "-=0.3")
      .to(heroSubcontent, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
      }, 0.5)
      .to(".lottie-scroll", { opacity: 1, duration: 0.5 }, "-=0.2");

    heroTextTl
      .to(heroChars, {
        color: "#229eff",
        duration: 0.4,
        stagger: { amount: 0.3, from: "random" },
      }, 0)
      .set(heroChars, {
        color: "#ffffff",
        stagger: { amount: 0.2, from: "random" },
      }, 0.4)
      .to(heroChars, {
        color: "#1a1a1a",
        duration: 0.4,
        stagger: { amount: 0.25, from: "edges" },
      }, 0.9)
      .to(heroChars, {
        color: "#ffffff",
        duration: 0.6,
        stagger: { amount: 0.3, from: "random" },
      }, 1.3);
  });

  // Mouse-move parallax mirrors the Webflow hero background interaction.
  useGSAP(() => {
    const section = sectionRef.current;
    const bg = section?.querySelector<HTMLElement>(".bg-animation-hero");
    if (!section || !bg) return;

    const xTo = gsap.quickTo(bg, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(bg, "y", { duration: 0.45, ease: "power3.out" });
    const parallaxRangeVw = 5.2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      const vw = window.innerWidth / 100;
      xTo((xPct - 0.5) * parallaxRangeVw * vw);
      yTo((yPct - 0.5) * parallaxRangeVw * vw);
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: sectionRef });

  return (
    <section id="hero" className="main-section overflow" ref={sectionRef}>
      <div className="wrapper-overflow">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="wrapper-hero">
            <div className="wrapper-text-hero">
              <div className="block-text-hero">
                <div className="wrapper-sub-title-hero">
                  <div className="text">Discover Your Business’s True Worth.</div>
                </div>
                <div className="text-hero hero-text-layout" aria-label={HERO_TEXT} style={{ color: "#ffffff" }}>
                  <span className="sr-only">{HERO_TEXT}</span>
                  <span aria-hidden="true" className="hero-text-lines">
                    {HERO_TEXT_LINES.map((line, lineIndex) => (
                      <span key={line} className="hero-text-line">
                        {line.split("").map((char, charIndex) => (
                          <span
                            key={`${lineIndex}-${char}-${charIndex}`}
                            className="text-hero-char"
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
            <div className="wrapper-content-hero">
              <div className="lottie-scroll">
                <DotLottieReact
                  src="/documents/Mouse-scroll-animation.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-animation-hero">
          <div className="block-content-hero v1">
            <div className="wrapper-subcontent-hero v1">
              <Image
                src="/images/Square_1Square.png"
                alt="Square icon."
                width={60}
                height={60}
                className="image-icon-hero"
                priority
              />
              <div className="text-subcontent-hero">
                <div className="scramble v1">VISION</div>
              </div>
            </div>
          </div>
          <div className="block-content-hero v2">
            <div className="wrapper-subcontent-hero v2">
              <Image
                src="/images/Circle_1Circle.png"
                alt="Circle icon."
                width={60}
                height={60}
                className="image-icon-hero"
                priority
              />
              <div className="text-subcontent-hero v2">
                <div className="scramble v2">SMART</div>
              </div>
            </div>
          </div>
          <div className="block-content-hero v3">
            <div className="wrapper-subcontent-hero v3">
              <Image
                src="/images/Triangle_1Triangle.png"
                alt="Triangle icon."
                width={60}
                height={60}
                className="image-icon-hero"
                priority
              />
              <div className="text-subcontent-hero">
                <div className="scramble v3">PRECISE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

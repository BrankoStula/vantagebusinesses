"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

export default function HeroSection() {
  useGSAP(() => {
    // Set initial states via GSAP so it owns the transforms — no CSS conflict
    gsap.set(".wrapper-navbar.logo", { opacity: 0, y: -20 });
    gsap.set(".wrapper-navbar.menu", { opacity: 0, y: -20 });
    gsap.set(".wrapper-sub-title-hero .text", { yPercent: 110 });
    gsap.set(".text-hero", { opacity: 0, y: 30 });
    // Subcontent elements have CSS transforms for positioning — only touch opacity
    gsap.set([
      ".wrapper-subcontent-hero.v1",
      ".wrapper-subcontent-hero.v2",
      ".wrapper-subcontent-hero.v3",
    ], { opacity: 0 });
    gsap.set(".lottie-scroll", { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".wrapper-navbar.logo", { opacity: 1, y: 0, duration: 0.7 })
      .to(".wrapper-navbar.menu", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to(".wrapper-sub-title-hero .text", { yPercent: 0, duration: 0.8 }, "-=0.3")
      .to(".text-hero", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
      .to(".wrapper-subcontent-hero.v1", { opacity: 1, duration: 0.6 }, "-=0.4")
      .to(".wrapper-subcontent-hero.v2", { opacity: 1, duration: 0.6 }, "-=0.5")
      .to(".wrapper-subcontent-hero.v3", { opacity: 1, duration: 0.6 }, "-=0.5")
      .to(".lottie-scroll", { opacity: 1, duration: 0.5 }, "-=0.2");
  });

  return (
    <section id="hero" className="main-section overflow">
      <div className="wrapper-overflow">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="wrapper-hero">
            <div className="wrapper-text-hero">
              <div className="block-text-hero">
                <div className="wrapper-sub-title-hero">
                  <div className="text">AI that works.</div>
                </div>
                <div className="text-hero">Automate decisions with confidence.</div>
              </div>
            </div>
            <div className="wrapper-content-hero">
              <div className="lottie-scroll">
                <DotLottieReact
                  src="/documents/Mouse-scroll-animation.lottie"
                  loop
                  autoplay
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
                style={{ width: "auto", height: "auto" }}
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
                style={{ width: "auto", height: "auto" }}
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
                style={{ width: "auto", height: "auto" }}
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

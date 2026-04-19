"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type IntegrationClass = "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7";

type IntegrationItem = {
  src: string;
  alt: string;
  cls: IntegrationClass;
};

type LogoTarget = {
  x: string;
  y: string;
  rotation: number;
  scale: number;
  duration: number;
  position: number;
};

const HEADLINE_BASE_COLOR = "hsla(0, 0%, 31.33%, 1)";
const HEADLINE_ACTIVE_COLOR = "#229eff";

const integrations: IntegrationItem[] = [
  { src: "/images/logoipsum-374.png", alt: "Stylized geometric logo with nested chevrons.", cls: "v1" },
  { src: "/images/logoipsum-376.png", alt: "Abstract symmetrical geometric shape.", cls: "v2" },
  { src: "/images/logoipsum-407.png", alt: "Abstract geometric logo forming a hexagonal pattern.", cls: "v3" },
  { src: "/images/logoipsum-411.png", alt: "Black star shape with trapezoid segments.", cls: "v4" },
  { src: "/images/logoipsum-368.png", alt: "Abstract black and white geometric shape.", cls: "v5" },
  { src: "/images/logoipsum-381.png", alt: "Abstract circular shape with diagonal slashes.", cls: "v6" },
  { src: "/images/logoipsum-386.png", alt: "Abstract geometric logo forming a stylized letter A.", cls: "v7" },
];

const logoTargets: Record<IntegrationClass, LogoTarget> = {
  v1: { x: "-42vw", y: "10vw", rotation: -20, scale: 1, duration: 0.65, position: 0.15 },
  v2: { x: "-28vw", y: "5vw", rotation: -16, scale: 1, duration: 0.41, position: 0.24 },
  v3: { x: "-14vw", y: "1.5vw", rotation: -8, scale: 1, duration: 0.27, position: 0.38 },
  v4: { x: "0vw", y: "0vw", rotation: 0, scale: 1, duration: 0.65, position: 0 },
  v5: { x: "42vw", y: "10vw", rotation: 20, scale: 1, duration: 0.65, position: 0.15 },
  v6: { x: "28vw", y: "5vw", rotation: 16, scale: 1, duration: 0.41, position: 0.24 },
  v7: { x: "14vw", y: "1.5vw", rotation: 8, scale: 1, duration: 0.27, position: 0.38 },
};

export default function IntegrationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = <T extends Element>(selector: string) => section.querySelector<T>(selector);
    const qa = <T extends Element>(selector: string) => gsap.utils.toArray<T>(selector, section);

    const titleWrappers = qa<HTMLElement>(".wrapper-title-integration");
    const divider = q<HTMLElement>(".line-horizontal");
    const headline = q<HTMLElement>(".text-looping-animation");

    const iconElements = integrations.reduce<Record<IntegrationClass, HTMLElement | null>>(
      (acc, item) => {
        acc[item.cls] = q<HTMLElement>(`.icon-integration.${item.cls}`);
        return acc;
      },
      { v1: null, v2: null, v3: null, v4: null, v5: null, v6: null, v7: null }
    );

    const unfoldTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom bottom+=20%",
        scrub: 0.8,
      },
    });

    (Object.entries(logoTargets) as Array<[IntegrationClass, LogoTarget]>).forEach(([cls, config]) => {
      const icon = iconElements[cls];
      if (!icon) return;

      unfoldTimeline.to(
        icon,
        {
          x: config.x,
          y: config.y,
          rotation: config.rotation,
          scale: config.scale,
          duration: config.duration,
          ease: "none",
        },
        config.position
      );
    });

    if (titleWrappers.length) {
      unfoldTimeline.to(
        titleWrappers,
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: { amount: 0.25 },
          ease: "none",
        },
        0.55
      );
    }

    if (divider) {
      unfoldTimeline.to(
        divider,
        {
          scaleY: 1,
          duration: 0.25,
          ease: "none",
        },
        0.57
      );
    }

    if (!headline) return;

    const splitHeadline = new SplitText(headline, { type: "words" });
    const headlineWords = splitHeadline.words;

    gsap.set(headlineWords, { color: HEADLINE_BASE_COLOR });

    const resetHeadline = () => {
      gsap.set(headlineWords, { color: HEADLINE_BASE_COLOR });
    };

    const headlineLoop = gsap.timeline({
      paused: true,
      repeat: -1,
    });

    headlineLoop
      .to(headlineWords, {
        color: HEADLINE_ACTIVE_COLOR,
        duration: 0.8,
        stagger: { amount: 0.5, from: "random" },
        ease: "power2.out",
      })
      .to(
        headlineWords,
        {
          color: "#ffffff",
          duration: 0.4,
          stagger: { amount: 0.5, from: "random" },
          ease: "power1.in",
        },
        0.79
      );

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => headlineLoop.play(0),
      onLeave: () => {
        headlineLoop.pause(0);
        resetHeadline();
      },
      onEnterBack: () => headlineLoop.play(0),
      onLeaveBack: () => {
        headlineLoop.pause(0);
        resetHeadline();
      },
    });

    return () => {
      splitHeadline.revert();
    };
  }, { scope: sectionRef });

  return (
    <section id="integration" className="tracks integration" ref={sectionRef}>
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="wrapper-integration">
              <div className="wrapper-content-integration">
                <div className="wrapper-title-integration">
                  <div className="badge">
                    <div className="scramble secondary">INTEGRATION</div>
                    <div className="block-title-workflow-animation">
                      <div className="text-secondary animated">-</div>
                      <div className="text-secondary animated">-</div>
                      <div className="text-secondary animated">-</div>
                    </div>
                    <div className="scramble v1">ACTIVE MODULES</div>
                  </div>
                </div>
                <div className="line-horizontal"></div>
                <div className="wrapper-title-integration">
                  <div className="text-looping-animation">
                    Connected Systems. Unified Intelligence.
                  </div>
                </div>
              </div>
              <div className="wrapper-icon-integration">
                {integrations.map((item) => (
                  <div key={item.cls} className={`icon-integration ${item.cls}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={60}
                      height={60}
                      className="image-icon-integration"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const partnerHoverScaleEase = CustomEase.create(
  "partnerHoverScaleEase",
  "M0,0 C0.22,1 0.36,1 1,1"
);
const partnerHoverFilterEase = CustomEase.create(
  "partnerHoverFilterEase",
  "M0,0 C0.4,0 0.2,1 1,1"
);

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

const partners = [
  { src: "/images/stripe-logo.svg", alt: "Stripe" },
  { src: "/images/hubspot-logo.svg", alt: "HubSpot" },
  { src: "/images/aws-logo.svg", alt: "AWS" },
  { src: "/images/zapier-logo.svg", alt: "Zapier" },
  { src: "/images/typescript-logo.svg", alt: "TypeScript" },
  { src: "/images/quickbooks-logo.svg", alt: "QuickBooks" },
  { src: "/images/stripe-logo.svg", alt: "Stripe" },
  { src: "/images/hubspot-logo.svg", alt: "HubSpot" },
  { src: "/images/aws-logo.svg", alt: "AWS" },
  { src: "/images/zapier-logo.svg", alt: "Zapier" },
  { src: "/images/typescript-logo.svg", alt: "TypeScript" },
  { src: "/images/quickbooks-logo.svg", alt: "QuickBooks" },
];

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const wrapper = section.querySelector<HTMLElement>(".wrapper-partner");
      const borderFill = section.querySelector<HTMLElement>(".border.fill");
      const descText = section.querySelector<HTMLElement>(".small-text.animation");

      // border + text animations run independently
      if (borderFill) {
        gsap.set(borderFill, { xPercent: -100 });
        gsap.to(borderFill, {
          xPercent: 100,
          duration: 10,
          ease: "none",
          repeat: -1,
        });
      }

      if (descText && wrapper) {
        gsap.set(descText, { color: "var(--color--dark-gray, #333)" });
        gsap.to(descText, {
          color: "var(--color--white, #ffffff)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      }

      const partnerMove = section.querySelector<HTMLElement>(".block-partner-move");
      const partnerTrack = section.querySelector<HTMLElement>(".block-partners");
      const partnerRow = section.querySelector<HTMLElement>(".partner");
      const partnerCards = gsap.utils.toArray<HTMLElement>(".block-partner", section);

      if (!wrapper || !partnerMove || !partnerTrack || !partnerRow || !partnerCards.length) {
        return;
      }

      gsap.set(partnerTrack, { xPercent: 0 });
      gsap.set(partnerMove, { x: "0vw" });
      gsap.set(partnerCards, {
        scale: 1,
        filter: "brightness(100%) blur(0px)",
        transformOrigin: "50% 50%",
      });

      gsap.to(partnerTrack, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      })
        .to(partnerMove, { x: "0vw", ease: "none", duration: 0.1 })
        .to(partnerMove, { x: "-15vw", ease: "none", duration: 0.8 })
        .to(partnerMove, { x: "-15vw", ease: "none", duration: 0.1 });

      const hasHoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!hasHoverPointer) return;

      const resetCards = () => {
        gsap.killTweensOf(partnerCards);
        gsap.to(partnerCards, {
          scale: 1,
          filter: "brightness(100%) blur(0px)",
          duration: 0.5,
          ease: partnerHoverFilterEase,
          overwrite: true,
          stagger: 0,
        });
      };

      const focusCard = (activeCard: HTMLElement) => {
        gsap.killTweensOf(partnerCards);

        partnerCards.forEach((card) => {
          if (card === activeCard) {
            gsap.to(card, {
              scale: 1.5,
              filter: "brightness(200%) blur(0px)",
              duration: 0.8,
              ease: partnerHoverScaleEase,
              overwrite: true,
            });
            return;
          }

          gsap.to(card, {
            scale: 1,
            filter: "brightness(100%) blur(2px)",
            duration: 0.5,
            ease: partnerHoverFilterEase,
            overwrite: true,
          });
        });
      };

      const cleanups = partnerCards.map((card) => {
        const handleEnter = () => focusCard(card);
        card.addEventListener("mouseenter", handleEnter);

        return () => {
          card.removeEventListener("mouseenter", handleEnter);
        };
      });

      partnerRow.addEventListener("mouseleave", resetCards);

      return () => {
        partnerRow.removeEventListener("mouseleave", resetCards);
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section className="main-section" ref={sectionRef}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="wrapper-partner">
          <div className="title-partner">
            <div className="block-title-partner v1">
              <div className="small-text animation">Connecting the tools your team already relies on.</div>
            </div>
            <div className="block-title-partner v2">
              <div className="small-text secondary animation-loop">ECOSYSTEM</div>
              <div className="wrapper-lottie">
                <div className="lottie-plus">
                  <DotLottieReact
                    src="/documents/Glitch-Plus-x.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-partners">
            <div className="bg-partner v1"></div>
            <div className="bg-partner v2"></div>
            <div className="block-partner-move">
              <div className="block-partners">
                <div className="partner">
                  {partners.map((p, i) => (
                    <a key={i} href="#" className="block-partner w-inline-block">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={240}
                        height={120}
                        className="logo-partner"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-border vertical v1">
            <div
              style={{
                transform:
                  "translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              }}
              className="border fill"
            ></div>
            <div className="border empty"></div>
            <div className="bg-partner v1"></div>
            <div className="bg-partner v2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const flowSteps = [
  {
    num: "01",
    title: "Collect Data",
    desc: "AI gathers structured and unstructured data from connected sources in real time.",
    animClass: "animated-v1",
  },
  {
    num: "02",
    title: "Process Data",
    desc: "Inputs are validated, normalized, and prepared for intelligent analysis.",
    animClass: "animated-v2",
  },
  {
    num: "03",
    title: "Analyze Data",
    desc: "Advanced models extract insights, patterns, and predictive signals.",
    animClass: "animated-v3",
  },
  {
    num: "04",
    title: "Deliver Data",
    desc: "Insights are transformed into clear, actionable outcomes.",
    animClass: "animated-v4",
  },
];

const workflowCards = [
  { icon: "/images/send-money.png", alt: "Send money icon.", cls: "v1" },
  { icon: "/images/input-circle.png", alt: "Input circle icon.", cls: "v2" },
  { icon: "/images/pie-chart.png", alt: "3D pie chart icon.", cls: "v3" },
  { icon: "/images/data.png", alt: "Isometric data block icon.", cls: "v4" },
];

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = (sel: string) => section.querySelector<HTMLElement>(sel);

    const blockFlows = [1, 2, 3, 4].map(n => q(`.block-flow.v${n}`));
    // Target the description text specifically for movement
    const descText   = [1, 2, 3, 4].map(n => q(`.animated-v${n}`)); 
    const blockImgs  = [1, 2, 3, 4].map(n => q(`.block-image-workflow.v${n}`));
    const icons = [1, 2, 3, 4].map(n => q(`.icon-workflow-wrapper.v${n}`));
    const triggers   = [1, 2, 3, 4].map(n => q(`.trigger-workflow.v${n}`));

    // --- INITIAL STATES ---
    
    // Left side content hides
    blockFlows.forEach((el, i) => el && gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
    descText.forEach(el => el && gsap.set(el, { opacity: 0, y: 20 })); // Text starts down and hidden

    // Right side cards visible, Step 1 active
    blockImgs.forEach(el => el && gsap.set(el, { scale: 1 }));
    icons.forEach((el, i) => {
      if(!el) return;
      // FIX: Removed all the xPercent/top/left logic so CSS can handle the positioning.
      // GSAP only controls the color filtering here now.
      gsap.set(el, { 
        filter: i === 0 ? "grayscale(0) brightness(100%) contrast(100%)" : "grayscale(1) brightness(60%) opacity(0.6)",
      });
    });

    const dur = 0.5;
    const ease = "power2.inOut";

    // --- ANIMATION LOGIC ---
    const goTo = (step: number) => {
      const i = step - 1;
      
      // Left: Show/Hide whole block instantly
      blockFlows.forEach((el, idx) =>
        el && gsap.to(el, { opacity: idx === i ? 1 : 0, duration: dur, ease, overwrite: "auto" })
      );

      // Left: TEXT MOVEMENT ANIMATION (Slide + Fade)
      descText.forEach((el, idx) => {
        if(!el) return;
        if (idx === i) {
          // Slide text IN from bottom
          gsap.fromTo(el, 
            { opacity: 0, y: 15 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", overwrite: "auto", delay: 0.1 }
          );
        } else {
          // Fade text OUT
          gsap.to(el, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in", overwrite: "auto" });
        }
      });
      
      // Right: Scale active card
      blockImgs.forEach((el, idx) =>
        el && gsap.to(el, {
          scale: idx === i ? 1.1 : 1,
          duration: dur,
          ease,
          overwrite: "auto",
        })
      );
      
      // Right: Color active icon
      icons.forEach((el, idx) =>
        el && gsap.to(el, {
          filter: idx === i
            ? "grayscale(0) brightness(100%) contrast(100%) opacity(1)"
            : "grayscale(1) brightness(60%) contrast(80%) opacity(0.6)",
          duration: dur,
          ease,
          overwrite: "auto",
        })
      );
    };

    triggers.forEach((trigEl, i) => {
      if (!trigEl) return;
      ScrollTrigger.create({
        trigger: trigEl,
        start: "top 50%",
        end: "bottom 50%",
        onEnter:     () => goTo(i + 1),
        onEnterBack: () => goTo(i + 1),
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="workflow" className="tracks workflow" ref={sectionRef}>
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="wrapper-workflow">
              <div className="bg-workflow">
                <Image
                  src="/images/Abstract-Blue-Gradient.webp"
                  alt="Abstract blue gradient background."
                  width={904}
                  height={500}
                  className="image-bg-workflow"
                />
                <div className="bg-overlay"></div>
              </div>

              <div className="wrapper-workflows">
                <div className="block-title-flow">
                  <div className="badge">
                    <div className="scramble secondary">PARTIAL</div>
                    <div className="block-title-workflow-animation">
                      <div className="text-secondary animated">&gt;</div>
                      <div className="text-secondary animated">&gt;</div>
                      <div className="text-secondary animated">&gt;</div>
                    </div>
                    <div className="scramble v1">TASK</div>
                    <div className="scramble secondary">[04]</div>
                  </div>
                </div>
                <Image
                  src="/images/Line-Dashed.png"
                  alt="Horizontal dashed line."
                  width={300}
                  height={2}
                  className="image-line"
                />

                {flowSteps.map((step, i) => (
                  <div key={step.num} className={`block-flow v${i + 1}`}>
                    <div>{step.num}</div>
                    <div className="block-content-flow">
                      <div className="medium-big-text color-gradient">{step.title}</div>
                      <div className="block-desc-content-flow">
                        <div className={`text-secondary ${step.animClass}`}>{step.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wrapper-workflows v2">
               <div className="block-card-workflow">
                  {workflowCards.map((card) => (
                    <div key={card.cls} className={`block-image-workflow ${card.cls}`} style={{ position: 'relative' }}>
                      <Image
                        src="/images/Extrude-Workflow.png"
                        alt="3D black rounded rectangular block."
                        width={120}
                        height={120}
                        className="extrude-workflow-img"
                      />
                      {/* FIX: Dedicated absolute wrapper for flawless SVG centering */}
                      <div className={`icon-workflow-wrapper ${card.cls}`}>
                        <Image
                          src={card.icon}
                          alt={card.alt}
                          width={75}  /* Increased size */
                          height={75} /* Increased size */
                          className="icon-workflow-svg"
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Invisible triggers that power the scroll animation */}
      <div className="trigger-wrapper-v3">
        <div className="trigger-workflow v1"></div>
        <div className="trigger-workflow v2"></div>
        <div className="trigger-workflow v3"></div>
        <div className="trigger-workflow v4"></div>
      </div>
    </section>
  );
}
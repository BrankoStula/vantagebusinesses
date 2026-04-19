"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type WorkflowVariant = "v1" | "v2" | "v3" | "v4";

type WorkflowStep = {
  num: string;
  title: string;
  desc: string;
  variant: WorkflowVariant;
  animClass: string;
};

type WorkflowCard = {
  icon: string;
  alt: string;
  variant: WorkflowVariant;
};

const flowSteps: WorkflowStep[] = [
  {
    num: "01",
    title: "Collect Data",
    desc: "AI gathers structured and unstructured data from connected sources in real time.",
    variant: "v1",
    animClass: "animated-v1",
  },
  {
    num: "02",
    title: "Process Data",
    desc: "Inputs are validated, normalized, and prepared for intelligent analysis.",
    variant: "v2",
    animClass: "animated-v2",
  },
  {
    num: "03",
    title: "Analyze Data",
    desc: "Advanced models extract insights, patterns, and predictive signals.",
    variant: "v3",
    animClass: "animated-v3",
  },
  {
    num: "04",
    title: "Deliver Data",
    desc: "Insights are transformed into clear, actionable outcomes.",
    variant: "v4",
    animClass: "animated-v4",
  },
];

const workflowCards: WorkflowCard[] = [
  { icon: "/images/send-money.png", alt: "Circular arrow workflow icon.", variant: "v1" },
  { icon: "/images/input-circle.png", alt: "Input arrow workflow icon.", variant: "v2" },
  { icon: "/images/pie-chart.png", alt: "Pie chart workflow icon.", variant: "v3" },
  { icon: "/images/data.png", alt: "Data block workflow icon.", variant: "v4" },
];

const WORKFLOW_DEFAULT_FILTER = "brightness(100%) contrast(100%)";
const WORKFLOW_FLASH_FILTER = "brightness(200%) contrast(120%)";

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const q = <T extends Element>(selector: string) => section.querySelector<T>(selector);

      const flowV1 = q<HTMLElement>(".block-flow.v1");
      const flowV2 = q<HTMLElement>(".block-flow.v2");
      const flowV3 = q<HTMLElement>(".block-flow.v3");
      const flowV4 = q<HTMLElement>(".block-flow.v4");

      const cardV1 = q<HTMLElement>(".block-image-workflow.v1");
      const cardV2 = q<HTMLElement>(".block-image-workflow.v2");
      const cardV3 = q<HTMLElement>(".block-image-workflow.v3");
      const cardV4 = q<HTMLElement>(".block-image-workflow.v4");

      const iconV1 = q<HTMLElement>(".icon-workflow.v1");
      const iconV2 = q<HTMLElement>(".icon-workflow.v2");
      const iconV3 = q<HTMLElement>(".icon-workflow.v3");
      const iconV4 = q<HTMLElement>(".icon-workflow.v4");

      const triggerV1 = q<HTMLElement>(".trigger-workflow.v1");
      const triggerV2 = q<HTMLElement>(".trigger-workflow.v2");
      const triggerV3 = q<HTMLElement>(".trigger-workflow.v3");
      const triggerV4 = q<HTMLElement>(".trigger-workflow.v4");

      const splitDescriptions = flowSteps.map((step) => {
        const el = q<HTMLElement>(`.text-secondary.${step.animClass}`);
        if (!el) return null;

        const split = new SplitText(el, { type: "words" });
        gsap.set(split.words, { color: "#000000" });
        return split;
      });

      if (flowV1) gsap.set(flowV1, { autoAlpha: 1, y: "0vh" });
      if (flowV2) gsap.set(flowV2, { autoAlpha: 0, y: "60vh" });
      if (flowV3) gsap.set(flowV3, { autoAlpha: 0, y: "60vh" });
      if (flowV4) gsap.set(flowV4, { autoAlpha: 0, y: "60vh" });

      if (cardV1) gsap.set(cardV1, { autoAlpha: 0, x: "0vw", y: "0vw", force3D: true });
      if (cardV2) gsap.set(cardV2, { autoAlpha: 0, x: "-2vw", y: "1vw", force3D: true });
      if (cardV3) gsap.set(cardV3, { autoAlpha: 0, x: "-4vw", y: "2vw", force3D: true });
      if (cardV4) gsap.set(cardV4, { autoAlpha: 1, x: "0vw", y: "0vw", force3D: true });

      [iconV1, iconV2, iconV3, iconV4].forEach((icon) => {
        if (!icon) return;
        gsap.set(icon, {
          x: "0vw",
          filter: WORKFLOW_DEFAULT_FILTER,
          force3D: true,
        });
      });

      const revealDescription = (index: number, position: number) => {
        const split = splitDescriptions[index];
        if (!split?.words.length) return;

        workflowTimeline.to(
          split.words,
          {
            color: "#9f9f9f",
            duration: 0.3,
            stagger: { amount: 0.2, from: "random" },
            ease: "none",
          },
          position
        );
      };

      const workflowTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      if (flowV1) {
        workflowTimeline.to(flowV1, { y: "-60vh", duration: 1, ease: "none" }, 0.65);
      }
      if (flowV2) {
        workflowTimeline.to(flowV2, { y: "0vh", autoAlpha: 1, duration: 1, ease: "none" }, 0.65);
        workflowTimeline.to(flowV2, { y: "-60vh", duration: 1, ease: "none" }, 1.81);
      }
      if (flowV3) {
        workflowTimeline.to(flowV3, { y: "0vh", autoAlpha: 1, duration: 1, ease: "none" }, 1.81);
        workflowTimeline.to(flowV3, { y: "-60vh", duration: 1, ease: "none" }, 3);
      }
      if (flowV4) {
        workflowTimeline.to(flowV4, { y: "0vh", autoAlpha: 1, duration: 1, ease: "none" }, 3);
      }

      revealDescription(0, 0.15);
      revealDescription(1, 0.92);
      revealDescription(2, 2.14);
      revealDescription(3, 3.33);

      if (cardV4) {
        workflowTimeline.to(cardV4, { y: "-5vw", duration: 0.3, ease: "none" }, 0);
        workflowTimeline.to(cardV4, { y: "0vw", duration: 0.4, ease: "none" }, 0.65);
      }
      if (iconV4) {
        workflowTimeline.to(iconV4, { x: "-2vw", duration: 0.3, ease: "none" }, 0);
        workflowTimeline.to(iconV4, { x: "0vw", duration: 0.3, ease: "none" }, 0.65);
      }

      if (cardV3) {
        workflowTimeline.to(
          cardV3,
          { x: "2vw", y: "-1vw", autoAlpha: 1, duration: 0.5, ease: "none" },
          0.65
        );
        workflowTimeline.to(cardV3, { y: "-6vw", duration: 0.3, ease: "none" }, 1.15);
        workflowTimeline.to(cardV3, { x: "2vw", y: "-1vw", duration: 0.4, ease: "none" }, 1.81);
      }
      if (iconV3) {
        workflowTimeline.to(iconV3, { x: "-2vw", duration: 0.3, ease: "none" }, 1.15);
        workflowTimeline.to(iconV3, { x: "0vw", duration: 0.3, ease: "none" }, 1.81);
      }

      if (cardV2) {
        workflowTimeline.to(
          cardV2,
          { x: "4vw", y: "-2vw", autoAlpha: 1, duration: 0.5, ease: "none" },
          1.81
        );
        workflowTimeline.to(cardV2, { y: "-7vw", duration: 0.3, ease: "none" }, 2.31);
        workflowTimeline.to(cardV2, { x: "4vw", y: "-2vw", duration: 0.4, ease: "none" }, 3);
      }
      if (iconV2) {
        workflowTimeline.to(iconV2, { x: "-2vw", duration: 0.3, ease: "none" }, 2.31);
        workflowTimeline.to(iconV2, { x: "0vw", duration: 0.3, ease: "none" }, 3);
      }

      if (cardV1) {
        workflowTimeline.to(
          cardV1,
          { x: "6vw", y: "-3vw", autoAlpha: 1, duration: 0.5, ease: "none" },
          3
        );
        workflowTimeline.to(cardV1, { y: "-6vw", duration: 0.3, ease: "none" }, 3.5);
        workflowTimeline.to(cardV1, { x: "6vw", y: "-3vw", duration: 0.4, ease: "none" }, 4.19);
      }
      if (iconV1) {
        workflowTimeline.to(iconV1, { x: "-2vw", duration: 0.3, ease: "none" }, 3.5);
        workflowTimeline.to(iconV1, { x: "0vw", duration: 0.3, ease: "none" }, 4.19);
      }

      const iconPulseMap = new Map<HTMLElement, gsap.core.Timeline>();

      const flashIcon = (icon: HTMLElement | null) => {
        if (!icon) return;

        iconPulseMap.get(icon)?.kill();
        gsap.killTweensOf(icon, "filter");
        gsap.set(icon, { filter: WORKFLOW_DEFAULT_FILTER });

        const pulse = gsap
          .timeline()
          .to(icon, { filter: WORKFLOW_DEFAULT_FILTER, duration: 0.5, ease: "none" })
          .to(icon, { filter: WORKFLOW_FLASH_FILTER, duration: 0.7, ease: "none" })
          .to(icon, { filter: WORKFLOW_DEFAULT_FILTER, duration: 0.7, ease: "none" });

        iconPulseMap.set(icon, pulse);
      };

      const resetIcon = (icon: HTMLElement | null) => {
        if (!icon) return;

        iconPulseMap.get(icon)?.kill();
        gsap.killTweensOf(icon, "filter");
        gsap.to(icon, {
          filter: WORKFLOW_DEFAULT_FILTER,
          duration: 0.2,
          ease: "none",
          overwrite: "auto",
        });
      };

      [
        { trigger: triggerV1, icon: iconV4 },
        { trigger: triggerV2, icon: iconV3 },
        { trigger: triggerV3, icon: iconV2 },
        { trigger: triggerV4, icon: iconV1 },
      ].forEach(({ trigger, icon }) => {
        if (!trigger || !icon) return;

        ScrollTrigger.create({
          trigger,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => flashIcon(icon),
          onEnterBack: () => flashIcon(icon),
          onLeave: () => resetIcon(icon),
          onLeaveBack: () => resetIcon(icon),
        });
      });

      return () => {
        splitDescriptions.forEach((split) => split?.revert());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="workflow" className="tracks workflow" ref={sectionRef}>
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="wrapper-workflow">
              <div className="bg-workflow">
                <Image
                  src="/images/Abstract-Blue-Gradient.webp"
                  alt="Abstract close-up of a blue and black gradient."
                  width={904}
                  height={1568}
                  className="image-bg-workflow"
                />
                <div className="bg-overlay"></div>
              </div>

              <div className="wrapper-workflows">
                <div className="block-title-flow">
                  <div className="badge">
                    <div className="scramble v1 secondary">PARTIAL</div>
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
                  alt="Vertical dashed line."
                  width={38}
                  height={1440}
                  className="image-line"
                />

                {flowSteps.map((step) => (
                  <div key={step.num} className={`block-flow ${step.variant}`}>
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
                    <div key={card.variant} className={`block-image-workflow ${card.variant}`}>
                      <Image
                        src="/images/Extrude-Workflow.png"
                        alt="3D workflow card."
                        width={331}
                        height={487}
                        className="extrude-workflow-img"
                      />
                      <Image
                        src={card.icon}
                        alt={card.alt}
                        width={500}
                        height={500}
                        className={`icon-workflow ${card.variant}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trigger-wrapper-v3" aria-hidden="true">
        <div className="trigger-workflow v1"></div>
        <div className="trigger-workflow v2"></div>
        <div className="trigger-workflow v3"></div>
        <div className="trigger-workflow v4"></div>
      </div>
    </section>
  );
}

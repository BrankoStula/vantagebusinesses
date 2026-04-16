"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ACTIVE_BADGE_BG = "#fdfdfd";
const ACTIVE_BADGE_BORDER = "#229eff";
const INACTIVE_BADGE_BG = "#000000";
const INACTIVE_BADGE_BORDER = "#333333";
const ACTIVE_BADGE_TEXT = "#000000";
const INACTIVE_BADGE_TEXT = "#ffffff";

const PRODUCT_STEPS = [
  {
    copyKey: "v1",
    blockClass: "v1",
    iconClass: "v1",
    badgeClass: "v1",
    triggerClass: "v1",
    introOffset: "-6vw",
    showBodyAt: 1.5,
    showTitleAt: 1.75,
    activateBadgeAt: 1.75,
    raiseBlockAt: 2.13,
    raiseBlockDuration: 1,
    raiseBlockEase: "power4.out",
    raiseIconAt: 2.25,
    raiseIconDuration: 1,
    raiseIconEase: "none",
    hideAt: 3.6,
    lowerBlockAt: 3.6,
    lowerBlockDuration: 0.86,
    lowerBlockEase: "none",
    lowerIconAt: 3.81,
    lowerIconDuration: 0.65,
    lowerIconEase: "none",
  },
  {
    copyKey: "v3",
    blockClass: "v3",
    iconClass: "v3",
    badgeClass: "v2",
    triggerClass: "v2",
    introOffset: "-8vw",
    showBodyAt: 4.24,
    showTitleAt: 4.24,
    activateBadgeAt: 4.24,
    raiseBlockAt: 4.74,
    raiseBlockDuration: 1,
    raiseBlockEase: "none",
    raiseIconAt: 4.88,
    raiseIconDuration: 1,
    raiseIconEase: "none",
    hideAt: 6.05,
    lowerBlockAt: 6.05,
    lowerBlockDuration: 0.86,
    lowerBlockEase: "none",
    lowerIconAt: 6.25,
    lowerIconDuration: 0.65,
    lowerIconEase: "none",
  },
  {
    copyKey: "v2",
    blockClass: "v2",
    iconClass: "v2",
    badgeClass: "v3",
    triggerClass: "v3",
    introOffset: "-12vw",
    showBodyAt: 6.68,
    showTitleAt: 6.68,
    activateBadgeAt: 6.66,
    raiseBlockAt: 7.18,
    raiseBlockDuration: 1,
    raiseBlockEase: "none",
    raiseIconAt: 7.32,
    raiseIconDuration: 1,
    raiseIconEase: "none",
    hideAt: 8.58,
    lowerBlockAt: 8.58,
    lowerBlockDuration: 0.86,
    lowerBlockEase: "power1.out",
    lowerIconAt: 8.81,
    lowerIconDuration: 0.65,
    lowerIconEase: "none",
  },
  {
    copyKey: "v4",
    blockClass: "v4",
    iconClass: "v4",
    badgeClass: "v4",
    triggerClass: "v4",
    introOffset: "-4vw",
    showBodyAt: 9.32,
    showTitleAt: 9.32,
    activateBadgeAt: 9.19,
    raiseBlockAt: 9.8,
    raiseBlockDuration: 1,
    raiseBlockEase: "none",
    raiseIconAt: 9.94,
    raiseIconDuration: 1,
    raiseIconEase: "power1.in",
    hideAt: 11,
    lowerBlockAt: 11,
    lowerBlockDuration: 0.86,
    lowerBlockEase: "none",
    lowerIconAt: 11,
    lowerIconDuration: 0.65,
    lowerIconEase: "none",
  },
] as const;

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const wrapperProduct = section.querySelector<HTMLElement>(".wrapper-product");
      const blockTitle = section.querySelector<HTMLElement>(".block-title-product.v2");
      const badgeStack = section.querySelector<HTMLElement>(".block-logo-circle-product");
      const blockCluster = section.querySelector<HTMLElement>(".wrapper-block-product");
      const descBlocks = gsap.utils.toArray<HTMLElement>(".block-content-desc-product", section);
      const plusItems = gsap.utils.toArray<HTMLElement>(
        ".medium-text.anim-v1, .medium-text.anim-v2, .medium-text.anim-v3, .medium-text.anim-v4",
        section
      );

      if (!wrapperProduct || !blockTitle || !badgeStack || !blockCluster || !descBlocks.length || !plusItems.length) {
        return;
      }

      const steps = PRODUCT_STEPS.map((step) => ({
        ...step,
        block: section.querySelector<HTMLElement>(`.block-image-product.${step.blockClass}`),
        icon: section.querySelector<HTMLElement>(`.icon-product.${step.iconClass}`),
        badge: section.querySelector<HTMLElement>(`.logo-circle-product.${step.badgeClass}`),
        trigger: section.querySelector<HTMLElement>(`.trigger-contrast.${step.triggerClass}`),
        smallTargets: gsap.utils.toArray<HTMLElement>(
          `.small-text.align-right.animation-${step.copyKey}`,
          section
        ),
        scrambleTargets: gsap.utils.toArray<HTMLElement>(
          `.scramble.v1.animated-${step.copyKey}`,
          section
        ),
        titleTargets: gsap.utils.toArray<HTMLElement>(
          `.medium-big-text.color-gradient.animated-${step.copyKey}`,
          section
        ),
      }));

      if (
        steps.some(
          (step) =>
            !step.block ||
            !step.icon ||
            !step.badge ||
            !step.trigger ||
            !step.smallTargets.length ||
            !step.scrambleTargets.length ||
            !step.titleTargets.length
        )
      ) {
        return;
      }

      const allCopyTargets = steps.flatMap((step) => [
        ...step.smallTargets,
        ...step.scrambleTargets,
        ...step.titleTargets,
      ]);
      const allBadges = steps.map((step) => step.badge);
      const allIcons = steps.map((step) => step.icon);

      gsap.set(blockCluster, { y: "8vw" });
      gsap.set(blockTitle, { opacity: 1 });
      gsap.set(badgeStack, { opacity: 0 });
      gsap.set(descBlocks, { opacity: 0 });
      gsap.set(allCopyTargets, { opacity: 0 });
      gsap.set(allBadges, {
        backgroundColor: INACTIVE_BADGE_BG,
        borderColor: INACTIVE_BADGE_BORDER,
        color: INACTIVE_BADGE_TEXT,
      });
      gsap.set(allIcons, {
        y: "0vw",
        rotation: 0,
        "--icon-gray": "100%",
        "--icon-brightness": "100%",
        "--icon-contrast": "100%",
      });
      steps.forEach((step) => {
        gsap.set(step.block, { y: step.introOffset });
      });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "top top+=40%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      introTl.to(blockCluster, { y: "0vw", duration: 1, ease: "none" }, 0);
      steps.forEach((step) => {
        introTl.to(step.block, { y: "0vw", duration: 0.47, ease: "none" }, 0.03);
      });

      const mainTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top+=45%",
          end: "bottom bottom+=30%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      mainTl
        .to(blockTitle, { opacity: 0, duration: 0 }, 0.37)
        .to(badgeStack, { opacity: 1, duration: 0 }, 0.5)
        .to(descBlocks, { opacity: 1, duration: 0 }, 1);

      steps.forEach((step, index) => {
        const bodyTargets = [...step.smallTargets, ...step.scrambleTargets];
        const fullTargets = [...bodyTargets, ...step.titleTargets];

        mainTl
          .to(bodyTargets, { opacity: 1, duration: 0 }, step.showBodyAt)
          .to(step.titleTargets, { opacity: 1, duration: 0 }, step.showTitleAt)
          .to(
            step.badge,
            {
              backgroundColor: ACTIVE_BADGE_BG,
              borderColor: ACTIVE_BADGE_BORDER,
              color: ACTIVE_BADGE_TEXT,
              duration: 0,
            },
            step.activateBadgeAt
          )
          .to(
            step.block,
            {
              y: "-2vw",
              duration: step.raiseBlockDuration,
              ease: step.raiseBlockEase,
            },
            step.raiseBlockAt
          )
          .to(
            step.icon,
            {
              y: "-2vw",
              rotation: -38,
              "--icon-gray": "0%",
              duration: step.raiseIconDuration,
              ease: step.raiseIconEase,
            },
            step.raiseIconAt
          );

        if (index === steps.length - 1) return;

        mainTl
          .to(fullTargets, { opacity: 0, duration: 0 }, step.hideAt)
          .to(
            step.badge,
            {
              backgroundColor: INACTIVE_BADGE_BG,
              borderColor: INACTIVE_BADGE_BORDER,
              color: INACTIVE_BADGE_TEXT,
              duration: 0,
            },
            step.hideAt
          )
          .to(
            step.block,
            {
              y: "0vw",
              duration: step.lowerBlockDuration,
              ease: step.lowerBlockEase,
            },
            step.lowerBlockAt
          )
          .to(
            step.icon,
            {
              y: "0vw",
              rotation: 0,
              "--icon-gray": "100%",
              duration: step.lowerIconDuration,
              ease: step.lowerIconEase,
            },
            step.lowerIconAt
          );
      });

      const plusTl = gsap.timeline({ paused: true, repeat: -1 });
      plusTl
        .to(plusItems, { color: "#000000", duration: 0, stagger: { amount: 0.5 }, ease: "none" }, 0)
        .to(plusItems, { color: "#229eff", duration: 0.35, stagger: { amount: 0.5 }, ease: "power1.out" }, 0.15)
        .to(plusItems, { color: "#ffffff", duration: 0.35, stagger: { amount: 0.5 }, ease: "power1.out" }, 0.65);

      let plusLoopStarted = false;
      ScrollTrigger.create({
        trigger: wrapperProduct,
        start: "top bottom",
        onEnter: () => {
          if (plusLoopStarted) return;
          plusLoopStarted = true;
          plusTl.play(0);
        },
      });

      steps.forEach((step) => {
        const pulseTl = gsap.timeline({ paused: true });
        pulseTl
          .to(
            step.icon,
            {
              "--icon-brightness": "100%",
              "--icon-contrast": "100%",
              duration: 0.5,
              ease: "none",
            },
            0
          )
          .to(
            step.icon,
            {
              "--icon-brightness": "200%",
              "--icon-contrast": "120%",
              duration: 0.7,
              ease: "none",
            },
            0.5
          )
          .to(
            step.icon,
            {
              "--icon-brightness": "100%",
              "--icon-contrast": "100%",
              duration: 0.7,
              ease: "none",
            },
            1.2
          );

        const resetPulse = () => {
          pulseTl.pause(0);
          gsap.to(step.icon, {
            "--icon-brightness": "100%",
            "--icon-contrast": "100%",
            duration: 0.2,
            ease: "none",
            overwrite: true,
          });
        };

        ScrollTrigger.create({
          trigger: step.trigger,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            pulseTl.restart();
          },
          onEnterBack: () => {
            pulseTl.restart();
          },
          onLeave: resetPulse,
          onLeaveBack: resetPulse,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="product" className="tracks product" ref={sectionRef}>
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="wrapper-padding">
              <div className="wrapper-product">
                <div className="title-product">
                  <div className="block-title-product v1">
                    <div className="block-animation">
                      {[0, 1, 2, 3].map((row) => (
                        <div key={row} className="block-mins">
                          {["anim-v1", "anim-v2", "anim-v3", "anim-v4"].map((cls) => (
                            <div key={cls} className={`medium-text ${cls}`}>
                              +
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="wrapper-scramble-product">
                      <div className="scramble v1">ABOUT US</div>
                    </div>
                  </div>
                  <div className="block-title-product v2">
                    <div className="medium-big-text v1">The Core Platform </div>
                    <div className="medium-big-text v2">Powering Tools</div>
                  </div>
                </div>
                <div className="content-product">
                  <div className="wrapper-content-product v1">
                    <div className="block-logo-circle-product">
                      {(["01", "02", "03", "04"] as const).map((num, i) => (
                        <div key={num} style={{ display: "contents" }}>
                          <div className={`logo-circle-product v${i + 1}`}>
                            <div className={`small-text secondary v${i + 1}`}>
                              {num}
                              <br />
                            </div>
                          </div>
                          {i < 3 && <div className="circle-logo"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="wrapper-content-product v2">
                    <div className="wrapper-block-product">
                      <div className="block-image-product v1">
                        <Image
                          src="/images/extrude-group-block.png"
                          alt="Black isometric rounded square block."
                          width={240}
                          height={240}
                          className="block-image-product img"
                        />
                        <Image
                          src="/images/bar-chart.png"
                          alt="Isometric blue bar chart icon."
                          width={60}
                          height={60}
                          className="icon-product v1"
                        />
                      </div>
                      <div className="wrapper-block-image-product">
                        <div className="block-image-product v3">
                          <Image
                            src="/images/extrude-group-block.png"
                            alt="3D isometric block."
                            width={240}
                            height={240}
                            className="block-image-product img"
                          />
                          <Image
                            src="/images/auto-renew.png"
                            alt="Blue circular arrows auto-renew icon."
                            width={60}
                            height={60}
                            className="icon-product v3"
                          />
                        </div>
                        <div className="block-image-product v2">
                          <Image
                            src="/images/extrude-group-block.png"
                            alt="3D dark gray rounded block."
                            width={240}
                            height={240}
                            className="block-image-product img"
                          />
                          <Image
                            src="/images/linked-services.png"
                            alt="3D network diagram with connected cylinders."
                            width={60}
                            height={60}
                            className="icon-product v2"
                          />
                        </div>
                      </div>
                      <div className="block-image-product v4">
                        <Image
                          src="/images/extrude-group-block.png"
                          alt="3D dark gray rounded block."
                          width={240}
                          height={240}
                          className="block-image-product img"
                        />
                        <Image
                          src="/images/encrypted.png"
                          alt="Blue 3D shield with keyhole symbol."
                          width={60}
                          height={60}
                          className="icon-product v4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper-content-product v3">
                    <div className="wrapper-block-content-product">
                      <div className="block-content-product">
                        <div className="small-text align-right animation-v1">Advanced Intelligent Analytics Platform</div>
                        <div className="small-text align-right animation-v2">Unified Data Intelligence Foundation</div>
                        <div className="small-text align-right animation-v3">Adaptive Automation Workflow System</div>
                        <div className="small-text align-right animation-v4">Secure and Scalable Core Infrastructure</div>
                      </div>
                      <div className="block-content-title-product">
                        <div className="medium-big-text color-gradient animated-v1">Analytics</div>
                        <div className="medium-big-text color-gradient animated-v2">Data</div>
                        <div className="medium-big-text color-gradient animated-v3">Auto</div>
                        <div className="medium-big-text color-gradient animated-v4">Security</div>
                      </div>
                    </div>
                    <div className="block-content-desc-products">
                      <div className="block-content-desc-product">
                        <div>SYSTEM</div>
                        <div className="wrapper-content-desc-product">
                          <div className="scramble v1 animated-v1">REAL-TIME</div>
                          <div className="scramble v1 animated-v2">CONNECTED</div>
                          <div className="scramble v1 animated-v3">SMART</div>
                          <div className="scramble v1 animated-v4">ENTERPRISE</div>
                        </div>
                      </div>
                      <div className="block-content-desc-product">
                        <div>PERFOMANCE</div>
                        <div className="wrapper-content-desc-product">
                          <div className="scramble v1 animated-v1">PREDICTIVE</div>
                          <div className="scramble v1 animated-v2">SINGLE SOURCE</div>
                          <div className="scramble v1 animated-v3">EFFICIENCY</div>
                          <div className="scramble v1 animated-v4">SEAMLESS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trigger-wrapper-v1">
        <div className="trigger-contrast v1"></div>
        <div className="trigger-contrast v2"></div>
        <div className="trigger-contrast v3"></div>
        <div className="trigger-contrast v4"></div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── Plus items color loop ──────────────────────────────────────────
      const plusItems = gsap.utils.toArray<HTMLElement>(
        ".medium-text.anim-v1, .medium-text.anim-v2, .medium-text.anim-v3, .medium-text.anim-v4",
        section
      );
      if (plusItems.length) {
        const plusTl = gsap.timeline({ paused: true, repeat: -1 });
        plusTl
          .to(plusItems, { color: "#000000", duration: 0, stagger: { amount: 0.5 }, ease: "none" }, 0)
          .to(plusItems, { color: "#229eff", duration: 0.35, stagger: { amount: 0.5 }, ease: "power1.out" }, 0.15)
          .to(plusItems, { color: "#ffffff", duration: 0.35, stagger: { amount: 0.5 }, ease: "power1.out" }, 0.65);

        let started = false;
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          onEnter: () => {
            if (started) return;
            started = true;
            plusTl.play(0);
          },
        });
      }

      // ── Brightness/contrast pulse (a-58–a-65) ─────────────────────────
      // Fires independently when trigger-contrast elements scroll into view.
      const iconEls = {
        v1: section.querySelector<HTMLElement>(".icon-product.v1"),
        v2: section.querySelector<HTMLElement>(".icon-product.v2"),
        v3: section.querySelector<HTMLElement>(".icon-product.v3"),
        v4: section.querySelector<HTMLElement>(".icon-product.v4"),
      };

      // trigger v1→icon v1, trigger v2→icon v3, trigger v3→icon v2, trigger v4→icon v4
      const pulsePairs: Array<{ triggerClass: string; iconEl: HTMLElement | null }> = [
        { triggerClass: "v1", iconEl: iconEls.v1 },
        { triggerClass: "v2", iconEl: iconEls.v3 },
        { triggerClass: "v3", iconEl: iconEls.v2 },
        { triggerClass: "v4", iconEl: iconEls.v4 },
      ];

      pulsePairs.forEach(({ triggerClass, iconEl }) => {
        if (!iconEl) return;
        const triggerEl = section.querySelector<HTMLElement>(`.trigger-contrast.${triggerClass}`);
        if (!triggerEl) return;

        const pulseTl = gsap.timeline({ paused: true });
        pulseTl
          .to(iconEl, { "--icon-brightness": "100%", "--icon-contrast": "100%", duration: 0.5, ease: "none" }, 0)
          .to(iconEl, { "--icon-brightness": "200%", "--icon-contrast": "120%", duration: 0.7, ease: "none" }, 0.5)
          .to(iconEl, { "--icon-brightness": "100%", "--icon-contrast": "100%", duration: 0.7, ease: "none" }, 1.2);

        const reset = () => {
          pulseTl.pause(0);
          gsap.to(iconEl, { "--icon-brightness": "100%", "--icon-contrast": "100%", duration: 0.2, ease: "none", overwrite: "auto" });
        };

        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => pulseTl.restart(),
          onEnterBack: () => pulseTl.restart(),
          onLeave: reset,
          onLeaveBack: reset,
        });
      });

      // ── Entrance animation (replays every time section enters view) ───────
      // Slides the isometric block structure in from below and sweeps the
      // title text from brand-blue → white as it rises.
      const wrapperBlock = section.querySelector<HTMLElement>(".wrapper-block-product");
      const titleTexts   = Array.from(section.querySelectorAll<HTMLElement>(".block-title-product.v2 .medium-big-text"));
      const titleV1El    = section.querySelector<HTMLElement>(".block-title-product.v1");

      if (wrapperBlock) gsap.set(wrapperBlock, { opacity: 0, y: 70 });
      if (titleV1El)    gsap.set(titleV1El,    { opacity: 0, y: 16 });

      // Split title lines into individual words for staggered reveal
      let splitTitle: SplitText | null = null;
      let words: HTMLElement[] = [];
      if (titleTexts.length) {
        splitTitle = new SplitText(titleTexts, { type: "words" });
        words = splitTitle.words as HTMLElement[];
        gsap.set(words, { opacity: 0, y: 22, filter: "blur(10px)", color: "#229eff" });
      }

      const entranceTl = gsap.timeline({ paused: true });
      // Left block rises in
      if (titleV1El) entranceTl.to(titleV1El, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0);
      // Words sweep up one by one: blue → white, blur clears
      if (words.length) entranceTl.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)", color: "#ffffff",
        stagger: { amount: 0.55, from: "start" },
        duration: 0.7, ease: "power3.out",
      }, 0.12);
      // Isometric structure rises in
      if (wrapperBlock) entranceTl.to(wrapperBlock, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.2);

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
        animation: entranceTl,
      });

      // ── Unified main scroll timeline ───────────────────────────────────
      // Controls EVERYTHING in one timeline so color, position, rotation,
      // and text all move together and all reset together.
      //
      // Text-show positions match the original Webflow IX3 data exactly.
      // Block/icon relative offsets are uniform (identical to step 1's
      // original offsets) so all 4 steps behave identically.
      //
      // Animation order: v1 (Analytics) → v3 (Auto-renew) →
      //                  v2 (Linked services) → v4 (Security)
      const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, section);

      const block1 = section.querySelector<HTMLElement>(".block-image-product.v1");
      const block2 = section.querySelector<HTMLElement>(".block-image-product.v2");
      const block3 = section.querySelector<HTMLElement>(".block-image-product.v3");
      const block4 = section.querySelector<HTMLElement>(".block-image-product.v4");

      const circle1 = section.querySelector<HTMLElement>(".logo-circle-product.v1");
      const circle2 = section.querySelector<HTMLElement>(".logo-circle-product.v2");
      const circle3 = section.querySelector<HTMLElement>(".logo-circle-product.v3");
      const circle4 = section.querySelector<HTMLElement>(".logo-circle-product.v4");

      const titleV2     = section.querySelector<HTMLElement>(".block-title-product.v2");
      const logoCircles = section.querySelector<HTMLElement>(".block-logo-circle-product");
      const descBlocks  = section.querySelectorAll<HTMLElement>(".block-content-desc-product");

      // Step descriptors — textShow/textHide from original Webflow IX3 positions
      const steps = [
        {
          texts:  [...q(".animation-v1"), ...q(".animated-v1")],
          circle: circle1, block: block1, icon: iconEls.v1,
          textShow: 1.5, textHide: 3.6,
        },
        {
          texts:  [...q(".animation-v3"), ...q(".animated-v3")],
          circle: circle2, block: block3, icon: iconEls.v3,
          textShow: 4.24, textHide: 6.05,
        },
        {
          texts:  [...q(".animation-v2"), ...q(".animated-v2")],
          circle: circle3, block: block2, icon: iconEls.v2,
          textShow: 6.68, textHide: 8.58,
        },
        {
          texts:  [...q(".animation-v4"), ...q(".animated-v4")],
          circle: circle4, block: block4, icon: iconEls.v4,
          textShow: 9.32, textHide: null,  // last step: stays lifted
        },
      ];

      // Relative offsets (from textShow) — same for all steps, taken from step 1
      const R_BLOCK  = 0.63;  // block starts lifting
      const R_ICON   = 0.75;  // icon starts lifting + tilting + going colored
      const R_RETURN = 2.31;  // icon starts returning (slightly after block)

      const LIFT_DUR   = 1.0;
      const LOWER_DUR  = 0.86;
      const RETURN_DUR = 0.65;

      // Fixed lift px = -2vw, computed once
      const liftY = -0.02 * window.innerWidth;

      // ── Initial states ─────────────────────────────────────────────────
      // All icons: gray, no transform
      Object.values(iconEls).forEach((el) => {
        if (el) gsap.set(el, { "--icon-gray": "100%", "--icon-brightness": "100%", "--icon-contrast": "100%", y: 0, rotation: 0 });
      });
      // All blocks: no transform
      [block1, block2, block3, block4].forEach((el) => {
        if (el) gsap.set(el, { y: 0 });
      });
      // Text invisible, no offset (fromTo handles the from state)
      steps.forEach(({ texts, circle }) => {
        if (texts.length) gsap.set(texts, { opacity: 0 });
        if (circle) gsap.set(circle, { backgroundColor: "#000", borderColor: "#333", color: "#fff" });
      });
      if (logoCircles) gsap.set(logoCircles, { opacity: 0 });
      gsap.set(Array.from(descBlocks), { opacity: 0 });

      // ── Timeline ───────────────────────────────────────────────────────
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 45%",
          end: "bottom 130%",
          scrub: 0.8,
        },
      });

      // Preamble — title drifts up + blurs out as scroll starts
      if (titleV2) mainTl.to(titleV2, { opacity: 0, y: -28, filter: "blur(8px)", duration: 0.32, ease: "power2.in" }, 0.05);
      if (logoCircles) mainTl.to(logoCircles,            { opacity: 1, duration: 0 }, 0.5);
                       mainTl.to(Array.from(descBlocks), { opacity: 1, duration: 0 }, 1.0);

      steps.forEach(({ texts, circle, block, icon, textShow, textHide }) => {
        // ── Activate step — text slides in from right ──
        if (texts.length) mainTl.fromTo(
          texts,
          { opacity: 0, x: 18 },
          { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" },
          textShow
        );
        if (circle) mainTl.to(circle, { backgroundColor: "#fff", borderColor: "#229eff", color: "#000", duration: 0.15 }, textShow);
        if (block) mainTl.to(block, { y: liftY, duration: LIFT_DUR, ease: "power2.out" }, textShow + R_BLOCK);
        if (icon) mainTl.to(icon, { y: liftY, rotation: -38, "--icon-gray": "0%", duration: LIFT_DUR, ease: "power2.out" }, textShow + R_ICON);

        // ── Reset step (all except last) — text slides out to left ──
        if (textHide !== null) {
          if (texts.length) mainTl.to(texts, { opacity: 0, x: -14, duration: 0.18, ease: "power2.in" }, textHide);
          if (circle) mainTl.to(circle, { backgroundColor: "#000", borderColor: "#333", color: "#fff", duration: 0.15 }, textHide);
          if (block) mainTl.to(block, { y: 0, duration: LOWER_DUR, ease: "power2.in" }, textHide);
          if (icon) mainTl.to(icon, { y: 0, rotation: 0, "--icon-gray": "100%", duration: RETURN_DUR, ease: "none" }, textShow + R_RETURN);
        }
      });

      // Pad so the last lift tween has room to play out fully
      mainTl.addLabel("end", 9.32 + R_ICON + LIFT_DUR + 0.5);

      return () => { splitTitle?.revert(); };
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
                            <div key={cls} className={`medium-text ${cls}`}>+</div>
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
                            <div className={`small-text secondary v${i + 1}`}>{num}<br /></div>
                          </div>
                          {i < 3 && <div className="circle-logo" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="wrapper-content-product v2">
                    <div className="wrapper-block-product">
                      <div className="block-image-product v1">
                        <Image
                          src="/images/extrude-group-block.png"
                          alt="Black isometric rounded square block with a dashed inner outline on top."
                          width={240}
                          height={240}
                          className="block-image-product img"
                        />
                        <Image
                          src="/images/bar-chart.png"
                          alt="Isometric illustration of three blue rectangular bars of varying lengths on a black background."
                          width={60}
                          height={60}
                          className="icon-product v1"
                        />
                      </div>
                      <div className="wrapper-block-image-product">
                        <div className="block-image-product v3">
                          <Image
                            src="/images/extrude-group-block.png"
                            alt="3D isometric block with rounded corners and black top surface, outlined with dashed lines."
                            width={240}
                            height={240}
                            className="block-image-product img"
                          />
                          <Image
                            src="/images/auto-renew.png"
                            alt="Blue circular arrows forming a continuous loop symbolizing auto-renew or refresh."
                            width={60}
                            height={60}
                            className="icon-product v3"
                          />
                        </div>
                        <div className="block-image-product v2">
                          <Image
                            src="/images/extrude-group-block.png"
                            alt="3D dark gray rounded square block with beveled edges and dashed lines near the top surface edges."
                            width={240}
                            height={240}
                            className="block-image-product img"
                          />
                          <Image
                            src="/images/linked-services.png"
                            alt="3D network diagram with three connected cylinders forming a triangle and one separate cylinder below."
                            width={60}
                            height={60}
                            className="icon-product v2"
                          />
                        </div>
                      </div>
                      <div className="block-image-product v4">
                        <Image
                          src="/images/extrude-group-block.png"
                          alt="3D dark gray rounded square block with beveled edges and dashed lines near the top surface edges."
                          width={240}
                          height={240}
                          className="block-image-product img"
                        />
                        <Image
                          src="/images/encrypted.png"
                          alt="Blue 3D shield with a keyhole symbol in the center on a transparent background."
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
                        {/* STRATEGY UPDATE: The 4 stages of the Vantage transformation */}
                        <div className="small-text align-right animation-v1">Discovering profit leaks and operational friction.</div>
                        <div className="small-text align-right animation-v2">Connecting disparate systems into a unified architecture.</div>
                        <div className="small-text align-right animation-v3">Replacing manual tasks with intelligent, self-running workflows.</div>
                        <div className="small-text align-right animation-v4">Protecting assets and driving the final enterprise multiple.</div>
                      </div>
                      <div className="block-content-title-product">
                        {/* STRATEGY UPDATE: Short, punchy phase names */}
                        <div className="medium-big-text color-gradient animated-v1">Audit</div>
                        <div className="medium-big-text color-gradient animated-v2">Connect</div>
                        <div className="medium-big-text color-gradient animated-v3">Automate</div>
                        <div className="medium-big-text color-gradient animated-v4">Scale</div>
                      </div>
                    </div>
                    <div className="block-content-desc-products">
                      <div className="block-content-desc-product">
                        <div>PHASE</div>
                        <div className="wrapper-content-desc-product">
                          <div className="scramble v1 animated-v1">DISCOVERY</div>
                          <div className="scramble v1 animated-v2">ARCHITECTURE</div>
                          <div className="scramble v1 animated-v3">DEPLOYMENT</div>
                          <div className="scramble v1 animated-v4">VALUATION</div>
                        </div>
                      </div>
                      <div className="block-content-desc-product">
                        <div>OUTCOME</div>
                        <div className="wrapper-content-desc-product">
                          <div className="scramble v1 animated-v1">CLARITY</div>
                          <div className="scramble v1 animated-v2">COHESION</div>
                          <div className="scramble v1 animated-v3">EFFICIENCY</div>
                          <div className="scramble v1 animated-v4">PREMIUM EXIT</div>
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
        <div className="trigger-contrast v1" />
        <div className="trigger-contrast v2" />
        <div className="trigger-contrast v3" />
        <div className="trigger-contrast v4" />
      </div>
    </section>
  );
}

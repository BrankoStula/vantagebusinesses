"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function LabSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q  = <T extends Element>(sel: string): T | null => section.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string): T[]      => gsap.utils.toArray<T>(sel, section);

    // ── Elements ─────────────────────────────────────────────────────────
    const descV1     = q<HTMLElement>(".block-content-desc-lab.v1");
    const descV2     = q<HTMLElement>(".block-content-desc-lab.v2");
    const descV3     = q<HTMLElement>(".block-content-desc-lab.v3");
    const descV4     = q<HTMLElement>(".block-content-desc-lab.v4");
    const labsV1     = q<HTMLElement>(".content-desc-labs.v1");
    const labsV2     = qa<HTMLElement>(".content-desc-labs.v2");
    const stV1       = qa<HTMLElement>(".small-text.animated-v1");
    const stV2       = qa<HTMLElement>(".small-text.animated-v2");
    const stV3       = qa<HTMLElement>(".small-text.animated-v3");
    const stV4       = qa<HTMLElement>(".small-text.animated-v4");
    const scanBlock  = q<HTMLElement>(".block-scan-lab");
    const toggle     = q<HTMLElement>(".toggle");
    const countV1    = q<HTMLElement>(".medium-text.animated-v1");
    const countV2    = q<HTMLElement>(".medium-text.animated-v2");
    const failedTxt  = q<HTMLElement>(".text-secondary.absolute");
    const successTxt = q<HTMLElement>(".text-thirdly.opacity");
    const badgeAnim  = q<HTMLElement>(".badge.animated");
    const scramblePL = qa<HTMLElement>(".scramble.v1.padding-left");
    const trigV1El   = q<HTMLElement>(".trigger-lab.v1");
    const trigV2El   = q<HTMLElement>(".trigger-lab.v2");
    const trigV3El   = q<HTMLElement>(".trigger-lab.v3");

    // ── SVG elements ──────────────────────────────────────────────────────
    const pieSeg1    = q<Element>(".pie-seg.v1");
    const pieSeg2    = q<Element>(".pie-seg.v2");
    const pieSeg3    = q<Element>(".pie-seg.v3");
    const pieSeg4    = q<Element>(".pie-seg.v4");
    const trendLine  = q<Element>(".trend-line");
    const scatterDots = qa<Element>(".scatter-dot");

    // ── Initial hidden states ─────────────────────────────────────────────
    [descV1, descV2, descV3, descV4].forEach(el => {
      if (el) gsap.set(el, { opacity: 0, y: "7vw", scale: 0.8 });
    });
    if (labsV1)        gsap.set(labsV1, { scale: 0.8 });
    if (labsV2.length) gsap.set(labsV2, { scale: 0.8 });
    [...stV1, ...stV2, ...stV3, ...stV4].forEach(el => gsap.set(el, { opacity: 0 }));

    // Pre-hide the scatter dots slightly to pop them in
    if (scatterDots.length) gsap.set(scatterDots, { scale: 0, transformOrigin: "center" });

    // ── SplitText ─────────────────────────────────────────────────────────
    const operationsEl = q<HTMLElement>(".medium-big-text.animated-1");
    const valuationEl  = q<HTMLElement>(".medium-big-text.muted.animated-2");

    const splitOperations = operationsEl ? new SplitText(operationsEl, { type: "chars" }) : null;
    const splitValuation  = valuationEl  ? new SplitText(valuationEl,  { type: "chars" }) : null;
    const operationsChars = splitOperations?.chars ?? [];
    const valuationChars  = splitValuation?.chars  ?? [];

    // ── Timeline 1: Entrance — triggered by .trigger-lab.v1 ──────────────
    const t1 = gsap.timeline({ paused: true });

    if (operationsChars.length) {
      t1.to(operationsChars, { color: "hsla(0,0%,25.1%,1)", duration: 0.26, stagger: { amount: 0.5 }, ease: "none" }, 0)
        .to(operationsChars, { color: "#229eff",             duration: 0.3,  stagger: { amount: 0.5 }, ease: "none" }, 0.26)
        .to(operationsChars, { color: "#ffffff",             duration: 0.3,  stagger: { amount: 0.5 }, ease: "none" }, 0.66);
    }

    if (descV1) t1.to(descV1, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 0.88);
    if (labsV1) t1.to(labsV1, { scale: 1, duration: 0.4, ease: "none" }, 1.4);
    if (stV1.length) t1.to(stV1, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 1.4);

    if (descV2) t1.to(descV2, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 1.14);
    if (stV2.length) t1.to(stV2, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 1.63);

    if (descV3) t1.to(descV3, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 1.34);
    if (labsV2.length) t1.to(labsV2, { scale: 1, stagger: { amount: 0.5 }, duration: 0.4, ease: "none" }, 1.64);
    if (stV3.length) t1.to(stV3, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 1.84);

    if (descV4) t1.to(descV4, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 1.68);
    if (stV4.length) t1.to(stV4, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 2.2);

    if (trigV1El) {
      ScrollTrigger.create({
        trigger: trigV1El,
        start: "top bottom",
        end:   "bottom top",
        onEnter:     () => t1.play(),
        onLeave:     () => { /* keep playing through */ },
        onEnterBack: () => t1.pause(),
        onLeaveBack: () => t1.pause(0),
      });
    }

    // ── Timeline 2: Scan + Data Transform — triggered by .trigger-lab.v2 ─
    const t2 = gsap.timeline({ paused: true });

    if (scanBlock) {
      t2.to(scanBlock, { x: "-100vw", ease: "none" }, 0);
      t2.to(scanBlock, { opacity: 0, duration: 0.2, ease: "none" }, 0.43);
    }
    
    if (operationsChars.length) t2.to(operationsChars, { color: "#404040", duration: 0.3, ease: "none" }, 0.34);
    if (toggle) t2.to(toggle, { x: "100%", ease: "power2.out" }, 0.19);

    if (pieSeg3) t2.to(pieSeg3, { attr: { stroke: "#4db8ff", strokeWidth: "28" }, duration: 0.35, ease: "power1.out" }, 0.42);
    if (pieSeg1) t2.to(pieSeg1, { attr: { stroke: "#1a4a7a" },                    duration: 0.35, ease: "power1.out" }, 0.42);

    if (countV1) t2.to(countV1, { y: "-300%", ease: "power2.out" }, 0.24);
    if (countV2) t2.to(countV2, { y: "-200%", ease: "power2.out" }, 0.24);

    if (failedTxt)  t2.to(failedTxt,  { opacity: 0, duration: 0.2, ease: "none" }, 0.24);
    if (successTxt) t2.to(successTxt, { opacity: 1, duration: 0.2, ease: "none" }, 0.24);
    if (badgeAnim)  t2.to(badgeAnim,  { backgroundColor: "#002b4d", borderColor: "#229eff", duration: 1.5, ease: "none" }, 0.24);

    // Scatter Plot Animation: Pop dots in, then smoothly draw the trendline
    if (scatterDots.length) t2.to(scatterDots, { scale: 1, attr: { fill: "#229eff" }, stagger: 0.04, duration: 0.4, ease: "back.out(1.5)" }, 0.13);
    if (trendLine) t2.to(trendLine, { attr: { strokeDashoffset: "0" }, duration: 1.0, ease: "power2.inOut" }, 0.3);

    if (scramblePL.length) t2.to(scramblePL, { y: "-100%", ease: "power2.out" }, 0.13);

    if (trigV2El) {
      ScrollTrigger.create({
        trigger: trigV2El,
        start: "top bottom",
        end:   "bottom top",
        onEnter:     () => t2.play(),
        onLeave:     () => t2.pause(),
        onEnterBack: () => t2.play(),
        onLeaveBack: () => t2.reverse(),
      });
    }

    // ── Timeline 3: Glow Loop — triggered by .trigger-lab.v3 ─────────────
    const t3 = gsap.timeline({ paused: true, repeat: -1 });

    if (valuationChars.length) {
      t3.to(valuationChars, { color: "#ffffff", stagger: { amount: 0.5 }, ease: "none" }, 0)
        .to(valuationChars, { color: "#229eff", duration: 0.7, stagger: { amount: 0.5 }, ease: "none" }, 0.5)
        .to(valuationChars, { color: "#000000", duration: 0.3, stagger: { amount: 0.3 }, ease: "none" }, 1.2)
        .to(valuationChars, { color: "#ffffff", duration: 0.8, stagger: { amount: 0.7 }, ease: "none" }, 1.5);
    }

    const segs = [pieSeg1, pieSeg2, pieSeg3, pieSeg4].filter((el): el is Element => el !== null);
    if (segs.length) {
      t3.to(segs, { attr: { strokeWidth: "28" }, duration: 1.22, stagger: { amount: 0.8 }, ease: "power2.out" }, 0);
      t3.to(segs, { attr: { strokeWidth: "22" }, duration: 1.77, stagger: { amount: 0.4 }, ease: "power2.out" }, 1.22);
    }

    if (trigV3El) {
      ScrollTrigger.create({
        trigger: trigV3El,
        start: "top+=20% bottom",
        end:   "bottom top",
        onEnter:     () => t3.play(0),
        onLeave:     () => { t3.pause(); t3.seek(0); },
        onEnterBack: () => t3.pause(0),
        onLeaveBack: () => t3.pause(0),
      });
    }

    return () => {
      splitOperations?.revert();
      splitValuation?.revert();
    };
  }, { scope: sectionRef });

  return (
    <section id="lab" className="tracks lab" ref={sectionRef}>
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="wrapper-padding">
              <div className="wrapper-lab">

                <div className="block-title-lab">
                  <div className="medium-big-text color-gradient">From</div>
                  <div className="medium-big-text animated-1">Operations</div>
                  <div className="wrapper-toggle">
                    <div className="toggle"></div>
                  </div>
                  <div className="medium-big-text muted animated-2">Valuation</div>
                </div>

                <div className="lab-subtitle">
                  <p className="small-text text-secondary" style={{ marginBottom: "2rem" }}>
                    Two companies can generate the same revenue but be valued completely differently. The difference comes down to structure, efficiency, and systems.
                  </p>
                </div>

                <div className="block-content-lab">

                  {/* Card 1 — Valuation Leakage */}
                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v1">
                      <div className="title-content-desc-lab">
                        <div className="small-text animated-v1">Valuation Leakage</div>
                        <div className="small-text text-secondary lab-card-desc">Time and capital lost to unscalable, day-to-day operational inefficiencies.</div>
                      </div>
                      <div className="content-desc-lab">
                        {/* Enlarged Donut SVG */}
                        <div className="block-image-lab">
                          <svg viewBox="0 0 200 200" className="svg-donut" aria-hidden="true">
                            <circle cx="100" cy="100" r="70" fill="none" stroke="#1c1c1c" strokeWidth="26" />
                            <g transform="rotate(-90 100 100)">
                              <circle cx="100" cy="100" r="70" fill="none" stroke="#002b4d" strokeWidth="22"
                                strokeDasharray="100 340" strokeDashoffset="0"   className="pie-seg v1" />
                              <circle cx="100" cy="100" r="70" fill="none" stroke="#003d6e" strokeWidth="22"
                                strokeDasharray="100 340" strokeDashoffset="-110" className="pie-seg v2" />
                              <circle cx="100" cy="100" r="70" fill="none" stroke="#229eff" strokeWidth="22"
                                strokeDasharray="100 340" strokeDashoffset="-220" className="pie-seg v3" />
                              <circle cx="100" cy="100" r="70" fill="none" stroke="#1a4a7a" strokeWidth="22"
                                strokeDasharray="100 340" strokeDashoffset="-330" className="pie-seg v4" />
                            </g>
                          </svg>
                        </div>
                        <div className="wrapper-subcontent-hero v4 version-2">
                          <Image
                            src="/images/Triangle_1Triangle.png"
                            alt="Triangle icon."
                            width={60}
                            height={60}
                            className="image-icon-hero"
                          />
                          <div className="text-subcontent-hero">
                            <div className="scramble v1 padding-left">PROFIT LEAKING</div>
                            <div className="scramble v1 padding-left">VALUE RETAINED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cards 2 + 3 — Owner Independence & System Scalability */}
                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v2">
                      <div className="title-content-desc-lab">
                        <div className="small-text animated-v2">Owner Independence</div>
                        <div className="small-text text-secondary lab-card-desc">Reducing reliance on the founder to build a scalable, exit-ready asset.</div>
                      </div>
                      <div className="content-desc-lab v2">
                        <div className="content-desc-labs v1">
                          <div className="number-counting">
                            <div className="medium-text animated-v1">2<br />3<br />4<br />5</div>
                            <div className="medium-text">x</div>
                          </div>
                          <div className="badge">
                            <div className="text-secondary">Founder-Led</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="block-content-desc-lab v3">
                      <div className="title-content-desc-lab">
                        <div className="small-text animated-v3">System Scalability</div>
                        <div className="small-text text-secondary lab-card-desc">Replacing single points of failure with structured, automated processes.</div>
                      </div>
                      <div className="content-desc-lab v3">
                        <div className="content-desc-labs v2">
                          <div className="small-text animated-v3">Reporting</div>
                          <div className="badge secondary">
                            <div className="text-thirdly">Auditable</div>
                          </div>
                        </div>
                        <div className="content-desc-labs v2">
                          <div className="small-text animated-v3">Process Risk</div>
                          <div className="badge animated">
                            <div className="badge-animation">
                              <div className="text-secondary absolute">High Risk</div>
                              <div className="text-thirdly opacity">Resolved</div>
                            </div>
                          </div>
                        </div>
                        <div className="content-desc-labs v2">
                          <div className="small-text animated-v3">Operations</div>
                          <div className="badge secondary">
                            <div className="text-thirdly">Automated</div>
                          </div>
                        </div>
                        <div className="content-desc-labs-scramble">
                          <div className="scramble">PARTIAL</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 — The Valuation Gap */}
                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v4">
                      <div className="title-content-desc-lab">
                        <div className="small-text animated-v4">The Valuation Gap</div>
                        <div className="small-text text-secondary lab-card-desc">Where your business is currently priced versus what it could be worth.</div>
                      </div>
                      {/* Redesigned Scatter Plot SVG */}
                      <div className="content-desc-lab v4">
                        <svg viewBox="0 0 300 200" className="svg-scatter" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
                          {/* Background Grid Lines for a technical/financial feel */}
                          <path d="M 0 40 L 300 40 M 0 80 L 300 80 M 0 120 L 300 120 M 0 160 L 300 160" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" />
                          
                          {/* Axes */}
                          <path d="M 20 180 L 280 180" stroke="#333" strokeWidth="2" />
                          <path d="M 20 20 L 20 180" stroke="#333" strokeWidth="2" />
                          
                          {/* Data Dots — Plotted to show clear upward growth */}
                          <circle cx="50"  cy="150" r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="80"  cy="140" r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="110" cy="120" r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="140" cy="125" r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="170" cy="95"  r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="200" cy="80"  r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="230" cy="65"  r="5" fill="#1a4a7a" className="scatter-dot" />
                          <circle cx="260" cy="40"  r="5" fill="#1a4a7a" className="scatter-dot" />
                          
                          {/* Animated Trend Line */}
                          <line
                            x1="30" y1="165" x2="275" y2="25"
                            stroke="#229eff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="350"
                            strokeDashoffset="350"
                            className="trend-line"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="block-scan-lab">
                  <div className="line-scan"></div>
                  <div className="body-scan"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trigger-wrapper-v2">
        <div className="trigger-lab v1"></div>
        <div className="block-trigger-lab">
          <div className="trigger-lab v2"></div>
          <div className="trigger-lab v3"></div>
        </div>
      </div>
    </section>
  );
}
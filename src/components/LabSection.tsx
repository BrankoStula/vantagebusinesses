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

    const q  = <T extends Element>(sel: string): T | null   => section.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string): T[]        => gsap.utils.toArray<T>(sel, section);

    // ── Elements ─────────────────────────────────────────────────────────
    const descV1     = q<HTMLElement>(".block-content-desc-lab.v1");
    const descV2     = q<HTMLElement>(".block-content-desc-lab.v2");
    const descV3     = q<HTMLElement>(".block-content-desc-lab.v3");
    const descV4     = q<HTMLElement>(".block-content-desc-lab.v4");
    const imgV1      = q<HTMLElement>(".image-content-lab.v1");
    const imgV2      = q<HTMLElement>(".image-content-lab.v2");
    const imgV3      = q<HTMLElement>(".image-content-lab.v3");
    const labsV1     = q<HTMLElement>(".content-desc-labs.v1");
    const labsV2     = qa<HTMLElement>(".content-desc-labs.v2");
    const stV1       = qa<HTMLElement>(".small-text.animated-v1");
    const stV2       = qa<HTMLElement>(".small-text.animated-v2");
    const stV3       = qa<HTMLElement>(".small-text.animated-v3");
    const stV4       = qa<HTMLElement>(".small-text.animated-v4");
    const scanBlock  = q<HTMLElement>(".block-scan-lab");
    const toggle     = q<HTMLElement>(".toggle");
    const wrapperImg = q<HTMLElement>(".wrapper-image-lab");
    const pieV1      = q<HTMLElement>(".pie.v1");
    const pieV2      = q<HTMLElement>(".pie.v2");
    const pieV3      = q<HTMLElement>(".pie.v3");
    const pieV4      = q<HTMLElement>(".pie.v4");
    const countV1    = q<HTMLElement>(".medium-text.animated-v1");
    const countV2    = q<HTMLElement>(".medium-text.animated-v2");
    const failedTxt  = q<HTMLElement>(".text-secondary.absolute");
    const successTxt = q<HTMLElement>(".text-thirdly.opacity");
    const badgeAnim  = q<HTMLElement>(".badge.animated");
    const scramblePL = qa<HTMLElement>(".scramble.v1.padding-left");
    const trigV1El   = q<HTMLElement>(".trigger-lab.v1");
    const trigV2El   = q<HTMLElement>(".trigger-lab.v2");
    const trigV3El   = q<HTMLElement>(".trigger-lab.v3");

    // ── Initial hidden states (mirrors Webflow w-mod-js CSS) ─────────────
    [descV1, descV2, descV3, descV4].forEach(el => {
      if (el) gsap.set(el, { opacity: 0, y: "7vw", scale: 0.8 });
    });
    if (imgV1)      gsap.set(imgV1,  { scale: 0.6 });
    if (imgV2)      gsap.set(imgV2,  { scale: 0.6 });
    if (labsV1)     gsap.set(labsV1, { scale: 0.8 });
    if (labsV2.length) gsap.set(labsV2, { scale: 0.8 });
    [...stV1, ...stV2, ...stV3, ...stV4].forEach(el => gsap.set(el, { opacity: 0 }));

    // ── SplitText ─────────────────────────────────────────────────────────
    const manualEl      = q<HTMLElement>(".medium-big-text.animated-1");
    const intelligentEl = q<HTMLElement>(".medium-big-text.muted.animated-2");

    const splitManual      = manualEl      ? new SplitText(manualEl,      { type: "chars" }) : null;
    const splitIntelligent = intelligentEl ? new SplitText(intelligentEl, { type: "chars" }) : null;
    const manualChars      = splitManual?.chars      ?? [];
    const intelligentChars = splitIntelligent?.chars ?? [];

    // ── Timeline 1: Entrance — triggered by .trigger-lab.v1 ──────────────
    // Webflow: enter:play  leave:resume  enterBack:pause  leaveBack:reset
    const t1 = gsap.timeline({ paused: true });

    // "Manual" chars flash gray → blue → white on entry
    if (manualChars.length) {
      t1.to(manualChars, { color: "hsla(0,0%,25.1%,1)", duration: 0.26, stagger: { amount: 0.5 }, ease: "none" }, 0)
        .to(manualChars, { color: "#229eff",             duration: 0.3,  stagger: { amount: 0.5 }, ease: "none" }, 0.26)
        .to(manualChars, { color: "#ffffff",             duration: 0.3,  stagger: { amount: 0.5 }, ease: "none" }, 0.66);
    }

    if (descV1) t1.to(descV1, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 0.88);
    if (imgV1)  t1.to(imgV1,  { scale: 1, duration: 0.35, ease: "none" }, 1.23);
    if (labsV1) t1.to(labsV1, { scale: 1, duration: 0.4,  ease: "none" }, 1.4);
    if (stV1.length) t1.to(stV1, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 1.4);

    if (descV2) t1.to(descV2, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 1.14);
    if (stV2.length) t1.to(stV2, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 1.63);

    if (descV3) t1.to(descV3, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 1.34);
    if (labsV2.length) t1.to(labsV2, { scale: 1, stagger: { amount: 0.5 }, duration: 0.4, ease: "none" }, 1.64);
    if (stV3.length) t1.to(stV3, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 1.84);

    if (descV4) t1.to(descV4, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power1.out" }, 1.68);
    if (imgV2)  t1.to(imgV2,  { scale: 1, duration: 0.35, ease: "none" }, 2.03);
    if (stV4.length) t1.to(stV4, { opacity: 1, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "none" }, 2.2);

    if (trigV1El) {
      ScrollTrigger.create({
        trigger: trigV1El,
        start: "top bottom",
        end:   "bottom top",
        onEnter:     () => t1.play(),
        onLeave:     () => { /* resume = keep playing through */ },
        onEnterBack: () => t1.pause(),
        onLeaveBack: () => t1.pause(0),
      });
    }

    // ── Timeline 2: Scan + Data Transform — triggered by .trigger-lab.v2 ─
    // Webflow: enter:play  leave:pause  enterBack:play  leaveBack:reverse
    const t2 = gsap.timeline({ paused: true });

    // Scan overlay sweeps left then fades out
    if (scanBlock) {
      t2.to(scanBlock, { x: "-100vw", ease: "none" }, 0);
      t2.to(scanBlock, { opacity: 0, duration: 0.2, ease: "none" }, 0.43);
    }
    // "Manual" text dims — toggle flips right
    if (manualChars.length) t2.to(manualChars, { color: "#404040", duration: 0.3, ease: "none" }, 0.34);
    if (toggle) t2.to(toggle, { x: "100%", ease: "power2.out" }, 0.19);

    // Pie: base layer fades out → segments spread
    if (imgV1)      t2.to(imgV1,      { opacity: 0, duration: 0.2,  ease: "none" }, 0.26);
    if (wrapperImg) t2.to(wrapperImg, { opacity: 1, duration: 0.25, ease: "none" }, 0.42);
    if (pieV1) t2.to(pieV1, { x: "-0.5vw", y: "-0.5vw", duration: 0.25, ease: "none" }, 0.53);
    if (pieV2) t2.to(pieV2, { x:  "0.5vw", y: "-0.5vw", duration: 0.25, ease: "none" }, 0.53);
    if (pieV3) t2.to(pieV3, { x: "-0.5vw", y:  "0.5vw", duration: 0.25, ease: "none" }, 0.53);
    if (pieV4) t2.to(pieV4, { x:  "0.5vw", y:  "0.5vw", duration: 0.25, ease: "none" }, 0.53);

    // Counter: 69% → 99%
    if (countV1) t2.to(countV1, { y: "-300%", ease: "power2.out" }, 0.24);
    if (countV2) t2.to(countV2, { y: "-200%", ease: "power2.out" }, 0.24);

    // Badge: Failed → Success
    if (failedTxt)  t2.to(failedTxt,  { opacity: 0, duration: 0.2, ease: "none" }, 0.24);
    if (successTxt) t2.to(successTxt, { opacity: 1, duration: 0.2, ease: "none" }, 0.24);
    if (badgeAnim)  t2.to(badgeAnim,  { backgroundColor: "#002b4d", borderColor: "#229eff", duration: 1.5, ease: "none" }, 0.24);

    // Chart: scatter → trend line
    if (imgV2) t2.to(imgV2, { opacity: 0, ease: "none" }, 0.13);
    if (imgV3) t2.to(imgV3, { opacity: 1, ease: "none" }, 0.23);

    // Task status scrolls: TASK DELAYED → TASK COMPLETED
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
    // Webflow: enter:play  leave/enterBack/leaveBack:reset  repeat:-1
    const t3 = gsap.timeline({ paused: true, repeat: -1 });

    // "Inteligent" chars cycle: darkgray → white → blue → black → white
    if (intelligentChars.length) {
      t3.to(intelligentChars, { color: "#ffffff", stagger: { amount: 0.5 }, ease: "none" }, 0)
        .to(intelligentChars, { color: "#229eff", duration: 0.7, stagger: { amount: 0.5 }, ease: "none" }, 0.5)
        .to(intelligentChars, { color: "#000000", duration: 0.3, stagger: { amount: 0.3 }, ease: "none" }, 1.2)
        .to(intelligentChars, { color: "#ffffff", duration: 0.8, stagger: { amount: 0.7 }, ease: "none" }, 1.5);
    }

    // Pie segments pulse in scale
    const pies = [pieV1, pieV2, pieV4, pieV3].filter((el): el is HTMLElement => el !== null);
    if (pies.length) {
      t3.to(pies, { scale: 1.2, duration: 1.22, stagger: { amount: 0.8 }, ease: "power2.out" }, 0);
      t3.to(pies, { scale: 1,   duration: 1.77, stagger: { amount: 0.4 }, ease: "power2.out" }, 1.22);
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
      splitManual?.revert();
      splitIntelligent?.revert();
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
                  <div className="medium-big-text animated-1">Manual</div>
                  <div className="wrapper-toggle">
                    <div className="toggle"></div>
                  </div>
                  <div className="medium-big-text muted animated-2">Intelegent</div>
                </div>

                <div className="block-content-lab">
                  {/* Bottleneck Detection */}
                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v1">
                      <div className="title-content-desc-lab">
                        <div className="small-text animated-v1">Bottleneck Detected</div>
                      </div>
                      <div className="content-desc-lab">
                        <div className="block-image-lab">
                          <Image
                            src="/images/PieLayer.png"
                            alt="Black donut chart with four segmented arcs."
                            width={240}
                            height={240}
                            className="image-content-lab v1"
                          />
                          <div className="wrapper-image-lab">
                            <div className="wraper-block-image-lab">
                              <Image src="/images/pie3.png" alt="Dark blue quarter circle arc." width={120} height={120} className="pie v1" />
                              <Image src="/images/pie0.png" alt="Dark blue quarter circle ring." width={120} height={120} className="pie v2" />
                            </div>
                            <div className="wraper-block-image-lab">
                              <Image src="/images/pie2.png" alt="Dark blue quarter circle shape." width={120} height={120} className="pie v3" />
                              <Image src="/images/pie1.png" alt="Dark blue quarter circle arc." width={120} height={120} className="pie v4" />
                            </div>
                          </div>
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
                            <div className="scramble v1 padding-left">TASK DELAYED</div>
                            <div className="scramble v1 padding-left">TASK COMPLETED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Process Efficiency + Data Sync */}
                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v2">
                      <div className="content-desc-lab v2">
                        <div className="small-text animated-v2">Process Efficiency</div>
                        <div className="content-desc-labs v1">
                          <div className="number-counting">
                            <div className="medium-text animated-v1">6<br />7<br />8<br />9</div>
                            <div className="medium-text animated-v2">7<br />8<br />9</div>
                            <div className="medium-text">%</div>
                          </div>
                          <div className="badge">
                            <div className="text-secondary">Partially / Manual</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block-content-desc-lab v3">
                      <div className="content-desc-lab v3">
                        <div className="content-desc-labs v2">
                          <div className="small-text animated-v3">Data Sync</div>
                          <div className="badge secondary">
                            <div className="text-thirdly">Success</div>
                          </div>
                        </div>
                        <div className="content-desc-labs v2">
                          <div className="small-text animated-v3">Validation</div>
                          <div className="badge animated">
                            <div className="badge-animation">
                              <div className="text-secondary absolute">Failed</div>
                              <div className="text-thirdly opacity">Success</div>
                            </div>
                          </div>
                        </div>
                        <div className="content-desc-labs v2">
                          <div className="small-text animated-v3">Report</div>
                          <div className="badge secondary">
                            <div className="text-thirdly">Success</div>
                          </div>
                        </div>
                        <div className="content-desc-labs-scramble">
                          <div className="scramble">PARTIAL</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Scatter */}
                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v4">
                      <div className="title-content-desc-lab">
                        <div className="small-text animated-v4">Data Scatter</div>
                      </div>
                      <div className="content-desc-lab v4">
                        <Image
                          src="/images/ChartAxis.png"
                          alt="Scatter plot with blue circular markers."
                          width={240}
                          height={240}
                          className="image-content-lab v2"
                        />
                        <Image
                          src="/images/ChartAxisFinal.png"
                          alt="Scatter plot with blue data points trending upward."
                          width={240}
                          height={240}
                          className="image-content-lab v3"
                        />
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

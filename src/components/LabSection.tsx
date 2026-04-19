"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function LabSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const fromText = section.querySelector<HTMLElement>(".block-title-lab .medium-big-text.color-gradient");
      const manualText = section.querySelector<HTMLElement>(".medium-big-text.animated-1");
      const intelligentText = section.querySelector<HTMLElement>(".medium-big-text.animated-2");
      const toggle = section.querySelector<HTMLElement>(".toggle");
      const scanBlock = section.querySelector<HTMLElement>(".block-scan-lab");

      const leftCard = section.querySelector<HTMLElement>(".block-content-desc-lab.v1");
      const contentPanels = gsap.utils.toArray<HTMLElement>(".content-desc-lab", section);
      const leftTitle = section.querySelector<HTMLElement>(".small-text.animated-v1");
      const pieBase = section.querySelector<HTMLElement>(".image-content-lab.v1");
      const pieOverlay = section.querySelector<HTMLElement>(".wrapper-image-lab");
      const leftStatus = section.querySelector<HTMLElement>(".wrapper-subcontent-hero.v4.version-2");
      const leftStatusLines = gsap.utils.toArray<HTMLElement>(
        ".block-content-desc-lab.v1 .text-subcontent-hero .scramble.v1",
        section
      );

      const middleCard = section.querySelector<HTMLElement>(".block-content-desc-lab.v2");
      const middleTitle = section.querySelector<HTMLElement>(".block-content-desc-lab.v2 .small-text.animated-v2");
      const middleBody = section.querySelector<HTMLElement>(".block-content-desc-lab.v2 .content-desc-labs.v1");
      const countPrimary = section.querySelector<HTMLElement>(".block-content-desc-lab.v2 .medium-text.animated-v1");
      const countSecondary = section.querySelector<HTMLElement>(".block-content-desc-lab.v2 .medium-text.animated-v2");

      const dataCard = section.querySelector<HTMLElement>(".block-content-desc-lab.v3");
      const dataRows = gsap.utils.toArray<HTMLElement>(".block-content-desc-lab.v3 .content-desc-labs.v2", section);
      const dataTitles = gsap.utils.toArray<HTMLElement>(".block-content-desc-lab.v3 .small-text.animated-v3", section);
      const validationBadge = section.querySelector<HTMLElement>(".block-content-desc-lab.v3 .badge.animated");
      const validationFailed = section.querySelector<HTMLElement>(".block-content-desc-lab.v3 .text-secondary.absolute");
      const validationSuccess = section.querySelector<HTMLElement>(".block-content-desc-lab.v3 .text-thirdly.opacity");
      const partialLabel = section.querySelector<HTMLElement>(".content-desc-labs-scramble");

      const rightCard = section.querySelector<HTMLElement>(".block-content-desc-lab.v4");
      const rightTitle = section.querySelector<HTMLElement>(".small-text.animated-v4");
      const chartBase = section.querySelector<HTMLElement>(".image-content-lab.v2");
      const chartFinal = section.querySelector<HTMLElement>(".image-content-lab.v3");

      const triggerOne = section.querySelector<HTMLElement>(".trigger-lab.v1");
      const triggerTwo = section.querySelector<HTMLElement>(".trigger-lab.v2");
      const triggerThree = section.querySelector<HTMLElement>(".trigger-lab.v3");

      if (
        !fromText ||
        !manualText ||
        !intelligentText ||
        !toggle ||
        !scanBlock ||
        !leftCard ||
        contentPanels.length < 4 ||
        !leftTitle ||
        !pieBase ||
        !pieOverlay ||
        !leftStatus ||
        leftStatusLines.length < 2 ||
        !middleCard ||
        !middleTitle ||
        !middleBody ||
        !countPrimary ||
        !countSecondary ||
        !dataCard ||
        !dataRows.length ||
        !dataTitles.length ||
        !validationBadge ||
        !validationFailed ||
        !validationSuccess ||
        !partialLabel ||
        !rightCard ||
        !rightTitle ||
        !chartBase ||
        !chartFinal ||
        !triggerOne ||
        !triggerTwo ||
        !triggerThree
      ) {
        return;
      }

      const panelCards = [leftCard, middleCard, dataCard, rightCard];

      const setTitlePreScanState = () => {
        gsap.set(fromText, {
          opacity: 1,
          xPercent: 0,
          filter: "blur(0px)",
        });
        gsap.set(manualText, {
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          color: "#ffffff",
          textShadow: "0 0 0 rgba(34, 158, 255, 0)",
          filter: "blur(0px) brightness(100%)",
          transformOrigin: "50% 50%",
        });
        gsap.set(intelligentText, {
          opacity: 0.42,
          xPercent: 8,
          filter: "blur(2px)",
        });
        gsap.set(toggle, { xPercent: 0 });
      };

      const setScanHiddenState = () => {
        gsap.set(scanBlock, {
          xPercent: -101,
          autoAlpha: 0,
        });
      };

      const ensurePanelsVisible = () => {
        gsap.set(panelCards, { autoAlpha: 1 });
      };

      const setDiagramPreScanState = () => {
        gsap.set(leftTitle, { opacity: 1 });
        gsap.set(pieBase, { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
        gsap.set(pieOverlay, { opacity: 0, scale: 0.96, transformOrigin: "50% 50%" });
        gsap.set(leftStatus, { opacity: 1, y: "0vw" });
        gsap.set(leftStatusLines[0], { opacity: 1, yPercent: 0 });
        gsap.set(leftStatusLines[1], { opacity: 0, yPercent: 110 });

        gsap.set([middleTitle, middleBody], { opacity: 1 });
        gsap.set(countPrimary, { yPercent: 0 });
        gsap.set(countSecondary, { yPercent: 0 });

        gsap.set(dataRows, { opacity: 1, yPercent: 0 });
        gsap.set(dataTitles, { opacity: 1 });
        gsap.set(partialLabel, { opacity: 1 });
        gsap.set(validationSuccess, { opacity: 0, yPercent: 110 });
        gsap.set(validationFailed, { opacity: 1, yPercent: 0 });
        gsap.set(validationBadge, {
          borderColor: "#8e3939",
          backgroundColor: "#361313",
        });

        gsap.set(rightTitle, { opacity: 1 });
        gsap.set(chartBase, { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
        gsap.set(chartFinal, {
          opacity: 0,
          yPercent: 4,
          scale: 0.985,
          filter: "blur(5px)",
          transformOrigin: "50% 50%",
        });
      };

      const setInitialState = () => {
        setTitlePreScanState();
        setScanHiddenState();
        setDiagramPreScanState();
        ensurePanelsVisible();
        gsap.set(contentPanels, { autoAlpha: 0 });
      };

      const setRevealState = () => {
        setTitlePreScanState();
        setScanHiddenState();
        setDiagramPreScanState();
        ensurePanelsVisible();
        gsap.set(contentPanels, { autoAlpha: 1 });
      };

      const manualLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        defaults: { ease: "sine.inOut" },
      });

      manualLoop
        .to(manualText, {
          color: "#229eff",
          textShadow: "0 0 18px rgba(34, 158, 255, 0.5)",
          filter: "blur(0px) brightness(170%)",
          duration: 0.34,
        })
        .to(manualText, {
          color: "#ffffff",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.24)",
          filter: "blur(0px) brightness(118%)",
          duration: 0.34,
        });

      const revealSequence = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        onStart: () => {
          setTitlePreScanState();
          setScanHiddenState();
          setDiagramPreScanState();
          ensurePanelsVisible();
          gsap.set(contentPanels, { autoAlpha: 0 });
          manualLoop.restart(true);
        },
      });

      revealSequence.to(contentPanels, {
        autoAlpha: 1,
        duration: 0.24,
        stagger: 0.1,
      });

      setInitialState();

      const scanSequence = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        onStart: () => {
          manualLoop.pause(0);
          setRevealState();
        },
      });

      scanSequence
        .to(
          manualText,
          {
            scale: 1.08,
            yPercent: -3,
            filter: "blur(0px) brightness(185%)",
            duration: 0.16,
          },
          0
        )
        .to(
          manualText,
          {
            scale: 1,
            yPercent: 0,
            filter: "blur(0px) brightness(120%)",
            duration: 0.14,
          },
          0.16
        )
        .to(
          scanBlock,
          {
            autoAlpha: 1,
            duration: 0.02,
            ease: "none",
          },
          0.12
        )
        .to(
          scanBlock,
          {
            xPercent: 103,
            duration: 1.05,
            ease: "power1.inOut",
          },
          0.14
        )
        .to(
          fromText,
          {
            opacity: 0.76,
            xPercent: -4,
            duration: 0.72,
          },
          0.24
        )
        .to(
          toggle,
          {
            xPercent: 100,
            duration: 0.78,
          },
          0.24
        )
        .to(
          manualText,
          {
            opacity: 0.18,
            xPercent: -14,
            filter: "blur(4px) brightness(100%)",
            duration: 0.72,
          },
          0.24
        )
        .to(
          intelligentText,
          {
            opacity: 1,
            xPercent: 0,
            filter: "blur(0px)",
            duration: 0.72,
          },
          0.26
        )
        .to(
          scanBlock,
          {
            autoAlpha: 0,
            duration: 0.05,
            ease: "none",
          },
          1.18
        )
        .to(
          pieOverlay,
          {
            opacity: 1,
            scale: 1,
            duration: 0.2,
          },
          1.24
        )
        .to(
          leftStatusLines[0],
          {
            opacity: 0.2,
            yPercent: -22,
            duration: 0.14,
          },
          1.24
        )
        .to(
          leftStatusLines[1],
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.16,
          },
          1.3
        )
        .to(
          countPrimary,
          {
            yPercent: -75,
            duration: 0.22,
            ease: "power1.out",
          },
          1.24
        )
        .to(
          countSecondary,
          {
            yPercent: -66.666,
            duration: 0.22,
            ease: "power1.out",
          },
          1.28
        )
        .to(
          validationFailed,
          {
            opacity: 0,
            yPercent: -110,
            duration: 0.14,
          },
          1.32
        )
        .to(
          validationSuccess,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.14,
          },
          1.36
        )
        .to(
          validationBadge,
          {
            borderColor: "#229eff",
            backgroundColor: "#002b4d",
            duration: 0.14,
          },
          1.36
        )
        .to(
          chartFinal,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.22,
          },
          1.24
        );

      let scanIsPlaying = false;
      let revealPlayed = false;

      const triggerReveal = () => {
        if (revealPlayed) return;
        revealPlayed = true;
        revealSequence.restart();
      };

      const triggerScan = () => {
        if (scanIsPlaying) return;
        scanIsPlaying = true;
        if (!revealPlayed) {
          revealPlayed = true;
          revealSequence.progress(1).pause();
        }
        setRevealState();
        scanSequence.restart();
      };

      scanSequence.eventCallback("onComplete", () => {
        scanIsPlaying = false;
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        onEnter: ensurePanelsVisible,
        onEnterBack: ensurePanelsVisible,
      });

      ScrollTrigger.create({
        trigger: triggerOne,
        start: "top bottom",
        end: "bottom top",
        onEnter: triggerReveal,
        onEnterBack: triggerReveal,
        onLeaveBack: () => {
          scanIsPlaying = false;
          revealPlayed = false;
          manualLoop.pause(0);
          revealSequence.pause(0);
          scanSequence.pause(0);
          setInitialState();
        },
      });

      ScrollTrigger.create({
        trigger: triggerTwo,
        start: "top bottom",
        end: "bottom top",
        onEnter: triggerScan,
        onEnterBack: triggerScan,
        onLeaveBack: () => {
          scanIsPlaying = false;
          scanSequence.pause(0);
          setRevealState();
          manualLoop.restart(true);
        },
      });
    },
    { scope: sectionRef }
  );

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
                              <Image
                                src="/images/pie3.png"
                                alt="Dark blue quarter circle arc."
                                width={120}
                                height={120}
                                className="pie v1"
                              />
                              <Image
                                src="/images/pie0.png"
                                alt="Dark blue quarter circle ring."
                                width={120}
                                height={120}
                                className="pie v2"
                              />
                            </div>
                            <div className="wraper-block-image-lab">
                              <Image
                                src="/images/pie2.png"
                                alt="Dark blue quarter circle shape."
                                width={120}
                                height={120}
                                className="pie v3"
                              />
                              <Image
                                src="/images/pie1.png"
                                alt="Dark blue quarter circle arc."
                                width={120}
                                height={120}
                                className="pie v4"
                              />
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

                  <div className="wrapper-content-lab">
                    <div className="block-content-desc-lab v2">
                      <div className="content-desc-lab v2">
                        <div className="small-text animated-v2">Process Efficiency</div>
                        <div className="content-desc-labs v1">
                          <div className="number-counting">
                            <div className="medium-text animated-v1">
                              6
                              <br />
                              7
                              <br />
                              8
                              <br />
                              9
                            </div>
                            <div className="medium-text animated-v2">
                              7
                              <br />
                              8
                              <br />
                              9
                            </div>
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

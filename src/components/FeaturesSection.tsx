"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".content-feature");
      sections.forEach((section) => {
        const mask = section.querySelector<HTMLElement>(".radial-mask");
        const empty = section.querySelector<HTMLElement>(".circle-empty");
        const number = section.querySelector<HTMLElement>(".big-text");
        const thinBorder = section.querySelector<HTMLElement>(".wrapper-text-counting");

        if (!mask || !empty || !number || !thinBorder) return;

        gsap.set(mask, {
          rotate: 0,
          scale: 0.95,
          filter: "blur(6px)",
          opacity: 0.8,
          transformOrigin: "50% 50%",
        });
        gsap.set(thinBorder, { borderColor: "rgba(156,163,175,0.35)" });
        gsap.set(empty, { scale: 1, filter: "blur(10px)", opacity: 0.35 });
        gsap.set(number, { innerText: "0" });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        })
          .to(mask, { rotate: 360, ease: "none" }, 0)
          .to(mask, { scale: 1.05, filter: "blur(0px)", opacity: 1, ease: "none" }, 0)
          .to(thinBorder, { borderColor: "rgba(59,130,246,0.7)", ease: "none" }, 0)
          .to(empty, { scale: 1.15, filter: "blur(4px)", opacity: 0.55, ease: "none" }, 0)
          .to(
            number,
            { innerText: 100, snap: { innerText: 1 }, ease: "none" },
            0
          );
      });
    },
    { scope: container }
  );

  return (
    <section className="main-section" ref={container}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="wrapper-features">
          <div className="title-feature">
            <div className="wrapper-title-feature v1">
              <div className="block-title-feature v1">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <div className="wrapper-block-title-feature">
                <div className="block-title-feature v2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="line"></div>
                  ))}
                </div>
                <div className="medium-big-text enterence">The Features</div>
              </div>
              <div className="wrapper-scramble-product">
                <div className="scramble v1">RELIABLE</div>
              </div>
            </div>
            <div className="wrapper-title-feature v2">
              <div className="wrapper-subcontent-hero v5">
                <Image
                  src="/images/Circle_1Circle.png"
                  alt="Circle icon."
                  width={60}
                  height={60}
                  className="image-icon-hero"
                />
                <div className="text-subcontent-hero">
                  <div className="scramble v1 padding-left">SCALABLE</div>
                </div>
              </div>
              <div className="wrapper-subcontent-hero v4">
                <Image
                  src="/images/Square_1Square.png"
                  alt="Square icon."
                  width={60}
                  height={60}
                  className="image-icon-hero"
                />
                <div className="text-subcontent-hero">
                  <div className="scramble v1 padding-left">AUTOMATED</div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-feature">
            <div className="block-content-feature v1">
              <div className="wrapper-orbit">
                <div className="block-orbit v1"></div>
                <Image
                  src="/images/Orbit-1.png"
                  alt="Orbit diagram with orbital paths."
                  width={240}
                  height={240}
                  style={{ transform: "rotateZ(50deg)", filter: "brightness(200%)" }}
                  className="image-orbit v1"
                />
                <Image
                  src="/images/Orbit-1.png"
                  alt="Two small circles orbiting along two curved arcs."
                  width={240}
                  height={240}
                  style={{ transform: "rotateZ(0deg)" }}
                  className="image-orbit v2"
                />
                <Image
                  src="/images/Orbit-2.png"
                  alt="Two small circles orbiting opposite sides of a larger circle."
                  width={240}
                  height={240}
                  style={{ transform: "rotateZ(0deg)", filter: "brightness(300%)" }}
                  className="image-orbit v3"
                />
                <Image
                  src="/images/Orbit-3.png"
                  alt="Circular arrow loop indicating a continuous cycle."
                  width={240}
                  height={240}
                  style={{ transform: "rotateZ(30deg)" }}
                  className="image-orbit v4"
                />
              </div>
            </div>

            <div className="block-content-feature v2">
              <div className="wrapper-content-feature">
                <div className="wrapper-image-features">
                  <Image
                    src="/images/Futuristic-Device-Design.webp"
                    alt="Close-up of a sleek black electronic device."
                    width={240}
                    height={240}
                    className="image-features"
                  />
                </div>
                <div className="wrapper-image-desc-features">
                  <div className="small-text">Intelligent Automation</div>
                  <div className="text-secondary">
                    Smart workflows that adapt, execute, and optimize processes
                  </div>
                </div>
              </div>
              <div className="wrapper-content-features">
                <div className="wrapper-loop-text-feature">
                  <div className="small-text secondary animation-loop">EVOLVING</div>
                </div>
                <div className="wrapper-counting">
                  <Image
                    src="/images/Circle-Empty.png"
                    alt="Thin circle with tick marks."
                    width={240}
                    height={240}
                    className="circle-empty"
                  />
                  <div className="radial-mask">
                    <Image
                      src="/images/Circle-Fill.png"
                      alt="Circular clock face outline."
                      width={240}
                      height={240}
                      className="circle-progress"
                    />
                  </div>
                  <div className="wrapper-text-counting">
                    <div className="big-text counting">100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

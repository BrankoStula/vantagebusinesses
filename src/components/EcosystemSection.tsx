"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

const partners = [
  { src: "/images/logo-1.png", alt: "Logoipsum partner logo 1" },
  { src: "/images/logo-2.png", alt: "Logoipsum partner logo 2" },
  { src: "/images/logo-3.png", alt: "Logoipsum partner logo 3" },
  { src: "/images/logo-4.png", alt: "Logoipsum partner logo 4" },
  { src: "/images/logo-5.png", alt: "Logoipsum partner logo 5" },
  { src: "/images/logo-1.png", alt: "Logoipsum partner logo 1" },
  { src: "/images/logo-2.png", alt: "Logoipsum partner logo 2" },
  { src: "/images/logo-3.png", alt: "Logoipsum partner logo 3" },
  { src: "/images/logo-4.png", alt: "Logoipsum partner logo 4" },
  { src: "/images/logo-4.png", alt: "Logoipsum partner logo 4" },
];

export default function EcosystemSection() {
  return (
    <section className="main-section">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="wrapper-partner">
          <div className="title-partner">
            <div className="block-title-partner v1">
              <div className="small-text animation">Where Technology Meets Partnership</div>
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
                        width={120}
                        height={40}
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

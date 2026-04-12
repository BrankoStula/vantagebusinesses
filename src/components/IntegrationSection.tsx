import Image from "next/image";

const integrations = [
  { src: "/images/logoipsum-374.png", alt: "Stylized geometric logo with nested chevrons.", cls: "v1" },
  { src: "/images/logoipsum-376.png", alt: "Abstract symmetrical geometric shape.", cls: "v2" },
  { src: "/images/logoipsum-407.png", alt: "Abstract geometric logo forming a hexagonal pattern.", cls: "v3" },
  { src: "/images/logoipsum-411.png", alt: "Black star shape with trapezoid segments.", cls: "v4" },
  { src: "/images/logoipsum-368.png", alt: "Abstract black and white geometric shape.", cls: "v5" },
  { src: "/images/logoipsum-381.png", alt: "Abstract circular shape with diagonal slashes.", cls: "v6" },
  { src: "/images/logoipsum-386.png", alt: "Abstract geometric logo forming a stylized letter A.", cls: "v7" },
];

export default function IntegrationSection() {
  return (
    <section id="integration" className="tracks integration">
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="w-layout-blockcontainer main-container w-container">
            <div className="wrapper-integration">
              <div className="wrapper-content-integration">
                <div className="wrapper-title-integration">
                  <div className="badge">
                    <div className="scramble secondary">INTEGRATION</div>
                    <div className="block-title-workflow-animation">
                      <div className="text-secondary animated">-</div>
                      <div className="text-secondary animated">-</div>
                      <div className="text-secondary animated">-</div>
                    </div>
                    <div className="scramble v1">ACTIVE MODULES</div>
                  </div>
                </div>
                <div className="line-horizontal"></div>
                <div className="wrapper-title-integration">
                  <div className="text-looping-animation">
                    Connected Systems. Unified Intelligence.
                  </div>
                </div>
              </div>
              <div className="wrapper-icon-integration">
                {integrations.map((item) => (
                  <div key={item.cls} className={`icon-integration ${item.cls}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={60}
                      height={60}
                      className="image-icon-integration"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

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
  return (
    <section id="workflow" className="tracks workflow">
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
                    <div key={card.cls} className={`block-image-workflow ${card.cls}`}>
                      <Image
                        src="/images/Extrude-Workflow.png"
                        alt="3D black rounded rectangular block."
                        width={120}
                        height={120}
                      />
                      <Image
                        src={card.icon}
                        alt={card.alt}
                        width={40}
                        height={40}
                        className={`icon-workflow ${card.cls}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trigger-wrapper-v3">
        <div className="trigger-workflow v1"></div>
        <div className="trigger-workflow v2"></div>
        <div className="trigger-workflow v3"></div>
        <div className="trigger-workflow v4"></div>
      </div>
    </section>
  );
}

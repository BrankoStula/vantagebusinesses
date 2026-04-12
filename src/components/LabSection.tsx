import Image from "next/image";

export default function LabSection() {
  return (
    <section id="lab" className="tracks lab">
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

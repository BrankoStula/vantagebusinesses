import Image from "next/image";

export default function ProductSection() {
  return (
    <section id="product" className="tracks product">
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
                  {/* Step numbers */}
                  <div className="wrapper-content-product v1">
                    <div className="block-logo-circle-product">
                      {(["01", "02", "03", "04"] as const).map((num, i) => (
                        <div key={num} style={{ display: "contents" }}>
                          <div className={`logo-circle-product v${i + 1}`}>
                            <div className={`small-text secondary v${i + 1}`}>{num}<br /></div>
                          </div>
                          {i < 3 && <div className="circle-logo"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3D block images */}
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

                  {/* Labels */}
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

import Image from "next/image";

export default function Footer() {
  return (
    <>
      <section className="main-section fixed">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="wrapper-footer">
            <div className="block-footer">
              <div className="block-content-footer v2">
                <div className="wrapper-block-content-footer">
                  <div className="block-content-footers">
                    <div className="wrapper-block-menu-footer">
                      <div className="block-content-footers v1">
                        <div className="block-menu-footer">
                          <div className="block-title-menu-footer">
                            <div className="small-text text-dark">Explore</div>
                          </div>
                          <div className="block-content-menu-footer">
                            <a href="#product" className="link-menu w-inline-block">
                              <div className="text-secondary menu">Product</div>
                            </a>
                            <a href="#" className="link-menu w-inline-block">
                              <div className="text-secondary menu">Solutions</div>
                            </a>
                            <a href="#" className="link-menu w-inline-block">
                              <div className="text-secondary menu">Insights</div>
                            </a>
                            <a href="#lab" className="link-menu w-inline-block">
                              <div className="text-secondary menu">Lab</div>
                            </a>
                          </div>
                        </div>
                        <div className="block-menu-footer">
                          <div className="block-title-menu-footer">
                            <div className="small-text text-dark">Utilities</div>
                          </div>
                          <div className="block-content-menu-footer">
                            <a href="/utilities/style-guide" className="link-menu w-inline-block">
                              <div className="text-secondary menu">Style Guide</div>
                            </a>
                            <a href="/utilities/license" className="link-menu w-inline-block">
                              <div className="text-secondary menu">License</div>
                            </a>
                            <a href="/utilities/changelog" className="link-menu w-inline-block">
                              <div className="text-secondary menu">Change Log</div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="block-content-footers">
                    <div className="wrapper-block-menu-footer">
                      <div className="block-content-footers v2">
                        <div className="block-menu-footer v2">
                          <div className="block-title-menu-footer">
                            <div className="small-text text-dark">Say Hello</div>
                          </div>
                          <div className="block-content-menu-footer v2">
                            <div className="small-text text-secondary">hello@quantara.ai</div>
                          </div>
                        </div>
                        <div className="block-menu-footer v2">
                          <div className="block-title-menu-footer">
                            <div className="small-text text-dark">Contact Us</div>
                          </div>
                          <div className="block-content-menu-footer">
                            <div className="small-text text-secondary">(+123) 456 789</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="logo-footer">
                  <a href="#hero" className="w-inline-block">
                    <Image
                      src="/logo.svg"
                      alt="Vantage Business Solutions"
                      width={120}
                      height={32}
                      className="footer-logo-image"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact-anchor" className="wrapper-footer anchor"></section>
    </>
  );
}

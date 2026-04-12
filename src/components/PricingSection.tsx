"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PricingSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const buttons = container.current.querySelectorAll<HTMLElement>(".button-secondary");
      buttons.forEach((button) => {
        const text = button.querySelector<HTMLElement>(".scramble");
        if (!text) return;
        button.addEventListener("mouseenter", () => {
          gsap.to(text, { fontWeight: 600, duration: 0.25, ease: "power2.out" });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(text, { fontWeight: 300, duration: 0.15, ease: "power4.out" });
        });
      });
    },
    { scope: container }
  );

  return (
    <section className="main-section pricing" ref={container}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="wrapper-padding">
          <div className="wrapper-pricing">
            <div className="title-pricing">
              <div className="medium-big-text enterence">Access Intelligence. </div>
              <div className="medium-big-text muted">On Your Terms.</div>
            </div>
            <div className="content-pricing">
              <div className="block-card-pricing v1">
                <div className="title-card-pricing">
                  <div className="medium-text">AI Assistans</div>
                </div>
                <div className="block-body-card-pricing">
                  <div className="body-card-pricing v1">
                    <div className="small-text">Starter</div>
                    <div className="block-price-card">
                      <div className="large-text">Free</div>
                    </div>
                    <a href="#" className="button-secondary w-inline-block">
                      <div className="wrapper-button-secondary">
                        <div className="scramble secondary">GET STARTED</div>
                      </div>
                    </a>
                    <div className="small-text align-mobile">Key Features</div>
                    <ul role="list" className="list">
                      <li>Core AI workflow automation</li>
                      <li>Manual + assisted processing</li>
                      <li>Basic analytics &amp; reporting</li>
                      <li>Basic analytics &amp; Community support</li>
                    </ul>
                  </div>
                  <div className="body-card-pricing v2">
                    <div className="small-text">Growth</div>
                    <div className="block-price-card">
                      <div className="large-text">$29</div>
                      <div className="text-secondary">/ Month</div>
                    </div>
                    <a href="#" className="button-secondary w-inline-block">
                      <div className="wrapper-button-secondary">
                        <div className="scramble secondary">GET STARTED</div>
                      </div>
                    </a>
                    <div className="small-text align-mobile">Key Features</div>
                    <ul role="list" className="list">
                      <li>Advanced AI orchestration</li>
                      <li>Real-time analytics &amp; insights</li>
                      <li>Priority execution</li>
                      <li>Team collaboration</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="block-card-pricing v2">
                <div className="title-card-pricing">
                  <div className="medium-text">AI Agents</div>
                </div>
                <div className="body-card-pricing v3">
                  <div className="small-text">Premium</div>
                  <div className="block-price-card">
                    <div className="large-text">$99</div>
                    <div className="text-secondary">/ Month</div>
                  </div>
                  <a href="#" className="button-secondary w-inline-block">
                    <div className="wrapper-button-secondary">
                      <div className="scramble secondary">GET STARTED</div>
                    </div>
                  </a>
                  <div className="small-text align-mobile">Key Features</div>
                  <ul role="list" className="list">
                    <li>Fully autonomous AI workflows</li>
                    <li>Custom models &amp; integrations</li>
                    <li>Compliance &amp; enforcement logic</li>
                    <li>Dedicated support &amp; SLA</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

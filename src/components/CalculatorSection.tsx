"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonPrimary from "./ButtonPrimary";

gsap.registerPlugin(ScrollTrigger);

const formatGBP = (val: number) =>
  `£${Math.round(val).toLocaleString("en-GB")}`;

const calcProfit = (wastedHours: number) => wastedHours * 52 * 40;
const calcValuation = (profit: number) => profit * 5;

const INITIAL = { revenue: 5_000_000, teamSize: 50, wastedHours: 100 };

export default function CalculatorSection() {
  const [sliders, setSliders] = useState(INITIAL);

  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);
  const profitRef    = useRef<HTMLSpanElement>(null);
  const valuationRef = useRef<HTMLSpanElement>(null);
  const tlRef        = useRef<gsap.core.Timeline | null>(null);

  const proxyRef = useRef({
    profit:    calcProfit(INITIAL.wastedHours),
    valuation: calcValuation(calcProfit(INITIAL.wastedHours)),
  });

  // ── Entrance / exit animation ──────────────────────────────────────────────
  useGSAP(() => {
    const header = headerRef.current;
    const left   = leftRef.current;
    const right  = rightRef.current;
    if (!header || !left || !right) return;

    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    tl.from(header, { y: 50, autoAlpha: 0, duration: 0.8, ease: "power3.out" })
      .from(left,   { x: -70, autoAlpha: 0, duration: 0.75, ease: "power3.out" }, 0.15)
      .from(right,  { x:  70, autoAlpha: 0, duration: 0.75, ease: "power3.out" }, 0.15);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 78%",
      onEnter:     () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    return () => { tl.kill(); };
  }, { scope: sectionRef });

  // ── Flash glow on output numbers when value changes ────────────────────────
  const flashGlow = useCallback((el: HTMLSpanElement | null, color: string) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { textShadow: `0 0 2vw ${color}` },
      { textShadow: "0 0 0px transparent", duration: 0.9, ease: "power2.out", overwrite: "auto" }
    );
  }, []);

  // ── Animate output numbers via GSAP proxy ──────────────────────────────────
  const animateValues = useCallback((newProfit: number, newValuation: number) => {
    flashGlow(profitRef.current,    "rgba(255,255,255,0.6)");
    flashGlow(valuationRef.current, "rgba(34,158,255,0.7)");

    gsap.to(proxyRef.current, {
      profit:    newProfit,
      valuation: newValuation,
      duration:  0.75,
      ease:      "power2.out",
      overwrite: true,
      onUpdate() {
        if (profitRef.current)
          profitRef.current.textContent = formatGBP(proxyRef.current.profit);
        if (valuationRef.current)
          valuationRef.current.textContent = formatGBP(proxyRef.current.valuation);
      },
    });
  }, [flashGlow]);

  const handleChange = useCallback(
    (field: keyof typeof INITIAL, value: number) => {
      const next = { ...sliders, [field]: value };
      setSliders(next);
      const profit = calcProfit(next.wastedHours);
      animateValues(profit, calcValuation(profit));
    },
    [sliders, animateValues]
  );

  const initialProfit    = calcProfit(INITIAL.wastedHours);
  const initialValuation = calcValuation(initialProfit);

  return (
    <section id="calculator" className="main-section calculator" ref={sectionRef}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="wrapper-padding">

          {/* ── Section header ─────────────────────────────────── */}
          <div className="calc-section-header" ref={headerRef}>
            <div className="badge">
              <div className="scramble secondary">ROI CALCULATOR</div>
              <div className="block-title-workflow-animation">
                <div className="text-secondary animated">-</div>
                <div className="text-secondary animated">-</div>
                <div className="text-secondary animated">-</div>
              </div>
              <div className="scramble v1">PROFIT ANALYSIS</div>
            </div>
            <div className="medium-big-text calc-section-title">
              Find Your Profit Leak.
            </div>
            <div className="small-text text-secondary calc-section-subtitle">
              Drag the sliders to model the cost of operational inefficiency
              in your business.
            </div>
          </div>

          {/* ── Two-column calculator ────────────────────────── */}
          <div className="wrapper-calculator">

            {/* Left: Inputs */}
            <div className="calc-panel calc-panel--inputs" ref={leftRef}>
              <div className="calc-panel-inner">

                <div className="calc-panel-eyebrow">
                  <span className="calc-corner calc-corner--tl" />
                  <span className="scramble">INPUT VARIABLES</span>
                </div>

                <div className="calc-sliders">
                  <SliderField
                    label="Annual Revenue"
                    min={500_000}
                    max={50_000_000}
                    step={100_000}
                    value={sliders.revenue}
                    display={formatGBP(sliders.revenue)}
                    onChange={(v) => handleChange("revenue", v)}
                  />
                  <SliderField
                    label="Team Size"
                    min={5}
                    max={200}
                    step={1}
                    value={sliders.teamSize}
                    display={`${sliders.teamSize} employees`}
                    onChange={(v) => handleChange("teamSize", v)}
                  />
                  <SliderField
                    label="Wasted Manual Hours / Week"
                    min={10}
                    max={500}
                    step={5}
                    value={sliders.wastedHours}
                    display={`${sliders.wastedHours} hrs / wk`}
                    onChange={(v) => handleChange("wastedHours", v)}
                  />
                </div>

                <div className="calc-assumptions">
                  <div className="scramble">ASSUMPTIONS</div>
                  <ul className="calc-assumptions-list">
                    <li>£40 / hr average loaded employee cost</li>
                    <li>52 working weeks per year</li>
                    <li>5× conservative EBITDA multiple</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Right: Outputs */}
            <div className="calc-panel calc-panel--outputs" ref={rightRef}>
              <div className="calc-panel-inner">

                <div className="calc-output-block">
                  <div className="calc-output-label">
                    <span className="calc-dot" />
                    <span className="scramble">ANNUAL PROFIT LEAK</span>
                  </div>
                  <div className="calc-output-number">
                    <span ref={profitRef}>{formatGBP(initialProfit)}</span>
                  </div>
                  <div className="calc-output-bar" />
                  <div className="calc-output-hint small-text text-secondary">
                    Wasted hrs × 52 wks × £40 loaded cost
                  </div>
                </div>

                <div className="calc-divider" />

                <div className="calc-output-block">
                  <div className="calc-output-label">
                    <span className="calc-dot calc-dot--accent" />
                    <span className="scramble">VALUATION UPLIFT POTENTIAL</span>
                  </div>
                  <div className="calc-output-number calc-output-number--accent">
                    <span ref={valuationRef}>{formatGBP(initialValuation)}</span>
                  </div>
                  <div className="calc-output-bar calc-output-bar--accent" />
                  <div className="calc-output-hint small-text text-secondary">
                    5× EBITDA multiple on recovered profit
                  </div>
                </div>

                <div className="calc-cta-wrapper">
                  <ButtonPrimary href="#contact" label="Schedule a Call" />
                  <div className="small-text text-secondary calc-cta-note">
                    Free 30-min operational audit
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

// ── Slider sub-component ────────────────────────────────────────────────────
function SliderField({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="calc-slider-field">
      <div className="calc-slider-header">
        <div className="small-text calc-slider-label">{label}</div>
        <div className="calc-slider-value">{display}</div>
      </div>
      <div className="calc-slider-wrap">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className="calc-slider"
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

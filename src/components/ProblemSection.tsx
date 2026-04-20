"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STATS = [
  {
    stat: "30%",
    prefix: "Up to",
    body: "of work time is spent on repetitive, automatable tasks.",
    source: "McKinsey Global Institute",
    id: "s1",
  },
  {
    stat: "20–30%",
    prefix: "",
    body: "of annual revenue lost to internal inefficiencies.",
    source: "IDC Research",
    id: "s2",
  },
  {
    stat: "40%",
    prefix: "",
    body: "of an owner's time spent on non-revenue-generating work.",
    source: "Harvard Business Review",
    id: "s3",
  },
  {
    stat: "30%",
    prefix: "Up to",
    body: "reduction in operational costs achievable through automation.",
    source: "McKinsey Global Institute",
    id: "s4",
  },
];

const BULLETS = [
  "Inefficient processes",
  "Time spent on non-essential work",
  "Lack of scalable systems",
  "No clear understanding of valuation",
];

export default function ProblemSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const closingRef  = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const qa = <T extends Element>(sel: string) =>
      gsap.utils.toArray<T>(sel, section);

    // ── Left column entrance ───────────────────────────────────
    const headline = headlineRef.current;
    const body     = bodyRef.current;
    const closing  = closingRef.current;

    let splitHeadline: SplitText | null = null;

    if (headline) {
      splitHeadline = new SplitText(headline, { type: "words" });
      const words = splitHeadline.words as HTMLElement[];
      gsap.set(words, { opacity: 0, y: 28, filter: "blur(8px)" });

      gsap.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        stagger: { amount: 0.5, from: "start" },
        duration: 0.75, ease: "power3.out",
        scrollTrigger: {
          trigger: headline,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (body) {
      const items = body.querySelectorAll<HTMLElement>(".problem-body-line");
      gsap.set(items, { opacity: 0, x: -20 });
      gsap.to(items, {
        opacity: 1, x: 0,
        stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: {
          trigger: body,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (closing) {
      gsap.set(closing, { opacity: 0, y: 16 });
      gsap.to(closing, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: closing,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // ── Stat cards stagger in ──────────────────────────────────
    const cards = qa<HTMLElement>(".stat-card");
    cards.forEach((card) => {
      const stat   = card.querySelector<HTMLElement>(".stat-card-number");
      const label  = card.querySelector<HTMLElement>(".stat-card-body");
      const source = card.querySelector<HTMLElement>(".stat-card-source");

      gsap.set(card,   { opacity: 0, y: 56, filter: "blur(6px)" });
      gsap.set([label, source].filter(Boolean), { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(card, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" })
        .to(stat,   { opacity: 1, duration: 0.01 }, 0)
        .to([label, source].filter(Boolean), {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.45, ease: "power2.out",
        }, 0.18);
    });

    // ── Card hover ─────────────────────────────────────────────
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -4, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
    });

    return () => { splitHeadline?.revert(); };
  }, { scope: sectionRef });

  return (
    <section id="problem" className="main-section problem" ref={sectionRef}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="wrapper-padding">
          <div className="problem-layout">

            {/* ── Left: The Argument ─────────────────────────── */}
            <div className="problem-left">
              <div className="problem-left-inner">

                <div className="badge problem-badge">
                  <div className="scramble secondary">VALUATION ANALYSIS</div>
                  <div className="block-title-workflow-animation">
                    <div className="text-secondary animated">-</div>
                    <div className="text-secondary animated">-</div>
                    <div className="text-secondary animated">-</div>
                  </div>
                  <div className="scramble v1">MARKET DATA</div>
                </div>

                <h2 className="problem-headline" ref={headlineRef}>
                  Where Value Is Lost
                </h2>

                <div className="problem-body" ref={bodyRef}>
                  <p className="problem-body-line problem-intro">
                    Most business owners focus on revenue. Very few understand
                    what&apos;s quietly reducing the value of their business every day:
                  </p>
                  <ul className="problem-bullets">
                    {BULLETS.map((b) => (
                      <li key={b} className="problem-body-line problem-bullet">
                        <span className="problem-bullet-tick">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="problem-closing" ref={closingRef}>
                  These aren&apos;t operational issues.{" "}
                  <span className="problem-closing-accent">
                    They&apos;re valuation issues.
                  </span>
                </p>

              </div>
            </div>

            {/* ── Right: Stat Proof ──────────────────────────── */}
            <div className="problem-right">
              {STATS.map((s) => (
                <div key={s.id} className="stat-card">
                  <div className="stat-card-top">
                    {s.prefix && (
                      <span className="stat-card-prefix">{s.prefix}</span>
                    )}
                    <span className="stat-card-number">{s.stat}</span>
                  </div>
                  <p className="stat-card-body">{s.body}</p>
                  <div className="stat-card-source">
                    <span className="stat-card-source-line" />
                    <span className="stat-card-source-text">{s.source}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

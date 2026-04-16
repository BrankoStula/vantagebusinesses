"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

// Shared primary CTA hover: expand from the live cursor position and
// always return to center before collapsing on exit.
export default function ButtonPrimary({ href, label, className = "", onClick }: Props) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const bgBlobRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const bgWrap = bgWrapRef.current;
    const bgBlob = bgBlobRef.current;
    const textEl = textRef.current;
    if (!button || !bgWrap || !bgBlob || !textEl) return;

    gsap.set(bgWrap, { xPercent: 0, yPercent: 0 });
    gsap.set(bgBlob, { scale: 0 });

    const setX = gsap.quickSetter(bgWrap, "xPercent");
    const setY = gsap.quickSetter(bgWrap, "yPercent");

    const setBgPosition = (clientX: number, clientY: number) => {
      const rect = button.getBoundingClientRect();
      const xPct = (clientX - rect.left) / rect.width;
      const yPct = (clientY - rect.top) / rect.height;
      const xPercent = (xPct - 0.5) * 125;
      const yPercent = (yPct - 0.5) * 125;

      setX(xPercent);
      setY(yPercent);
    };

    const onMouseMove = (e: MouseEvent) => {
      gsap.killTweensOf(bgWrap);
      setBgPosition(e.clientX, e.clientY);
    };

    const onMouseEnter = (e: MouseEvent) => {
      gsap.killTweensOf([bgWrap, bgBlob, textEl]);
      setBgPosition(e.clientX, e.clientY);

      gsap.to(bgBlob, {
        scale: 2.2,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(textEl, {
        color: "#ffffff",
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onMouseLeave = () => {
      gsap.killTweensOf([bgWrap, bgBlob, textEl]);

      gsap.to(bgWrap, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(bgBlob, {
        scale: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(textEl, {
        color: "#002b4d",
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: buttonRef });

  return (
    <Link
      href={href}
      ref={buttonRef}
      className={`button-primary w-inline-block${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <div className="wrapper-button-primary">
        <div className="wrapper-button-primary-text">
          <div ref={textRef} className="text-menu">{label}</div>
        </div>
        <div ref={bgWrapRef} className="wrapper-button-primary-bg">
          <div ref={bgBlobRef} className="bg-button-primary"></div>
        </div>
      </div>
    </Link>
  );
}

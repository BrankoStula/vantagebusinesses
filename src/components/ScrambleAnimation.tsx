"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

export default function ScrambleAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrambleTextPlugin);

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(".scramble.v1", {
      duration: 1.2,
      scrambleText: { text: "{original}", chars: "+?84564XERS", speed: 0.6 },
    })
      .to(
        ".scramble.v2",
        {
          duration: 1.6,
          scrambleText: { text: "{original}", chars: "+?84564XERS", speed: 0.7 },
        },
        "-=0.6"
      )
      .to(
        ".scramble.v3",
        {
          duration: 2.1,
          scrambleText: { text: "{original}", chars: "+?84564XERS", speed: 0.8 },
        },
        "-=0.8"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return null;
}

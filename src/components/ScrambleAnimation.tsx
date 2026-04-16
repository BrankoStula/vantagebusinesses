"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Register at module level — runs before any hooks, no risk of running
// after a useGSAP that tries to use ScrambleText on its first tick
gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambleAnimation() {
  useEffect(() => {

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

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageScaleSection() {
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      
      {/* IMAGE SECTION */}
      <div className="image-wrapper">
        <div ref={imageRef} className="image" />
      </div>
    </>
  );
}

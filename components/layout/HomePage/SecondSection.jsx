"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FantaPage() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline 1 – hero → section two
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-two",
          start: "0% 95%",
          end: "70% 50%",
          scrub: true,
          // markers: true,
        },
      });

      // Chair first movement (hero se nikal ke section-two ki taraf)
      tl.to(
        "#chair",
        {
          top: "120%",
          left: "10%",
          scale: 0.9,
          width: "26%",
        },
        "chair"
      );

      // Timeline 2 – section three par final position
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-three",
          start: "0% 95%",
          end: "20% 50%",
          scrub: true,
          // markers: true,
        },
      });

      tl2.to(
        "#chair",
        {
          top: "223%",
          left: "44%",
          scale: 1.1,
          width: "12%",
          //   rotation: 360,
        },
        "chair-final"
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const sectionThreeRef = useRef(null);

  useEffect(() => {
    if (!sectionThreeRef.current) return;

    const resetCards = () => {
      gsap.to(".card-left", { x: 0, opacity: 0, duration: 0.4 });
      gsap.to(".card-right", { x: 0, opacity: 0, duration: 0.4 });
      gsap.set(".card-center", { zIndex: 0, opacity: 1 });
    };

    resetCards();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          gsap.to(".card-left", {
            x: "-28vw",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(".card-right", {
            x: "28vw",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          resetCards();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionThreeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="main" className="w-full text-[#3a3027] ">

      {/* <div className="manufacturing-unit">
          <img id="assembly-unit"
            src="/Assembly-unit.png"
            alt="Assembly Unit"></img>
        </div> */}

      {/* SECTION ONE – HERO WITH CHAIR */}
      <section className="section-one relative flex h-screen w-full items-center justify-center">
       
        {/* Background line top (optional) */}
        {/* <div className="absolute top-[12vh] left-0 right-0 mx-[6vw] h-px bg-[#3a3027]/40" /> */}

        {/* Text on right like Scandinavian example */}
        <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 max-w-[28vw] text-right">
          <p className="text-[14px] italic text-[#3a3027]/70">
            1970&apos;s inspired
          </p>
          <h1 className="mt-2 text-[3vw] leading-[1.05] tracking-[0.08em] font-semibold uppercase">
            Scandinavian
            <span className="block">Minimalism</span>
          </h1>
          <p className="mt-5 text-[0.9vw] text-[#3a3027]/80">
            Dummy copy about ThirteenThirty – carefully crafted lounge chairs
            and sofas, designed with warm tones and a calm, gallery-like
            presence.
          </p>
        </div>

        {/* Center + left images (dummy blocks like reference) */}
        <div className="absolute left-[6vw] flex w-[40vw] gap-[2vw]">
          <div className="flex-1 flex flex-col gap-4">

            <p className="h-px w-full bg-[#3a3027]/40" />
            <p className="text-[0.8vw] leading-relaxed">
              Part chair, part work of craft art. This layout is just dummy
              content to match the Scandinavian reference.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4">
          </div>
        </div>

        {/* SCROLLING CHAIR – this replaces Fanta can */}
        <img
          id="chair"
          src="/sky-chair.png"
          alt="Chair"
          className="absolute z-[3] w-[26%]"
        />
      </section>

      {/* SECTION TWO – STORY COPY */}
      <section className="section-two flex h-screen w-full">
        {/* LEFT */}
        <div className="flex h-full w-1/2 flex-col items-start justify-center gap-[3vh] pr-[8vw] pl-8" >
          <div className="aspect-[4/3] w-full rounded-[32px]" />
          {/* <p className="text-[0.9vw] leading-relaxed text-[#3a3027]/80">
            Another dummy visual block for process / workshop / detail image.
            Real images can be wired later once client gives final content.
          </p> */}
        </div>


        {/* RIGHT */}
        <div className="flex h-full w-1/2 flex-col items-start justify-center gap-[3vh] pl-[8vw] pr-[4vw]">
          <h2 className="text-[2.6vw] leading-tight">
            Crafted for slow,
            <br />
            thoughtful spaces.
          </h2>
          <p className="w-[80%] text-[0.95vw] leading-relaxed text-[#3a3027]/85">
            Lorem ipsum dummy text for ThirteenThirty. Explain material story,
            handcrafted wood, fabric selection, and how each piece is designed
            like a sculpture. This section is static – hero chair image scroll
            hote-hote yahan tak aa chuka hoga.
          </p>
        </div>
      </section>


      {/* SECTION THREE – SIMPLE CARDS */}
      <section ref={sectionThreeRef} className="section-three relative flex h-screen w-full items-center justify-center ">
        <div className="relative h-[65vh] w-[80vw]">

          {/* Card 1 */}
          <div className="card card-left absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="img-box w-full aspect-[4/3] rounded-[20px] relative">
              <Image
                src="/Arc-1.png"      // <- your image path
                alt="Chair"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="mt-6 text-[1.5vw]">Lounge Chair 01</h3>
              <p className="mt-2 text-[0.85vw] text-[#3a3027]/80">
                A relaxed lounge chair with soft edges and warm upholstery.
              </p>
            </div>
            <button className="mt-4 rounded-full bg-[#384F37] px-[20px] py-[10px] text-[0.85vw] text-[#fff]">
              View details
            </button>
          </div>

          {/* Card 2 */}
          <div className="card card-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full aspect-[4/3] rounded-[20px]" />
            <div>
              <h3 className="mt-6 text-[1.5vw]">Reading Chair</h3>
              <p className="mt-2 text-[0.85vw] text-[#3a3027]/80">
                Designed for long evenings with a book, calm and supportive.
              </p>
            </div>
            <button className="mt-4 rounded-full bg-[#384F37] px-[20px] py-[10px] text-[0.85vw] text-[#fff]">
              View details
            </button>
          </div>

          {/* Card 3 */}
          <div className="card card-right absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full aspect-[4/3] rounded-[20px] relative">
              <Image
                src="/Orbit-1.png"      // <- your image path
                alt="Chair"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="mt-6 text-[1.5vw]">Accent Chair</h3>
              <p className="mt-2 text-[0.85vw] text-[#3a3027]/80">
                A sculptural accent piece to anchor living spaces.
              </p>
            </div>
            <button className="mt-4 rounded-full bg-[#384F37] px-[20px] py-[10px] text-[0.85vw] text-[#fff]">
              View details
            </button>
          </div>
        </div>
      </section>

       
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";


export default function ThirteenCarousel() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const autoNextTimeoutRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const TIME_RUNNING = 1200; // matches CSS --transition-time (1.2s)
  const TIME_AUTO_NEXT = 3500; // auto-advance interval (ms)

  // restart the top runningTime animation by setting inline style
  function resetAnimation(runningEl) {
    if (!runningEl) return;
    runningEl.style.animation = "none";
    // force reflow to restart animation
    // eslint-disable-next-line no-unused-expressions
    runningEl.offsetHeight;
    runningEl.style.animation = `runningTime ${TIME_AUTO_NEXT / 1000}s linear forwards`;
  }

  // consistent function: returns current slider items in DOM order
  function getSliderItems() {
    if (!listRef.current) return [];
    return Array.from(listRef.current.querySelectorAll(".item"));
  }

  // Compute active element consistently:
  // Prefer sliderItems[1] if exists (this matches CSS where
  // nth-child(1) and nth-child(2) act as hero panels). Fallback to [0].
  function getActiveItemElement(sliderItems) {
    if (!sliderItems || sliderItems.length === 0) return null;
    return sliderItems[1] || sliderItems[0];
  }

  // Update the slide-number element (reuse single element, do not re-create)
  function updateSlideNumber(sliderItems) {
    const arrows = carouselRef.current?.querySelector(".arrows");
    if (!arrows) return;

    let slideNumberEl = arrows.querySelector(".slide-number");
    if (!slideNumberEl) {
      slideNumberEl = document.createElement("div");
      slideNumberEl.className = "slide-number";
      arrows.appendChild(slideNumberEl);
    }

    const activeEl = getActiveItemElement(sliderItems);
    if (!activeEl) {
      slideNumberEl.textContent = "";
      return;
    }
    const dataItem = activeEl.querySelector(".title")?.getAttribute("data-item");
    const activeIndex = dataItem ? Number(dataItem) : sliderItems.indexOf(activeEl) + 1;
    const padded = activeIndex < 10 ? `0${activeIndex}` : `${activeIndex}`;
    slideNumberEl.textContent = `${padded}/${sliderItems.length}`;
  }

  // main after-change handler
  function afterSlideChange() {
    const sliderItems = getSliderItems();
    updateSlideNumber(sliderItems);

    // restart auto timers and top running bar
    resetCarouselState();
  }

  function resetCarouselState() {
    // clear existing timeouts
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }

    // remove transition classes after TIME_RUNNING
    if (carouselRef.current) {
      transitionTimeoutRef.current = setTimeout(() => {
        carouselRef.current.classList.remove("next");
        carouselRef.current.classList.remove("prev");
        transitionTimeoutRef.current = null;
      }, TIME_RUNNING);
    }

    // schedule auto next
    autoNextTimeoutRef.current = setTimeout(() => {
      const nextBtn = carouselRef.current?.querySelector(".next");
      // trigger auto next by calling handler directly
      handleSliderNavigation("next");
    }, TIME_AUTO_NEXT);

    // restart the runningTime animation bar
    const runningEl = carouselRef.current?.querySelector(".carousel .timeRunning") || carouselRef.current?.querySelector(".timeRunning");
    resetAnimation(runningEl);
  }

  // handle DOM reorder navigation (next/prev)
  function handleSliderNavigation(direction) {
    if (!listRef.current || !carouselRef.current) return;

    const sliderItems = listRef.current.querySelectorAll(".item");
    if (!sliderItems || sliderItems.length === 0) return;

    if (direction === "next") {
      // move first item to the end
      listRef.current.appendChild(sliderItems[0]);
      carouselRef.current.classList.add("next");
    } else if (direction === "prev") {
      // move last item to the start
      listRef.current.prepend(sliderItems[sliderItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    // ensure we update UI now
    afterSlideChange();
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    const list = listRef.current;
    if (!carousel || !list) return;

    // add data-item attributes (1-based) to titles
    const items = Array.from(list.querySelectorAll(".item"));
    items.forEach((item, idx) => {
      const titleEl = item.querySelector(".title");
      if (titleEl) titleEl.setAttribute("data-item", (idx + 1).toString());
    });

    // wire buttons
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");
    const runningEl = carousel.querySelector(".timeRunning");

    function onNextClick(e) {
      e?.preventDefault();
      // stop any existing timeouts
      if (autoNextTimeoutRef.current) {
        clearTimeout(autoNextTimeoutRef.current);
        autoNextTimeoutRef.current = null;
      }
      handleSliderNavigation("next");
    }
    function onPrevClick(e) {
      e?.preventDefault();
      if (autoNextTimeoutRef.current) {
        clearTimeout(autoNextTimeoutRef.current);
        autoNextTimeoutRef.current = null;
      }
      handleSliderNavigation("prev");
    }

    nextBtn?.addEventListener("click", onNextClick);
    prevBtn?.addEventListener("click", onPrevClick);

    // init slide-number and running animation
    updateSlideNumber(getSliderItems());
    resetAnimation(runningEl);

    // start auto next
    autoNextTimeoutRef.current = setTimeout(() => {
      handleSliderNavigation("next");
    }, TIME_AUTO_NEXT);

    // cleanup on unmount
    return () => {
      nextBtn?.removeEventListener("click", onNextClick);
      prevBtn?.removeEventListener("click", onPrevClick);
      if (autoNextTimeoutRef.current) {
        clearTimeout(autoNextTimeoutRef.current);
        autoNextTimeoutRef.current = null;
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // The JSX below mirrors your original structure.
  return (
    <div ref={carouselRef} className="carousel">
      <div className="list" ref={listRef}>
        <div
          className="item"
          style={{
            backgroundImage:
              "url(/slider1.jpg)",
          }}
        >
          <div className="content">
            <div className="title">SUNRISE ON PEAKS</div>
            <div className="name">Sunrise</div>
            <div className="des">
              Witness the serene beauty of the sunrise over majestic mountain
              peaks. A moment of pure tranquility.
            </div>
          </div>
        </div>

        <div
          className="item"
          style={{
            backgroundImage:
              "url(/slider2.webp)",
          }}
        >
          <div className="content">
            <div className="title">RUGGED ROCKS</div>
            <div className="name">Rocky</div>
            <div className="des">
              Explore the rugged beauty of barren rocky mountains. A testament
              to nature's raw power.
            </div>
          </div>
        </div>

        <div
          className="item"
          style={{
            backgroundImage:
              "url(/slider3.jpg)",
          }}
        >
          <div className="content">
            <div className="title">FOREST PATHWAY</div>
            <div className="name">Forest</div>
            <div className="des">
              A peaceful trail through dense green forests. Perfect for
              reconnecting with nature.
            </div>
          </div>
        </div>

        <div
          className="item"
          style={{
            backgroundImage:
              "url(/slider4.jpg)",
          }}
        >
          <div className="content">
            <div className="title">COLORFUL MEADOW</div>
            <div className="name">Meadow</div>
            <div className="des">
              A colorful meadow filled with butterflies and blooming flowers.
              Nature at its best.
            </div>
          </div>
        </div>

        <div
          className="item"
          style={{
            backgroundImage:
              "url(/slider5.jpg)",
          }}
        >
          <div className="content">
            <div className="title">SERENE LAKE</div>
            <div className="name">Lake</div>
            <div className="des">
              A calm and serene lake surrounded by towering trees and
              mountains. A perfect escape.
            </div>
          </div>
        </div>

        <div
          className="item"
          style={{
            backgroundImage:
              "url(/slider6.jpg)",
          }}
        >
          <div className="content">
            <div className="title">PEAKS IN THE CLOUDS</div>
            <div className="name">Clouds</div>
            <div className="des">
              Mountain peaks wrapped in clouds. A dreamy sight that inspires
              awe and wonder.
            </div>
          </div>
        </div>
        
      </div>

      <div className="arrows">
        <button className="prev" aria-label="previous">
          ‹
        </button>
        <button className="next" aria-label="next">
          ›
        </button>
        {/* slide-number is created/updated by JS */}
      </div>

      {/* <div className="timeRunning" aria-hidden="true" /> */}
    </div>
  );
}

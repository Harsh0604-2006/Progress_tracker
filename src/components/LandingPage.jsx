import React, { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";


import { motion } from "framer-motion";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import "./navbar.css";
import "./DotGrid.css";
import "./intro.css";

gsap.registerPlugin(InertiaPlugin);

// DotGrid component
const DotGrid = ({
  dotSize = 5,
  gap = 28,
  baseColor = "#00d8ff",
  activeColor = "#00d8ff",
  proximity = 200,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}) => {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const centresRef = useRef([]);

  const buildGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    dotsRef.current = [];
    centresRef.current = [];

    const { clientWidth: w, clientHeight: h } = container;
    const cols = Math.floor((w + gap) / (dotSize + gap));
    const rows = Math.floor((h + gap) / (dotSize + gap));
    const total = cols * rows;

    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot-grid__dot");
      dot._inertiaApplied = false;

      gsap.set(dot, { x: 0, y: 0, backgroundColor: baseColor });
      container.appendChild(dot);
      dotsRef.current.push(dot);
    }

    requestAnimationFrame(() => {
      centresRef.current = dotsRef.current.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          x: r.left + window.scrollX + r.width / 2,
          y: r.top + window.scrollY + r.height / 2,
        };
      });
    });
  }, [dotSize, gap, baseColor]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e) => {
      const now = performance.now();
      const dt = now - (lastTime || now);
      const dx = e.pageX - lastX;
      const dy = e.pageY - lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      lastTime = now;
      lastX = e.pageX;
      lastY = e.pageY;

      requestAnimationFrame(() => {
        centresRef.current.forEach(({ el, x, y }) => {
          const dist = Math.hypot(x - e.pageX, y - e.pageY);
          const interp = Math.max(0, 1 - dist / proximity);
          gsap.set(el, {
            backgroundColor: gsap.utils.interpolate(baseColor, activeColor, interp),
          });

          if (speed > speedTrigger && dist < proximity && !el._inertiaApplied) {
            el._inertiaApplied = true;
            const pushX = x - e.pageX + vx * 0.005;
            const pushY = y - e.pageY + vy * 0.005;

            gsap.to(el, {
              inertia: { x: pushX, y: pushY, resistance },
              onComplete: () => {
                gsap.to(el, {
                  x: 0,
                  y: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                el._inertiaApplied = false;
              },
            });
          }
        });
      });
    };

    const onClick = (e) => {
      centresRef.current.forEach(({ el, x, y }) => {
        const dist = Math.hypot(x - e.pageX, y - e.pageY);
        if (dist < shockRadius && !el._inertiaApplied) {
          el._inertiaApplied = true;
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (x - e.pageX) * shockStrength * falloff;
          const pushY = (y - e.pageY) * shockStrength * falloff;

          gsap.to(el, {
            inertia: { x: pushX, y: pushY, resistance },
            onComplete: () => {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              el._inertiaApplied = false;
            },
          });
        }
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, [
    baseColor,
    activeColor,
    proximity,
    speedTrigger,
    shockRadius,
    shockStrength,
    maxSpeed,
    resistance,
    returnDuration,
  ]);

  return (
    <section
      className={`dot-grid ${className}`}
      style={{
        ...style,
        "--dot-size": `${dotSize}px`,
        "--dot-gap": `${gap}px`,
      }}
    >
      <div className="dot-grid__wrap">
        <div ref={containerRef} className="dot-grid__container" />
      </div>
    </section>
  );
};
function NavBar(){

return(
<>
<div className="navclass">
  <a href="/">Home</a>
  <a href="/login">Login</a>
  <a href="/register">Register</a>
  <a href="/profile">Profile</a>
  </div>
  </>
);
}
const Introduction = ({

  sentence = "Hi there! qwert",

  manualMode = false,

  blurAmount = 5,

  borderColor = "rgb(0,216,255)",

  glowColor = "rgba(0, 255, 0, 0.6)",

  animationDuration = 0.5,

  pauseBetweenAnimations = 1,

}) => {

  const words = sentence.split(" ");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [lastActiveIndex, setLastActiveIndex] = useState(null);

  const containerRef = useRef(null);

  const wordRefs = useRef([]);

  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });


  useEffect(() => {

    if (!manualMode) {

      const interval = setInterval(() => {

        setCurrentIndex((prev) => (prev + 1) % words.length);

      }, (animationDuration + pauseBetweenAnimations) * 1000);


      return () => clearInterval(interval);

    }

  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);


  useEffect(() => {

    if (currentIndex === null || currentIndex === -1) return;


    if (!wordRefs.current[currentIndex] || !containerRef.current) return;


    const parentRect = containerRef.current.getBoundingClientRect();

    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();


    setFocusRect({

      x: activeRect.left - parentRect.left,

      y: activeRect.top - parentRect.top,

      width: activeRect.width,

      height: activeRect.height,

    });

  }, [currentIndex, words.length]);


  // Handlers for manual mode (hover)

  const handleMouseEnter = (index) => {

    if (manualMode) {

      setLastActiveIndex(index);

      setCurrentIndex(index);

    }

  };


  const handleMouseLeave = () => {

    if (manualMode) {

      setCurrentIndex(lastActiveIndex);

    }

  };


  return (
    <div className="parent-container">

    <div className="focus-container" ref={containerRef}>

      {words.map((word, index) => {

        const isActive = index === currentIndex;

        return (

          <span

            key={index}

            ref={(el) => (wordRefs.current[index] = el)}

            className={`focus-word ${manualMode ? "manual" : ""} ${isActive && !manualMode ? "active" : ""

              }`}

            style={{

              filter:

                manualMode

                  ? isActive

                    ? `blur(0px)`

                    : `blur(${blurAmount}px)`

                  : isActive

                    ? `blur(0px)`

                    : `blur(${blurAmount}px)`,

              "--border-color": borderColor,

              "--glow-color": glowColor,

              transition: `filter ${animationDuration}s ease`,

            }}

            onMouseEnter={() => handleMouseEnter(index)}

            onMouseLeave={handleMouseLeave}

          >

            {word}

          </span>

        );

      })}


      <motion.div

        className="focus-frame"

        animate={{

          x: focusRect.x,

          y: focusRect.y,

          width: focusRect.width,

          height: focusRect.height,

          opacity: currentIndex >= 0 ? 1 : 0,

        }}

        transition={{

          duration: animationDuration,

        }}

        style={{

          "--border-color": borderColor,

          "--glow-color": glowColor,

        }}

      >

        <span className="corner top-left"></span>

        <span className="corner top-right"></span>

        <span className="corner bottom-left"></span>

        <span className="corner bottom-right"></span>

      </motion.div>
</div>
   </div>

  );

};
export {DotGrid,NavBar,Introduction};

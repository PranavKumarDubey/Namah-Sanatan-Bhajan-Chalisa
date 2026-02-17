// SpiritualLoader.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./spiritualLoader.css";

export default function SpiritualLoader() {
  const loaderRef = useRef(null);
  const lotusRef = useRef(null);
  const omRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lotus rotation
      gsap.to(lotusRef.current, {
        rotation: 360,
        duration: 15,
        ease: "none",
        repeat: -1,
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Om breathing effect
      gsap.to(omRef.current, {
        scale: 1.05,
        duration: 2.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Particles floating
      particlesRef.current.forEach((particle, index) => {
        gsap.to(particle, {
          y: -30,
          opacity: 0,
          duration: 3,
          ease: "power1.out",
          repeat: -1,
          delay: index * 0.3,
        });
      });

      // Initial entrance
      gsap.from(lotusRef.current, {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.from(omRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(2)",
        delay: 0.5,
      });

    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="spiritual-loader" ref={loaderRef}>
      {/* Background glow */}
      <div className="bg-glow" ref={glowRef}></div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            left: `${50 + Math.cos((i * Math.PI * 2) / 12) * 40}%`,
            top: `${50 + Math.sin((i * Math.PI * 2) / 12) * 40}%`,
          }}
        ></div>
      ))}

      {/* Lotus with CENTER CIRCLE CUT OUT */}
      <div className="lotus-container" ref={lotusRef}>
        <svg viewBox="0 0 300 300" className="lotus-svg">
          {/* Mask to create center hole */}
          <defs>
            <mask id="centerHole">
              {/* White = visible, Black = transparent */}
              <rect x="0" y="0" width="300" height="300" fill="white" />
              {/* Center circle cutout - BLACK = hole */}
              <circle cx="150" cy="150" r="65" fill="black" />
            </mask>
          </defs>

          {/* All petals with mask applied */}
          <g mask="url(#centerHole)">
            {/* Outer petals */}
            <g className="petal-layer outer-petals">
              {[...Array(8)].map((_, i) => (
                <path
                  key={i}
                  className="petal outer"
                  d="M150,150 Q130,100 150,50 Q170,100 150,150 Z"
                  transform={`rotate(${i * 45} 150 150)`}
                />
              ))}
            </g>

            {/* Middle petals */}
            <g className="petal-layer middle-petals">
              {[...Array(8)].map((_, i) => (
                <path
                  key={i}
                  className="petal middle"
                  d="M150,150 Q135,110 150,70 Q165,110 150,150 Z"
                  transform={`rotate(${i * 45 + 22.5} 150 150)`}
                />
              ))}
            </g>

            {/* Inner petals */}
            <g className="petal-layer inner-petals">
              {[...Array(8)].map((_, i) => (
                <path
                  key={i}
                  className="petal inner"
                  d="M150,150 Q140,120 150,90 Q160,120 150,150 Z"
                  transform={`rotate(${i * 45} 150 150)`}
                />
              ))}
            </g>
          </g>

          {/* Optional: Subtle border around center circle */}
          <circle 
            cx="150" 
            cy="150" 
            r="65" 
            fill="none" 
            stroke="rgba(255, 200, 0, 0.2)" 
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Om Symbol - IN THE CENTER HOLE */}
      <div className="om-symbol" ref={omRef}>
        ॐ
      </div>
    </div>
  );
}
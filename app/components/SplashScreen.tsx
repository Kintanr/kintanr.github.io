'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FINAL_TEXT = 'KINTAN UMARI';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}—=+*^?#';

export default function SplitScrambleHero() {
  const fullTextRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const memberRef = useRef<HTMLSpanElement>(null);

  const [showSplash, setShowSplash] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 300;

    const scramble = () => {
      frame++;

      const revealCount = Math.floor((frame / totalFrames) * FINAL_TEXT.length);
      console.log(FINAL_TEXT.length, revealCount);

      let output = '';

      for (let i = 0; i < FINAL_TEXT.length; i++) {
        output += i < revealCount ? FINAL_TEXT[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }

      if (fullTextRef.current) {
        fullTextRef.current.innerText = output;
      }

      if (frame >= totalFrames) {
        gsap.ticker.remove(scramble);

        fullTextRef.current!.style.display = 'none';
        leftRef.current!.style.opacity = '1';
        rightRef.current!.style.opacity = '1';

        startSplit();
      }
    };

    const startSplit = () => {
      gsap
        .timeline({
          onComplete: () => {
            gsap.delayedCall(3, () => {
              if (containerRef.current) {
                gsap.to(containerRef.current, {
                  opacity: 0,
                  scale: 0.95,
                  duration: 0.6,
                  ease: 'power2.inOut',
                  onComplete: () => setShowSplash(false),
                });
              }
            });
          },
        })

        // SPLIT + MEMBER START TOGETHER
        .to(
          leftRef.current,
          {
            xPercent: -120,
            duration: 1.4,
            ease: 'power3.inOut',
          },
          '<+=0.5'
        )
        .to(
          rightRef.current,
          {
            xPercent: 120,
            duration: 1.4,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          memberRef.current,
          {
            opacity: 1,
            letterSpacing: '0.45em',
            duration: 1.4,
            ease: 'power2.out',
          },
          '<+=0.3'
        );
    };

    gsap.ticker.add(scramble);
    return () => gsap.ticker.remove(scramble);
  }, []);

  if (!showSplash) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* SCRAMBLE TEXT */}
      <h1
        ref={fullTextRef}
        className="absolute text-4xl font-semibold tracking-wide text-white md:text-6xl"
      >
        {FINAL_TEXT}
        <span></span>
      </h1>

      {/* SPLIT TEXT */}
      <h1 className="flex text-4xl font-semibold tracking-wide text-white md:text-6xl">
        <span ref={leftRef} className="inline-block opacity-0 will-change-transform">
          KINTAN
        </span>
        <span className="mx-2" />
        <span ref={rightRef} className="inline-block opacity-0 will-change-transform">
          UMARI
        </span>
      </h1>

      {/* MEMBER */}
      <span
        ref={memberRef}
        className="absolute text-xs font-medium tracking-[-0.5em] text-white opacity-0 md:text-sm"
      >
        MEMBER
      </span>
    </div>
  );
}

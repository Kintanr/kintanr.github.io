'use client';

import { useRef, useEffect, useState } from 'react';

type Props = {
  text: string;
  active?: boolean;
  progress?: number;
};

export default function ScrollRevealText({ text, active: propActive = false, progress }: Props) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [active, setActive] = useState(propActive);
  const [localProgress, setLocalProgress] = useState(0); // 0..1 progress for reveal
  const [displayProgress, setDisplayProgress] = useState(0);
  const displayProgressRef = useRef(0);

  const effectiveProgress = progress !== undefined ? progress : localProgress;

  useEffect(() => {
    setActive(propActive);
  }, [propActive]);

  useEffect(() => {
    displayProgressRef.current = effectiveProgress;
    setDisplayProgress(effectiveProgress);
  }, [effectiveProgress]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const current = displayProgressRef.current;
      const target = effectiveProgress;
      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        displayProgressRef.current = target;
        setDisplayProgress(target);
        return;
      }
      const next = current + diff * 0.18;
      displayProgressRef.current = next;
      setDisplayProgress(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [effectiveProgress]);

  useEffect(() => {
    if (progress !== undefined) return;
    let ticking = false;
    const getScrollParent = (el: Element | null): Element | Window => {
      let parent = el?.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        const overflowY = style.overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') return parent;
        parent = parent.parentElement;
      }
      return window;
    };

    const handleFrame = (scrollContainer: HTMLElement | Window) => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (!ref.current) {
          ticking = false;
          return;
        }
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight =
          scrollContainer === window
            ? window.innerHeight
            : (scrollContainer as HTMLElement).clientHeight;
        // Map progress so that when element top is at viewport bottom -> 0,
        // and when element bottom has scrolled past viewport top -> 1.
        const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const clamped = Math.max(0, Math.min(1, raw));
        setLocalProgress(clamped);

        // also set simple active flag when any part visible
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        setActive(isVisible);
        ticking = false;
      });
    };

    const scrollContainer = getScrollParent(ref.current);
    const onScroll = () => handleFrame(scrollContainer as any);

    if (scrollContainer === window) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    } else {
      (scrollContainer as HTMLElement).addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }

    onScroll();

    return () => {
      if (scrollContainer === window) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      } else {
        (scrollContainer as HTMLElement).removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
  }, [progress]);

  const letters = text.split('');
  const centerIndex = Math.floor((letters.length - 1) / 2);
  // compute per-letter multipliers so the center letter stays fixed,
  // outer letters move more, and letter appearance is reversed from above.
  const multipliers: number[] = letters.map(() => 0);
  if (letters.length > 1) {
    const n = letters.length;
    for (let i = 0; i < n; i++) {
      const distanceFromCenter = Math.abs(i - centerIndex);
      if (distanceFromCenter <= 1) {
        multipliers[i] = 0;
      } else {
        multipliers[i] = 0.1 + distanceFromCenter * 0.3;
      }
    }
  }

  return (
    <h2 ref={ref} className="flex overflow-hidden">
      {letters.map((char, i) => {
        const multiplier = multipliers[i] ?? 0;
        const letterDelay = Math.min(0.4, Math.abs(i - centerIndex) * 0.06);
        const delayedProgress =
          multiplier === 0
            ? 1
            : Math.max(0, Math.min(1, (displayProgress - letterDelay) / (1 - letterDelay)));
        const rawY = 150 * multiplier * (1 - delayedProgress);
        const yPercent = multiplier === 0 ? 0 : rawY;

        return (
          <span
            key={i}
            className="inline-block overflow-hidden px-1 pb-8 text-[2rem] font-bold text-yellow-500 md:text-[6rem] lg:text-[10rem]"
          >
            <span
              className="inline-block"
              style={{
                transform: `translateY(${yPercent}%)`,

                transition: 'transform 0.25s ease-out, opacity 0.25s ease-out',
                willChange: 'transform, opacity',
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </h2>
  );
}

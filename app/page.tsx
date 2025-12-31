"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const { contextSafe } = useGSAP();

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: "+=360" });
  });
  return (
    <div className="min-h-screen ">
      <div className="p-20 bg-white dark:bg-red-900">
        <div
          onClick={onEnter}
          className="bg-linear-to-r from-cyan-500 to-blue-500 dark:from-yellow-500 dark:to-purple-500 h-14 w-14"
        >
          selector
        </div>
      </div>
    </div>
  );
}

'use client';

import { Splash } from 'next/font/google';
import SplashScreen from '../components/SplashScreen';
import { HeroSection } from '../components/HeroSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { CertificatesSection } from '../components/CertificatesSection';

export default function SplitScrambleHero() {
  return (
    <>
      {/* <SplashScreen /> */}
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
    </>
  );
}

"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '@/app/components/Navbar';
import MainHeroSection from '@/app/components/main/MainHeroSection';
import MissionSection from '@/app/components/about/MissionSection';
import PlatformHeroSection from '@/app/components/platform/PlatformHeroSection';
import AboutHeroSection from '@/app/components/about/AboutHeroSection';
import ContactHeroSection from '@/app/components/contact/ContactHeroSection';
import Footer from '@/app/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar isFixed={true} />
      <main className="scroll-smooth">
        <section id="home">
          <MainHeroSection id="home" isMobile={false} />
        </section>
        <section id="platform">
          <PlatformHeroSection id="platform" bgColor="#0A192F" onScrollToNext={() => {}}/>
        </section>
        <section id="mission">
          <MissionSection id="mission" bgColor="#0A192F" isMobile={false} inView={true} />
        </section>
        <section id="contact">
          <ContactHeroSection id="contact" bgColor="#0A192F" isMobile={false} />
        </section>
      </main>
      <Footer />
    </>
  );
}

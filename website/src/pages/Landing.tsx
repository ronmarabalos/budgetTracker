import { useEffect, useState } from 'react';

import { DownloadSection } from '../components/DownloadSection';
import { Footer } from '../components/Footer';
import { PageBackdrop } from '../components/PageBackdrop';
import { Nav } from '../components/Nav';
import { Features, SmartFeatures } from '../components/Features';
import { Faq, Hero, HowItWorks, Privacy, Showcase } from '../components/Sections';
import { detectPlatform, type Platform } from '../config';

export function LandingPage() {
  // Pre-rendered as 'desktop'; the visitor's own store moves first once the page loads.
  const [platform, setPlatform] = useState<Platform>('desktop');
  useEffect(() => setPlatform(detectPlatform()), []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface-container focus:px-4 focus:py-2">
        Skip to content
      </a>
      <PageBackdrop />
      <Nav />
      <main id="main">
        <Hero platform={platform} />
        <Features />
        <SmartFeatures />
        <Showcase />
        <Privacy />
        <HowItWorks />
        <Faq />
        <DownloadSection platform={platform} />
      </main>
      <Footer />
    </>
  );
}

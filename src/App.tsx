import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { STILL, useCalm } from './lib/motion';
import { startSmoothScroll, stopSmoothScroll } from './lib/smoothScroll';
import { SheetProvider } from './lib/store';
import { ShaderField } from './components/Field/ShaderField';
import { Snake } from './components/Snake/Snake';
import { Header } from './components/Header/Header';
import { ScrollRail } from './components/ScrollRail/ScrollRail';
import { Hero } from './components/Hero/Hero';
import { Work } from './components/sections/Work';
import { Experience } from './components/sections/Experience';
import { Capabilities } from './components/sections/Capabilities';
import { Research } from './components/sections/Research';
import { Credentials } from './components/sections/Credentials';
import { Contact } from './components/sections/Contact';
import { Sheet } from './components/Sheet/Sheet';

/**
 * Page order. Reorder, add or remove sections here.
 * Content for every section comes from content/site.ts.
 */
export default function App() {
  const calm = useCalm();
  useEffect(() => {
    if (calm) return;
    startSmoothScroll();
    return () => stopSmoothScroll();
  }, [calm]);

  return (
    <MotionConfig reducedMotion={STILL ? 'always' : 'user'}>
      <SheetProvider>
        <a href="#main" className="skip-link">Skip to content</a>
        <ShaderField />
        <Snake />
        <Header />
        <ScrollRail />
        <main id="main">
          <Hero />
          <Experience />
          <Research />
          <Work />
          <Capabilities />
          <Credentials />
          <Contact />
        </main>
        <Sheet />
      </SheetProvider>
    </MotionConfig>
  );
}

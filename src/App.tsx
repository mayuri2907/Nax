import { useState, useEffect } from 'react';
import { IntroSequence } from './components/IntroSequence';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Capabilities } from './sections/Capabilities';
import { Projects } from './sections/Projects';
import { VyrobyteVision } from './sections/VyrobyteVision';
import { Principles } from './sections/Principles';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export function App() {
  const [introFinished, setIntroFinished] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('nax_intro_completed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // When intro finishes, ensure scroll is enabled
    if (introFinished) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [introFinished]);

  return (
    <div className="portfolio-app-root">
      {/* Cinematic Opening Sequence */}
      {!introFinished && (
        <IntroSequence onComplete={() => setIntroFinished(true)} />
      )}

      {/* Top Document Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Sticky Navigation */}
      <Navigation />

      {/* Main Scrollable Founder Experience */}
      <main id="main-content">
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <VyrobyteVision />
        <Principles />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IntroSequence } from './components/IntroSequence';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { PagePagination } from './components/PagePagination';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { VisionPage } from './pages/VisionPage';
import { PrinciplesPage } from './pages/PrinciplesPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [introFinished, setIntroFinished] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('nax_intro_completed') === 'true';
    } catch {
      return false;
    }
  });

  return (
    <BrowserRouter>
      {/* High-Precision Mouse Tracer & Magnetic Particle Follower */}
      <CustomCursor />

      {/* Cinematic Opening Sequence */}
      {!introFinished && (
        <IntroSequence onComplete={() => setIntroFinished(true)} />
      )}

      {/* Sticky Top Navigation with Multi-Page Routing */}
      <Navigation />

      {/* Multi-Page Route Viewport */}
      <main id="main-content" style={{ minHeight: 'calc(100vh - var(--header-height))', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/principles" element={<PrinciplesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating Bottom Quick-Jump Page Pagination Dock */}
      <PagePagination />

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

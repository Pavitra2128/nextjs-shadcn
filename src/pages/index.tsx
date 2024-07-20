// Home.tsx
import React, { useRef } from 'react';
import Managements from './Management'; // Adjusted file name
import Gallery from './Gallery';
import Navbar from './NavBar';
import About from './about'; // Adjusted file name
import HomePage from './HomePagr'; // Corrected file name
import { ChevronUpIcon } from 'lucide-react';
import FooterSection from './FooterSection';

const Home: React.FC = () => {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const managementsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const newsRef = useRef<HTMLElement>(null);
  const ourTemplesRef = useRef<HTMLElement>(null);
  const donationsRef = useRef<HTMLElement>(null);
  const contactsRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: string) => {
    switch (section) {
      case 'home':
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'about':
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'managements':
        managementsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'gallery':
        galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'news':
        newsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'ourtemples':
        ourTemplesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'donations':
        donationsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contacts':
        contactsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const getPreviousSection = (currentSection: string) => {
    switch (currentSection) {
      case 'about':
        return 'home';
      case 'managements':
        return 'home';
      case 'gallery':
        return 'home';
      default:
        return null;
    }
  };

  const renderUpArrowButton = (currentSection: string) => {
    const previousSection = getPreviousSection(currentSection);
    return previousSection ? (
      <button
        onClick={() => scrollToSection(previousSection)}
        className="absolute right-4 bottom-4 bg-maroon text-white p-2 rounded-full shadow-md"
      >
        <ChevronUpIcon size={24} />
      </button>
    ) : null;
  };

  return (
    <div className="overflow-y-auto relative min-h-screen">
      <Navbar scrollToSection={scrollToSection} />
      <HomePage />
      <section ref={aboutRef} className="relative min-h-screen">
        <About />
        {renderUpArrowButton('about')}
      </section>
      <section ref={managementsRef} className="relative min-h-screen">
        <Managements />
        {renderUpArrowButton('managements')}
      </section>
      <section ref={galleryRef} className="relative min-h-screen">
        <Gallery />
        {renderUpArrowButton('gallery')}
      </section>
      <section>
        <FooterSection />
      </section>
    </div>
  );
};

export default Home;

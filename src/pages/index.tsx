import React, { useRef, useState, useEffect } from 'react';
import Managements from './Managements';
import Gallery from './Gallery';
import About from './about';
import { ChevronUpIcon } from 'lucide-react';
import HomePage from './HomePagr';

const Home: React.FC = () => {
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const managementsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const [currentSection, setCurrentSection] = useState<string>('home');

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (galleryRef.current && scrollPosition >= galleryRef.current.offsetTop) {
        setCurrentSection('gallery');
      } else if (managementsRef.current && scrollPosition >= managementsRef.current.offsetTop) {
        setCurrentSection('managements');
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop) {
        setCurrentSection('about');
      } else {
        setCurrentSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      default:
        break;
    }
  };

  const renderUpArrowButton = () => {
    const previousSection = currentSection === 'home' ? null : 'home';
    return previousSection ? (
      <button
        onClick={() => scrollToSection(previousSection)}
        className="fixed right-4 bottom-4 bg-maroon text-white p-2 rounded-full shadow-md"
      >
        <ChevronUpIcon size={24} />
      </button>
    ) : null;
  };

  return (
    <div className="overflow-y-auto relative min-h-screen">
      <div ref={homeRef}>
        <HomePage />
      </div>
      <section ref={aboutRef} className="relative min-h-screen">
        <About />
        {renderUpArrowButton()}
      </section>
      <section ref={managementsRef} className="relative min-h-screen">
        <Managements />
        {renderUpArrowButton()}
      </section>
      <section ref={galleryRef} className="relative min-h-screen">
        <Gallery />
        {renderUpArrowButton()}
      </section>
    </div>
  );
};

export default Home;

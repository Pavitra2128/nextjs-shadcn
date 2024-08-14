import React, { useRef, useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Managements from './Managements';
import Gallery from './Gallery';
import About from './about';
import HomePage from './HomePagr'; // Ensure the filename is correct
import { ChevronUpIcon } from 'lucide-react';

const Home: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const managementsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [currentSection, setCurrentSection] = useState<string>('home');

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

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;

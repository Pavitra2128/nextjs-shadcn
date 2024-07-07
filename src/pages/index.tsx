import React, { useRef } from 'react';
import Managements from './Management';
import Gallery from './Gallery';
import Navbar from './NavBar';
import About from './about';

const Home: React.FC = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const managementsRef = useRef(null);
  const galleryRef = useRef(null);
  const newsRef = useRef(null);
  const ourTemplesRef = useRef(null);
  const donationsRef = useRef(null);
  const contactsRef = useRef(null);

  const scrollToSection = (section) => {
    switch (section) {
      case 'home':
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'about':
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
        case 'managements':
          managementsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'gallery':
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'news':
        newsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'ourtemples':
        ourTemplesRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'donations':
        donationsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contacts':
        contactsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="overflow-y-auto">
      <Navbar scrollToSection={scrollToSection} />
      <section ref={homeRef}>
        {/* Add home content here */}
      </section>
      <section ref={aboutRef}>
        <About />
      </section>
      <section ref={managementsRef}>
        <Managements />
      </section>
      <section ref={galleryRef}>
        <Gallery />
      </section>
      <section ref={newsRef}>
        {/* Add news content here */}
      </section>
      <section ref={ourTemplesRef}>
        {/* Add our temples content here */}
      </section>
      <section ref={donationsRef}>
        {/* Add donations content here */}
      </section>
      <section ref={contactsRef}>
        {/* Add contacts content here */}
      </section>
    </div>
  );
};

export default Home;

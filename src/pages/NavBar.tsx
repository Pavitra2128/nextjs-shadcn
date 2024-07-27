import React, { useEffect, useState, useRef } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ChevronDownIcon, ChevronUpIcon, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Initially play the audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to toggle sound
  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  // Effect to play or pause audio based on isPlaying state
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Shiva-Stotram.mp3');
      audioRef.current.loop = true;
    }

    const playAudio = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error attempting to play audio:", error);
        });
      }
    };

    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    if (isPlaying) {
      playAudio();
    } else {
      audioRef.current.pause();
    }

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isPlaying]);

  // Navigation links array
  const navigationLinks = [
    { label: 'Home', section: '/' },
    { label: 'About us', section: '/about' },
    { label: 'Managements', section: '/Managements' },
    { label: 'Gallery', section: '/Gallery' },
    { label: 'News & Events', section: '/NewsAndEvents', external: true },
    { label: 'Our Temples', section: '/Temples' },
    { label: 'Donations', section: '/donations' }, // This is the link to Donations.tsx
    { label: 'Contacts', section: '/contact-us' },
  ];

  // Render navigation links
  const renderLinks = (isMobile = false) => (
    <NavigationMenu>
      <NavigationMenuList className={isMobile ? 'flex flex-col items-center space-y-2' : 'flex space-x-6'}>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.section}>
            <NavigationMenuLink asChild>
              <Link href={link.section} passHref>
                <div className="text-maroon hover:text-white hover:bg-maroon px-2 py-2 rounded text-md font-bold transition-colors duration-300">
                  {link.label}
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <>
      <nav className="flex items-center justify-between p-2 bg-white shadow-md relative">
        <div className="flex items-center space-x-2">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
          <div className="flex items-center space-x-2">
            <div className="text-maroon text-sm sm:text-lg lg:text-xl font-hindi font-bold whitespace-nowrap">
              सारसबाग गणपति
            </div>
            <button onClick={toggleSound} className="text-maroon">
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>

        <button className="lg:hidden text-gray-600 focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
        </button>

        <div className="hidden lg:flex justify-center">
          {renderLinks()}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white shadow-md flex justify-center">
          {renderLinks(true)}
        </div>
      )}

      <div className="marquee text-center py-2">
        <span>
          om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh
        </span>
      </div>
    </>
  );
};

export default Navbar;

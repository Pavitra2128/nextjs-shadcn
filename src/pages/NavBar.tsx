import React, { useEffect, useState, useRef } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ChevronDownIcon, ChevronUpIcon, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import next/link for navigation

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Assuming initially play the audio
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
      audioRef.current.loop = true; // Loop the audio
    }

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error attempting to play audio:", error);
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
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
    { label: 'Donations', section: '/donations' },
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
                <div className="text-maroon hover:text-white hover:bg-maroon px-4 py-3 rounded text-lg font-bold transition-colors duration-300">
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
      <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
        <div className="flex items-center space-x-4">
          <img src="/logo.jpg" alt="Logo" className="h-16 w-16 sm:h-20 sm:w-20" />
          <div className="text-maroon text-xl sm:text-3xl font-hindi font-bold whitespace-nowrap">
            सारसबाग गणपति
          </div>
          <button onClick={toggleSound} className="text-maroon">
            {isPlaying ? <Volume2 size={36} /> : <VolumeX size={36} />}
          </button>
        </div>

        <button className="lg:hidden text-gray-600 focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
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

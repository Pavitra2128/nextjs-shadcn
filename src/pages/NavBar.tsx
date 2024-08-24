import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ChevronDownIcon, ChevronUpIcon, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const { t } = useTranslation('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
    setDropdownOpen(false); // Close dropdown after selecting language
  };

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

  const navigationLinks = [
    { label: t('navbar.home'), section: '/' },
    { label: t('navbar.about'), section: '/about' },
    { label: t('navbar.managements'), section: '/Managements' },
    { label: t('navbar.gallery'), section: '/Gallery' },
    { label: t('navbar.newsEvents'), section: '/NewsAndEvents', external: true },
    { label: t('navbar.ourTemples'), section: '/Temples' },
    { label: t('navbar.donations'), section: '/donations' },
    { label: t('navbar.contacts'), section: '/Contact' },
  ];

  const renderLinks = (isMobile = false) => (
    <NavigationMenu>
      <NavigationMenuList className={isMobile ? 'flex flex-col items-center space-y-2' : 'flex space-x-6'}>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.section}>
            <NavigationMenuLink asChild>
              <Link href={link.section} passHref>
                <div className="text-maroon hover:text-white hover:bg-maroon px-2 py-1 rounded text-xs sm:text-sm lg:text-base font-bold transition-colors duration-300">
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
          <img src="/logo.jpg" alt={t('navbar.logoAlt')} className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
          <div className="flex items-center space-x-2">
            <div className="text-maroon text-xs sm:text-sm lg:text-base font-hindi font-bold whitespace-nowrap">
              {t('navbar.title')}
            </div>
            <button onClick={toggleSound} className="text-maroon text-xs sm:text-sm lg:text-base">
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="text-maroon text-xs sm:text-sm lg:text-base px-2 py-1 border border-maroon rounded-md flex items-center"
            >
              Language
              <ChevronDownIcon className="ml-2" size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-maroon rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="block w-full text-left px-2 py-1 text-maroon hover:bg-gray-100 text-xs sm:text-sm lg:text-base"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className="block w-full text-left px-2 py-1 text-maroon hover:bg-gray-100 text-xs sm:text-sm lg:text-base"
                >
                  HI
                </button>
                <button
                  onClick={() => handleLanguageChange('te')}
                  className="block w-full text-left px-2 py-1 text-maroon hover:bg-gray-100 text-xs sm:text-sm lg:text-base"
                >
                  TE
                </button>
              </div>
            )}
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
          {t('navbar.marquee')}
        </span>
      </div>
    </>
  );
};

export default Navbar;

import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { useRouter } from 'next/router';

const Navbar = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { label: 'Home', section: 'home' },
    { label: 'About us', section: 'about' },
    { label: 'Managements', section: 'managements' },
    { label: 'Gallery', section: 'gallery' },
    { label: 'News & Events', section: '/CalendarDemo', external: true },
    { label: 'Our Temples', section: 'ourtemples' },
    { label: 'Donations', section: 'donations' },
    { label: 'Contacts', section: 'contacts' },
  ];

  const renderLinks = (isMobile = false) => (
    <NavigationMenu>
      <NavigationMenuList className={isMobile ? 'flex flex-col items-center space-y-2' : 'flex space-x-6'}>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.section}>
            <NavigationMenuLink asChild>
              <a
                href="#"
                onClick={() => {
                  if (link.label === 'News & Events') {
                    router.push(link.section);
                  } else {
                    if (!link.external) {
                      scrollToSection(link.section);
                    }
                    if (isMobile) {
                      toggleMobileMenu();
                    }
                  }
                }}
                className="text-maroon hover:text-white hover:bg-maroon px-4 py-3 rounded text-lg font-bold transition-colors duration-300"
              >
                {link.label}
              </a>
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

      <div className="w-full relative overflow-hidden h-screen">
        <img src="/hdtemple.jpg" alt="temple" className="w-full h-full object-cover object-center" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <Button className="bg-maroon text-white hover:bg-maroon-dark">
            Donate Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
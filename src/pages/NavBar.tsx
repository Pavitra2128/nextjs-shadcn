// Navbar.tsx

import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useRouter } from 'next/router';

const Navbar = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { label: 'Home', section: '/' },
    { label: 'About us', section: 'about' },
    { label: 'Managements', section: 'Management' },
    { label: 'Gallery', section: 'Gallery' },
    { label: 'News & Events', section: '/NewsAndEvents', external: true },
    { label: 'Our Temples', section: '/Temples', external: false }, // Ensure this points to /Temples
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
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor tag behavior
                  if (link.external) {
                    window.location.href = link.section; // External link behavior
                  } else {
                    router.push(link.section); // Internal link behavior
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
    </>
  );
};

export default Navbar;

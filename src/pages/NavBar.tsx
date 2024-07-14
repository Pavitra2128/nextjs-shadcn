import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

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

  const handleLinkClick = (link) => {
    if (link.external) {
      router.push(link.section);
    } else {
      scrollToSection(link.section);
      if (isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }
  };

  const renderLinks = (isMobile = false) => (
    <NavigationMenuList className={isMobile ? 'flex flex-col space-y-2' : 'flex space-x-6'}>
      {navigationLinks.map((link) => (
        <NavigationMenuItem key={link.section}>
          <NavigationMenuLink asChild>
            <button
              onClick={() => handleLinkClick(link)}
              className="text-maroon hover:text-white hover:bg-maroon px-4 py-3 rounded text-lg font-bold transition-colors duration-300 w-full text-left"
            >
              {link.label}
            </button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
      <div className="flex items-center space-x-4">
        <img src="/logo.jpg" alt="Logo" className="h-16 md:h-20 w-16 md:w-20" />
        <div className="text-maroon text-xl md:text-3xl font-hindi font-bold">सारसबाग गणपति</div>
      </div>

      <button className="lg:hidden text-gray-600 focus:outline-none" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
      </button>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-md z-10 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <NavigationMenu>
          {renderLinks(true)}
        </NavigationMenu>
      </div>

      {/* Desktop Menu */}
      <NavigationMenu className="hidden lg:flex justify-center">
        {renderLinks()}
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;

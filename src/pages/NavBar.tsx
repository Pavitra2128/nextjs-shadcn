import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Ensure this import matches your project structure

const Navbar = ({ scrollToSection }) => {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
        <div className="flex items-center space-x-4">
          <img src="/logo.jpg" alt="Logo" className="h-20 w-20" />
          <div className="text-maroon text-3xl font-hindi font-bold">सारसबाग गणपति</div>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('/')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('about')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                About us
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('managements')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                Managements
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('gallery')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                Gallery
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/CalendarDemo"
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                News & Events
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('ourtemples')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                Our Temples
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('donations')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                Donations
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                onClick={() => scrollToSection('contacts')}
                className="hover:bg-maroon hover:text-white px-4 py-3 rounded text-lg font-bold"
              >
                Contacts
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div>
        om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh * om sri ganesh
      </div>
      <div className="w-full">
        <img src="/hdtemple.jpg" alt="temple" className="w-full h-[80vh] object-cover object-center" />
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

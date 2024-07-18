import React from 'react';
import Image from 'next/image';
import hdtemple from '../../public/hdtemple.jpg';
import { Button } from '@/components/ui/button';
const HomePage: React.FC = () => {
    return (
        
            <div className="w-full relative overflow-hidden h-screen">
        <img src="/hdtemple.jpg" alt="temple" className="w-full h-full object-cover object-center" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <Button className="bg-maroon text-white hover:bg-maroon-dark">
            Donate Now
          </Button>
        </div>
      </div>
       
    );
};
export default HomePage;
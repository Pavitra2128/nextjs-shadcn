import React from 'react';
import Image from 'next/image';
import hdtemple from '../../public/hdtemple.jpg';
const HomePage: React.FC = () => {
    return (
        <div>
            <Image
            src={hdtemple}
            alt="Temple"
            className="w-full h-auto "
            layout="responsive"
          />
        </div>
    );
};
export default HomePage;
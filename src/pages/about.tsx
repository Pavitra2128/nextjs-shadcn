import React from 'react';
import Image from 'next/image';
import { AsteriskIcon, ChevronUpIcon, ChevronUpSquareIcon } from 'lucide-react';
import img1 from '../../public/img1.jpg';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
    return (
        <div className='relative p-4 mb-40'>
            <div className='mb-6'>
                <h1 className="text-maroon font-bold text-4xl text-center mb-16">About Us</h1>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-center md:items-start'>
                    <div className='mb-2 md:mb-0 md:mr-6 w-96 md:w-96 flex-shrink-0 rounded-full overflow-hidden'>
                    <Image src={img1} alt="Ganesh" className="w-full h-auto rounded-full sm" width={512} height={500} />
                </div>
                <div className='text-center md:text-left w-full md:w-3/5 md:pl-8 relative'>
                    <p className="text-xl mb-12  mx-auto">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking
                        at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                        opposed to using 'Content here, content here', making it look like readable English.
                    </p>
                    <p className="text-xl mb-2  mx-auto">
                        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                        text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
                        Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the
                        like).
                    </p>
                    <p className="text-xl mb-6  mx-auto">
                        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                        text, and a search for 'lorem ipsum' will uncover many web sites
                    </p>
                    <p className="flex items-center mb-8">
                            <AsteriskIcon className="mr-2" />
                            <a href="#" className="text-maroon underline font-bold text-xl">
                                Get More information about Peshava History
                            </a>
                        </p>
                        <p className="flex items-center mb-8">
                            <AsteriskIcon className="mr-2" />
                            <a href="#" className="text-maroon underline font-bold text-xl">
                                Get More information about Ganesh Temple History
                            </a>
                        </p>
                    <div className="flex justify-start mt-4">
                        <Button className="bg-red-800 hover:bg-red-800 text-white text-xl py-7 px-12 rounded-full" style={{ marginLeft: '35rem' }}>
                            Know More
                        </Button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default About;
import { Button } from '@/components/ui/button';
import { Home, Mail, Phone } from 'lucide-react';
import React from 'react';
import { Facebook } from 'react-feather';
import { FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterSection: React.FC = () => {
    return (
        <div className='bg-maroon text-white flex flex-wrap justify-center items-start py-8 px-4 lg:px-0'>
            <div className='flex-1 lg:pr-12 mb-8'>
                <p className='text-xl font-bold mb-6'>ABOUT US</p>
                <div className='mb-4' style={{ fontSize: '18px' }}>
                    <p>This is a short description about the Temples.</p>
                    <p>This will be 3 to 4 lines.</p>
                </div>
                <div>
                    <Button className='bg-maroon text-white border border-white'>
                        ABOUT US
                    </Button>
                </div>
            </div>
            <div className='flex-1 lg:px-8 mb-8'>
                <p className='text-xl font-bold mb-6'>LINKS</p>
                <div style={{ fontSize: '18px' }}>
                    <ul>
                        <li>About</li>
                        <li>Temple Schedule</li>
                        <li>Festivals</li>
                        <li>Donations</li>
                        <li>Gallery</li>
                        <li>Live Dharshan</li>
                        <li>Jay Ganesh Runga Seva Abhiyan</li>
                        <li>FAQ'S</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
            <div className='flex-1 lg:px-8 mb-8'>
                <p className='text-xl font-bold mb-6'>GET IN TOUCH</p>
                <div className='flex mb-4'>
                    <div className='mr-4'><Home size={24} /></div>
                    <div style={{ fontSize: '18px' }}>
                        <ul>
                            <li>Address description 1</li>
                            <li>Address description 2</li>
                            <li>Address description 3</li>
                        </ul>
                    </div>
                </div>
                <div className='flex mb-4'>
                    <div className='mr-4'><Phone size={24} /></div>
                    <div style={{ fontSize: '18px' }}>
                        <p>Contact Person</p>
                        <p>+91 20 24496464</p>
                        <p>+91 20 24492000</p>
                    </div>
                </div>
                <div className='flex'>
                    <div className='mr-4'><Mail size={24} /></div>
                    <div style={{ fontSize: '18px' }}>
                        <p>contact.dhgt@gmail.com</p>
                        <p>For Donations</p>
                        <p>test@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='flex-1 lg:pl-12 mb-8'>
                <p className='text-xl font-bold mb-6'>CONNECT WITH US</p>
                <div className='flex space-x-4'>
                    <Facebook fill='#ffffff' />
                    <FaYoutube color="#ffffff" size={24} />
                    <FaTwitter color="#ffffff" size={24} />
                    <FaPinterest color="#ffffff" size={24} />
                    <FaInstagram color="#ffffff" size={24} />
                </div>
            </div>
        </div>
    );
};

export default FooterSection;

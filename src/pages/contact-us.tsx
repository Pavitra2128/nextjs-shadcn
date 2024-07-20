import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'react-feather';
import Image from 'next/image';
import GreenGod from '../../public/GreenGod.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('There was an error sending your message.');
      }
    } catch (error) {
      toast.error('There was an error sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[600px] sm:h-[600px] lg:h-[900px]">
        <div className="relative w-full h-full overflow-hidden" style={{ clipPath: 'url(#curveClipPath)' }}>
          <Image
            src={GreenGod}
            alt="Green God"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <svg className="absolute bottom-0 left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,192C672,203,768,181,864,176C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Contact Us Heading */}
      <div className="bg-white py-8 text-center">
        <h1 className="text-4xl font-bold text-maroon text-start">CONTACT US</h1>
      </div>

      {/* Map Section */}
      <div className="w-full bg-gray-200 py-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.7869758501065!2d73.834596!3d18.500914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c00de2b2e577%3A0x5376a0a64c6a529e!2sShri%20Siddhivinayak%20Ganesh%20Mandir%20Sarasbaug!5e0!3m2!1sen!2sin!4v1676618756983!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Information and Form */}
      <div className="flex flex-col lg:flex-row p-8 gap-8 bg-white shadow-lg rounded-lg -mt-[1px]">
        {/* Combined Contact Information */}
        <div className="flex flex-col flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-maroon mb-6">Get in Touch</h1>
          <div className="flex flex-col space-y-6">
            {/* Address */}
            <div className="flex items-start space-x-4 p-4">
              <MapPin size={80} className="text-maroon" />
              <div>
                <h2 className="text-xl font-semibold">Address</h2>
                <p className="mt-1 text-base">
                  Shreemant Dagdusheth Halwai Sarvajanik Ganpati Trust, Pune is pride, prestige, inspiration and ideal for Maharashtra´s Public Ganpati Festival.
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start space-x-4 p-4">
              <Phone size={60} className="text-maroon" />
              <div>
                <h2 className="text-xl font-semibold">Phone Number</h2>
                <p className="mt-1 text-base">+91 20 24496464</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 p-4">
              <Mail size={60} className="text-maroon" />
              <div>
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="mt-1 text-base">contact.dhgt@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col flex-1 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-6 shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="text-lg font-semibold">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="phone" className="text-lg font-semibold">Phone</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your Phone"
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-lg font-semibold">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="subject" className="text-lg font-semibold">Your Subject</label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject..."
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="message" className="text-lg font-semibold">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your Message"
                className="p-2 border border-gray-300 rounded-lg"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-maroon text-white font-bold rounded-lg shadow-md hover:bg-maroon-dark transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ContactUs;

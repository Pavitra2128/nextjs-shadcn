// Gallery.tsx

import React from 'react';
import { Button } from "@/components/ui/button"; // Ensure you have this import for shadcn button
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext } from 'next';

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center pt-8 overflow-hidden">
      <h1 className="text-4xl font-bold mb-6 text-center text-maroon">Gallery</h1>
      <p className="text-lg text-center px-8 mb-8 max-w-4xl">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking 
        at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as 
        opposed to using 'Content here, content here', making it look like readable English.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto mb-8 px-4">
        <div className="relative w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500 sm:col-span-2 lg:col-span-1 rounded-lg p-4">
          Placeholder 1
        </div>
        <div className="relative w-full h-32 bg-gray-300 flex items-center justify-center text-gray-500 sm:col-span-1 lg:col-span-2 rounded-lg p-4">
          Placeholder 2
        </div>
        <div className="relative w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500 sm:col-span-1 lg:col-span-2 rounded-lg p-4">
          Placeholder 3
        </div>
        <div className="relative w-full h-32 bg-gray-300 flex items-center justify-center text-gray-500 rounded-lg p-4">
          Placeholder 4
        </div>
      </div>
      <Button className="bg-maroon text-white rounded-full py-2 px-4">View More</Button>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale || 'en'; // Default to 'en' if no locale is provided
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Gallery;

// HomePage.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext } from 'next';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="w-full relative overflow-hidden h-screen">
        <img src="/hdtemple.jpg" alt="temple" className="w-full h-full object-cover object-center" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <Button className="bg-maroon text-white hover:bg-maroon-dark">
            Donate Now
          </Button>
        </div>
      </div>
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
export default HomePage;

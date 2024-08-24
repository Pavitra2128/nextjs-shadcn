import React from 'react';
import Image from 'next/image';
import { AsteriskIcon } from 'lucide-react';
import img1 from '../../public/img1.jpg';
import { Button } from '@/components/ui/button';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('about');

  return (
    <div className='relative p-4 mb-20 md:mb-41'>
      <div className='mb-6'>
        <h1 className="text-maroon font-bold text-4xl text-center mb-10 md:mb-16">
          {t('title')}
        </h1>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-center md:items-start'>
        <div className='mb-4 md:mb-0 md:mr-6 w-full md:w-96 flex-shrink-0 rounded-full overflow-hidden'>
          <Image
            src={img1}
            alt="Ganesh"
            className="w-full h-auto rounded-full"
            width={512}
            height={500}
            priority // Optional, if you want the image to load with high priority
          />
        </div>
        <div className='text-center md:text-left w-full md:w-3/5 md:pl-8 relative'>
          <p className="text-lg md:text-xl mb-8 md:mb-12">
            {t('description1')}
          </p>
          <p className="text-lg md:text-xl mb-2">
            {t('description2')}
          </p>
          <p className="text-lg md:text-xl mb-6">
            {t('description3')}
          </p>
          <p className="flex items-center mb-6">
            <AsteriskIcon className="mr-2" />
            <a href="#" className="text-maroon underline font-bold text-lg md:text-xl">
              {t('link1')}
            </a>
          </p>
          <p className="flex items-center mb-8">
            <AsteriskIcon className="mr-2" />
            <a href="#" className="text-maroon underline font-bold text-lg md:text-xl">
              {t('link2')}
            </a>
          </p>
          <div className="flex justify-center md:justify-start">
            <Button className="bg-red-800 hover:bg-red-800 text-white text-lg md:text-xl py-4 px-8 rounded-full">
              {t('buttonText')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  };
};

export default About;

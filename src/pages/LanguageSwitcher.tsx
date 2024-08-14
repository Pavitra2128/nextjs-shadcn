import React from 'react';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => changeLanguage('en')} className="text-maroon">EN</button>
      <button onClick={() => changeLanguage('hi')} className="text-maroon">HI</button>
      <button onClick={() => changeLanguage('te')} className="text-maroon">TE</button>
    </div>
  );
};

export default LanguageSwitcher;

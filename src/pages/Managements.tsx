import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'react-feather';

const Managements: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      name: "Rajaram Deshpande",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."
    },
    {
      id: 2,
      name: "Rajaram Deshpande",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."
    },
    {
      id: 3,
      name: "Rajaram Deshpande",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."
    },
    {
      id: 4,
      name: "Rajaram Deshpande",
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."
    }
  ];

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const profileIconColor = "#944547"; // Light maroon color
  const color = "#A45A52";

  return (
    <div>
    <div className="min-h-screen bg-maroon text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Managements</h1>
      <div className="absolute left-20 top-3/2 transform -translate-y-8/2">
        <button onClick={handlePrevClick}>
          <ChevronLeft color="white" size={64} />
        </button>
      </div>
      <div className="absolute right-20 top-3/2 transform -translate-y-8/2">
        <button onClick={handleNextClick}>
          <ChevronRight color="white" size={64} />
        </button>
      </div>
      {/* Upper Separate Card */}
      <Card className="bg-white text-black p-6 rounded-lg shadow-lg mb-4 max-w-3xl">
        <div className="flex items-center">
          <div className="w-1/3 flex justify-center">
            <User size={200} color={color} className="md:w-1/2 lg:w-full" />
          </div>
          <div className="w-2/3 pl-8">
            <CardTitle>{slides[currentSlide].name}</CardTitle>
              <CardContent>
              <p style={{ marginTop: '1.5rem' }}>{slides[currentSlide].content}</p>
              </CardContent>
          </div>
        </div>
      </Card>
      {/* Three Separate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slides.slice(1, 4).map((slide, index) => (
          <Card key={slide.id} className="bg-white text-black p-2 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-1/3 flex justify-center">
                <User size={100} color={profileIconColor} className="md:w-1/2 lg:w-full" />
              </div>
              <div className="w-2/3 pl-4">
                <CardTitle>{slide.name}</CardTitle>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Indicator Dots */}
      <div className="flex justify-center mt-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`h-3 w-3 rounded-full mx-2 ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      {/* White Line */}

    </div>
    <div className="w-full border-t border-white mt-8"></div>
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
export default Managements;
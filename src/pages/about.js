import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Assuming these components exist in your ShadCN setup

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">About Shri Vishnu Engineering College for Women</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Shri Vishnu Engineering College for Women (SVECW) was established in the year 2001 with the vision of empowering women in the field of engineering and technology. It is part of the esteemed Shri Vishnu Educational Society, which has a rich legacy of providing quality education.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              The mission of SVECW is to provide a conducive learning environment that nurtures intellectual growth, fosters innovation, and instills ethical values among students. The college is committed to producing competent engineers and technocrats who can contribute positively to society.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              SVECW upholds the values of integrity, excellence, inclusivity, and social responsibility. These values guide the college in its pursuit of academic excellence, research and innovation, industry collaboration, and community engagement.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;

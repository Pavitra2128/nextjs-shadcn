import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/router';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-black">
            Contact Shri Vishnu Engineering College for Women
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-black">Address</h2>
            <p className="text-gray-600">
              Shri Vishnu Engineering College for Women,<br />
              Vishnupur, Bhimavaram - 534202,<br />
              West Godavari District,<br />
              Andhra Pradesh, India
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-black">Phone</h2>
            <p className="text-gray-600">+91 8816 224848, +91 8816 224849</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-black">Email</h2>
            <p className="text-gray-600">info@svecw.edu.in</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-black">Website</h2>
            <p className="text-gray-600">
              <a href="http://www.svecw.edu.in/" className="text-blue-500 hover:underline">
                http://www.svecw.edu.in/
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Import the Card and CardContent components from Shadcn

const StudentCard = ({ student }) => {
  return (
    <Card className="p-4 bg-white shadow-md rounded-lg">
      <CardContent>
        <h3 className="text-lg font-semibold">{student.name}</h3>
        <p className="text-gray-600">Email: {student.email}</p>
        <p className="text-gray-600">Phone: {student.phone}</p>
        <p className="text-gray-600">Address: {student.address}</p>
        <p className="text-gray-600">Date of Birth: {student.dateOfBirth}</p>
        <p className="text-gray-600">Course: {student.course}</p>
      </CardContent>
    </Card>
  );
};

export default StudentCard;

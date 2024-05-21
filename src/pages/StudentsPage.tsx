import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card'; 
import StudentCard from './StudentCard'; 

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  course: string;
}


const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]); // Specify Student[] type

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students');
        const data: Student[] = await response.json(); // Specify the type of data as Student[]
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Student List</h1>
      {students.map((student: Student) => ( // Specify the type of student here
        <Card key={student.id} className="mb-4">
          <StudentCard student={student} />
        </Card>
      ))}
    </div>
  );
};

export default StudentsPage;

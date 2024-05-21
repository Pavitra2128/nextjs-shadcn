import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card'; 
import StudentCard from './StudentCard'; 

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students');
        const data = await response.json();
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
        {students.map(student => (
          <Card key={student.id} className="mb-4">
            <StudentCard student={student} />
          </Card>
        ))}
    </div>
  );
};

export default StudentsPage;

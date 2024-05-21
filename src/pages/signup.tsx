import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', data);
      if (response.status === 201) {
        router.push('/'); // Redirect to the home page after successful signup
      }
    } catch (error) {
      console.error('There was an error registering the user:', error);
      alert('Error signing up');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-black">Signup</CardTitle>
          <CardDescription className="text-center text-gray-600">Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-black">Name</Label>
              <Input
                type="text"
                id="name"
                {...register('name')}
                placeholder="Enter your name"
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-black">Email</Label>
              <Input
                type="email"
                id="email"
                {...register('email')}
                placeholder="Enter your email"
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-black">Phone</Label>
              <Input
                type="tel"
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-black">Address</Label>
              <Input
                type="text"
                id="address"
                {...register('address')}
                placeholder="Enter your address"
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth" className="text-black">Date of Birth</Label>
              <Input
                type="date"
                id="dateOfBirth"
                {...register('dateOfBirth')}
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="course" className="text-black">Course</Label>
              <Input
                type="text"
                id="course"
                {...register('course')}
                placeholder="Enter your course"
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-black">Password</Label>
              <Input
                type="password"
                id="password"
                {...register('password')}
                placeholder="Enter your password"
                className="mt-1 block w-full border-black text-black"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;

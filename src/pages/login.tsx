import { useState, useEffect } from 'react';
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
  CardFooter,
} from "@/components/ui/card";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const usernameRegex = /^(?=.*[@#$%^&*])[a-zA-Z0-9@#$%^&*]{5,}$/;
    if (!usernameRegex.test(username)) {
      setError('Username must contain at least one special character (@, #, $, %, ^, &, *) and be at least 5 characters long.');
      return;
    }

    setError('');
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {!isLoggedIn ? (
        <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-black">Login</CardTitle>
            <CardDescription className="text-center text-gray-600">Please enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-black">Username</Label>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className="mt-1 block w-full border-black text-black"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-black">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="mt-1 block w-full border-black text-black"
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Login</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-white">User Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.map(user => (
              <Card key={user.id} className="bg-white shadow-lg rounded-lg p-4">
                <CardHeader>
                  <CardTitle className="text-black">{user.name}</CardTitle>
                  <CardDescription className="text-gray-600">{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-black">
                  <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

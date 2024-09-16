"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useRouter } from 'next/navigation';

import axios from "axios";

const LoginForm = () => {
  return (
    <form>
      <div className="space-y-4">
        <Input 
          type="email" 
          placeholder="Email" 
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
        <Input 
          type="password" 
          placeholder="Password" 
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
      </div>
    </form>
  );
};

const SignUpForm = () => {
  return (
    <form>
      <div className="space-y-4">
        <Input 
          type="text" 
          placeholder="Username" 
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
        <Input 
          type="email" 
          placeholder="Email" 
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
        <Input 
          type="password" 
          placeholder="Password" 
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
        <Input 
          type="password" 
          placeholder="Confirm Password" 
          className="bg-gray-700 text-gray-100 border-gray-600"
        />
      </div>
    </form>
  );
};

async function handleSignup( { loginType, username, email, password } ) {
    const { data } = await axios.post("/api/auth", {
        loginType: loginType,
        username: username,
        email: email,
        password: password,
    })

    if (data.success) {
        
    }
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <Card className="w-[350px] bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription className="text-gray-400">
            {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? <LoginForm /> : <SignUpForm />}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
            if (!isLogin) {
                handleSignup();
            }

          }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600 border-gray-600"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useRouter } from 'next/navigation';
import { cookieStore } from "@/components/cookieStore";
import { encrypt } from "@/components/tools/encryption";

import axios from "axios";

const LoginForm = ({setState}) => {
  return (
    <form>
      <div className="space-y-4">
        <Input 
          type="email" 
          placeholder="Email" 
          className="bg-gray-700 text-gray-100 border-gray-600"
          onChange={(e) => {
            setState((state) => {
              state.email = e.target.value;
              return state
            })
          }}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          className="bg-gray-700 text-gray-100 border-gray-600"
          onChange={(e) => {
            setState((state) => {
              state.password = e.target.value;
              return state;
            })
          }}
        />
      </div>
    </form>
  );
};

const SignUpForm = ({setState}) => {
  return (
    <form>
      <div className="space-y-4">
        <Input 
          type="text" 
          placeholder="Username" 
          className="bg-gray-700 text-gray-100 border-gray-600"
          onChange={(e) => { 
            setState((state) => {
              state.username = e.target.value;
              return state
            })
           }}
        />
        <Input 
          type="email" 
          placeholder="Email" 
          className="bg-gray-700 text-gray-100 border-gray-600"
          onChange={(e) => { 
            setState((state) => {
              state.email = e.target.value;
              return state
            })
           }}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          className="bg-gray-700 text-gray-100 border-gray-600"
          onChange={(e) => { 
            setState((state) => {
              state.password = e.target.value;
              return state
            })
           }}
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

async function handleSignup( {username, email, password } ) {
    const { data } = await axios.post("/api/auth", {
        loginType: "signup",
        username: username,
        email: email,
        password: encrypt(password, "passcode"),
    })

    return data;
}

async function handleLogin({email, password}) {
    const { data } = await axios.put("/api/auth", {
      loginType: "login",
      email: email,
      password: encrypt(password, "passcode"),
    })

    return data;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const [signUp, setSignup] = useState({});
  const [loginState, setLogin] = useState({});

  useEffect(() => {
    const user_token = cookieStore.get("user")
    
    if (user_token) {
      router.push("/")
    }
  }, [])


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
          {isLogin ? <LoginForm setState={setLogin} /> : <SignUpForm setState={setSignup} />}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
            if (!isLogin) {
                handleSignup(signUp).then(({success}) =>{
                  if (success === true) {
                    return router.push("/")
                  }
                });
            } else {
              handleLogin(loginState).then(({success, message}) => {
                if (success === true) {
                  return router.push("/")
                }
              });
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
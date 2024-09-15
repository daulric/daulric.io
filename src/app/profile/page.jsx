"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Github, MapPin, Calendar, LogOut } from 'lucide-react'

import { SupabaseClient } from "@/components/SupabaseClient"

export default async function ProfilePage() {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://github.com/shadcn.png",
    bio: "Full-stack developer | Open source enthusiast",
    location: "San Francisco, CA",
    joinDate: "Joined September 2021",
    githubUsername: "janedoe"
  }

  const supa_client = SupabaseClient();

  supa_client.auth.onAuthStateChange((event, session) => {
    console.log("Auth event:", event);
    if (event === "SIGNED_IN") {
      console.log("User signed in:", session);
    }
  });
  
  const { data: sessionData, error: sessionError } = await supa_client.auth.getSession();
  
  if (sessionError || !sessionData.session) {
    console.error("No active session or session error:", sessionError);
    return <div><a href="/login">Please log in</a></div>;
  }

  const { data: userData, error: userError } = await supa_client.auth.getUser();
  
  if (userError) {
    console.error("Error fetching user:", userError);
    return <div>Failed to load user profile</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-bold text-gray-100">{user.name}</CardTitle>
          <CardDescription className="text-gray-400">{user.bio}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Github className="w-4 h-4" />
            <span>{user.githubUsername}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>{user.joinDate}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="bg-gray-700 text-white">React</Badge>
            <Badge variant="secondary" className="bg-gray-700 text-white">Node.js</Badge>
            <Badge variant="secondary" className="bg-gray-700 text-white">TypeScript</Badge>
            <Badge variant="secondary" className="bg-gray-700 text-white">Next.js</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
            Edit Profile
          </Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
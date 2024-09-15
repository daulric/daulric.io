// app/auth/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"

import { SupabaseClient } from "@/components/SupabaseClient"

export default function AuthPage() {
    const supa_client = SupabaseClient();

    const handleGithubSignIn = async () => {
        const { error } = await supa_client.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${window.location.origin}/profile`
          }
        })

        if (error) {
          console.error('Error signing in with GitHub:', error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <Card className="w-[350px] bg-gray-800 border-gray-700">
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center text-gray-50">Sign in</CardTitle>
                <CardDescription className="text-center text-gray-400">
                    Choose your preferred sign-in method
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                <Button variant="outline" onClick={handleGithubSignIn} className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                </Button>
                <Button variant="outline" onClick={() => console.log("Google sign-in")} className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-gray-400 text-center">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </div>
                </CardFooter>
            </Card>
        </div>
    )
}
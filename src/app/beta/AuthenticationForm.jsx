"use client"

import { useState, useEffect } from "react"
import crypto from "crypto"
import { SupabaseClient } from "@/components/SupabaseClient"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function BetaAuthPage({ setAuthed, secret }) {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supa_db = SupabaseClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Handling Auth
      if (password === secret) {
        setAuthed(true)
        document.cookie = `beta_access=${crypto.randomBytes(64).toString("hex")}`
        console.log("access granted!")
        toast({
          title: "Access Granted",
          description: "Welcome to the beta!",
          variant: "default",
        })
      } else {
        throw new Error('Incorrect password')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-800">
      <CardHeader className="bg-gray-800">
        <CardTitle className="text-2xl font-bold text-center text-gray-50">Beta Access</CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-800">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <Button 
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
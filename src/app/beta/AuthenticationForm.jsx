"use client"

import { useEffect, useState } from "react"
import crypto from "crypto"
import {SupabaseClient} from "@/components/SupabaseClient"

export default function BetaAuthPage({setAuthed}) {

    const [password, setPassword] = useState('');

    const supa_db = SupabaseClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let secret;
        // Handling Password
        const {data, error} = await supa_db.from("live_creds").select("*").eq("name", "beta_pwd");
        if (error) console.log(error);
        secret = data[0].secret;

        // Handling Auth
        if (password === secret) {
            setAuthed(true)
            document.cookie = `beta_access=${crypto.randomBytes(64).toString("hex")}`
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            />
            <button 
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Submit
            </button>
          </form>
    )
}
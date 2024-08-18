'use client';

import { useState } from 'react';
import BetaPage from "./BetaPage"
import AuthFormPage from "./AuthenticationForm"
import links from "./links"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400">Welcome To Beta Testing</h1>
        <h2 className="text-2xl font-semibold text-center text-blue-400">Access Preview Features on this Site</h2>
        {!isAuthenticated ? (
          <AuthFormPage setIsAuthenticated={setIsAuthenticated} />
        ) : (
            <BetaPage links={links} />
        )}
      </div>
    </div>
  );
}
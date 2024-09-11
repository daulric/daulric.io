import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function BetaPage({ links }) {
  return (
    <div className="container mx-auto py-8 bg-gray-800 text-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((link, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors duration-300">
            <a href={link.url || "#"} className="block h-full">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl text-blue-400">{link.icon}</span>
                  <div>
                    <CardTitle className="text-xl font-medium text-blue-300">
                      {link.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {link.description}
                </CardDescription>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
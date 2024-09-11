const items = [
  {title: "I am Easy Going", description: "I am an easy going person, usually friendly and straight forward with people."},
  { title: "Vast Knowledge", description: "I have a great knowledge about certain topics and situations." },
  { title: "I am a Developer", description: "I am a developer with some years of experience in Backend Technologies." },
]

interface Items {
  title: string;
  description: string;
}

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Features({title, items}: {items: Items[], title: string}) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-50">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((feature, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-50">{feature.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Home() {

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">welcome to daulric den</h1>
            <p className="text-xl mb-8">i making never ending projects</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="https://instagram.com/ulricaird" target="_blank">
                Follow Me
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Features items={items} title="Quick Rundown About Me" />
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/message">Message Me</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
import Image from "next/image";

// app/page.js
import Link from 'next/link';
import { title } from "process";

const items = [
  { title: "Easy Integration", description: "Seamlessly integrate with your existing systems" },
  { title: "Powerful Analytics", description: "Gain insights with our advanced analytics tools" },
  { title: "24/7 Support", description: "Round-the-clock support to assist you anytime" }
]

interface Items {
  title: string;
  description: string;
}

function Features(props: { items: Items[], title: string }) {

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">{props.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((feature, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to daulric den</h1>
            <p className="text-xl mb-8">Get Some Useful Stuff Done!</p>
            <Link href="/signup" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Features items={items} title="Key Features" />
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers and take your business to the next level.</p>
          <Link href="/contact" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

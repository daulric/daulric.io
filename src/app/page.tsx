import Link from 'next/link';

const items = [
  {title: "I am Easy Going", description: "I am an easy going person, usually friendly and straight forward with people."},
  { title: "Vast Knowledge", description: "I have a great knowledge about certain topics and situations." },
  { title: "I am a Developer", description: "I am a developer with some years of experience in Backend Technologies." },
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
            <h1 className="text-5xl font-bold mb-6">welcome to daulric den</h1>
            <p className="text-xl mb-8">View Some Information About Me</p>
            <Link href="https://instagram.com/ulricaird" target="_blank" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
              follow me
            </Link>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Explore</h2>
          <Link href="/message" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
            message me
          </Link>
        </div>
      </section>
    </div>
  );
}

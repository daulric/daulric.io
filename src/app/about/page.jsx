import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';

import Link from 'next/link';
import whatido from "./whatido"
import connections from "./connect"

export const metadata = {
    title: 'Ulric - About Me',
    description: 'Lets Talk About Ulric',
}

export default function AboutPage() {
  return (
    <div className={` bg-gradient-to-br from-gray-900 via-purple-800 to-pink-600 min-h-screen`}>
        <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="relative h-64 sm:h-80">
                <Image
                    src="/images/daulricbanner.png"
                    alt="Cover Image"
                    fill
                    style={{objectFit: "cover"}}
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-2">Ulric</h1>
                    <p className="text-xl">Developer in the Making...</p>
                </div>
            </div>

            <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center mb-10">
                <Image
                src="/images/profile.jpg"
                alt="John Doe"
                width={150}
                height={150}
                className="rounded-full border-4 border-blue-400 shadow-lg mb-4 sm:mb-0 sm:mr-6"
                />
                <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Hello! I am Ulric and I am currently a Student at the TA Marryshow Community College.
                    I always have an interest in Programming and Web Development.
                </p>
                </div>
            </div>

            <section className="mb-12">
                <SectionTitle>My Background</SectionTitle>
                <p className="text-gray-600 mb-4">
                With over 5+ years of experience, starting at the age of 14, I have been creating projects and experimenting
                new technologies.
                </p>
                <div className="mt-6 bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                <Image
                    src="/images/meeting_the_pm.jpg"
                    alt="Career Highlight"
                    width={600}
                    height={400}
                    className="rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                    Met the Prime Minister in 2023. (idk what to put here)
                </p>
                </div>
            </section>

            <section className="mb-12">
                <SectionTitle>What I Do</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whatido.map((skills) => (
                    <div key={skills.skill} className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-blue-700">{skills.skill}</h3>
                    <p className="text-gray-600">{skills.worked}</p>
                    </div>
                ))}
                </div>
            </section>

            <section>
                <SectionTitle>Let's Connect!</SectionTitle>
                <p className="text-gray-600 mb-4">
                I am always willing to connect and collaborate with others. Hit me up; we'll make this happen.
                </p>
                <div className="flex space-x-4">
                {connections.map((social) => (
                    <Link
                    key={social.name}
                    href={social.url}
                    className={`${social.color} text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300`}
                    >
                    {social.name}
                    </Link>
                ))}
                </div>
            </section>
            </div>
        </div>
        </main>
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import whatido from "./whatido";
import connections from "./connect";

export const metadata = {
    title: 'Ulric - About Me',
    description: 'Lets Talk About Ulric',
}

function SectionTitle({ children }) {
  return <h2 className="text-2xl font-bold mb-4 text-gray-100">{children}</h2>;
}

export default function AboutPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="bg-gray-800 shadow-xl overflow-hidden border-gray-700">
          <div className="relative h-64 sm:h-80">
            <Image
              src="/images/daulricbanner.png"
              alt="Cover Image"
              fill
              style={{objectFit: "cover"}}
              priority
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Ulric</h1>
              <p className="text-xl">Developer in the Making...</p>
            </div>
          </div>

          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center mb-10">
              <Image
                src="/images/profile.jpg"
                alt="Ulric"
                width={150}
                height={150}
                className="rounded-full border-4 border-blue-400 shadow-lg mb-4 sm:mb-0 sm:mr-6"
                priority
              />
              <div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Hello! I am Ulric and I am currently a Student at the TA Marryshow Community College.
                  I always have an interest in Programming and Web Development.
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            <section className="mb-12">
              <SectionTitle>My Background</SectionTitle>
              <p className="text-gray-300 mb-4">
                With over 5+ years of experience, starting at the age of 14, I have been creating projects and experimenting
                new technologies.
              </p>
              <Card className="mt-6 bg-gray-700 border-gray-700">
                <CardContent className="p-4 flex flex-col items-center">
                  <Image
                    src="/images/meeting_the_pm.jpg"
                    alt="Career Highlight"
                    width={600}
                    height={400}
                    className="rounded-lg"
                    priority
                  />
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Met the Prime Minister in 2023. (idk what to put here)
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-8" />

            <section className="mb-12">
              <SectionTitle>What I Do</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whatido.map((skills) => (
                  <Card key={skills.skill} className="bg-gray-700 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-300">{skills.skill}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{skills.worked}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            <section>
              <SectionTitle>Let's Connect!</SectionTitle>
              <p className="text-gray-300 mb-4">
                I am always willing to connect and collaborate with others. Hit me up; we'll make this happen.
              </p>
              <div className="flex flex-wrap gap-4">
                {connections.map((social) => (
                  <Button
                    key={social.name}
                    asChild
                    variant="outline"
                    className={`${social.color} hover:opacity-90 transition duration-300 border-gray-700`}
                  >
                    <Link href={social.url}>
                      {social.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
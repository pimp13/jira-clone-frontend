import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Server, Terminal, Cpu } from "lucide-react";
import Link from "next/link";




export default function IntroPage() {
  const skills = [
    { name: "Golang", icon: Code },
    { name: "Linux", icon: Terminal },
    { name: "DevOps", icon: Server },
    { name: "Python", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "Next.js / React.js", icon: Cpu },
  ];

  return (

    <main>
      <div className="min-h-screen bg-linear-to-r from-indigo-100 via-white to-indigo-50 flex flex-col justify-center items-center p-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900">
            Hi, I'm a Golang Developer
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Passionate about Linux and DevOps. I love building efficient, scalable backend systems and modern web apps.
          </p>
          <div className="mt-4">
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Link href="/dashboard">
                Explore My Skills
              </Link>
            </Button>
          </div>
        </div>

        {/* Skills Section */}
        <div
          id="skills"
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card key={skill.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center space-y-3 p-6">
                  <Icon className="w-10 h-10 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                  <p className="text-gray-600 text-sm text-center">
                    {skill.name === "Golang"
                      ? "Expert in building high-performance backend systems"
                      : skill.name === "Linux"
                        ? "Proficient with Linux server environments and shell scripting"
                        : skill.name === "DevOps"
                          ? "Skilled in CI/CD pipelines and deployment automation"
                          : skill.name === "Python"
                            ? "Able to build scripts, automation, and web services"
                            : skill.name === "TypeScript"
                              ? "Building modern web apps with type safety"
                              : "Experienced in Next.js & React.js for frontend & fullstack apps"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

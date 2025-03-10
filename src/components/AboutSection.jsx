import Image from 'next/image';

export default function AboutSection() {
  // Skills array with categories
  const skills = {
    frontend: ['React', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase'],
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Docker']
  };

  return (
    <section id="about" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            {/* Profile image placeholder - replace with your actual image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              {/* Uncomment and update with your image path when available */}
              {/* <Image 
                src="/profile.jpg" 
                alt="DIBSTER" 
                fill 
                className="object-cover"
              /> */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Profile Image
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-lg mb-4">
              I'm a passionate full-stack developer with a love for creating elegant, efficient, and user-friendly web applications. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life through code.
            </p>
            <p className="text-lg mb-4">
              My journey in software development began with a curiosity about how websites work, which led me to dive deep into web technologies and programming languages. I'm constantly learning and exploring new technologies to stay at the forefront of web development.
            </p>
            <p className="text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.
            </p>
          </div>
        </div>
        
        {/* Skills section */}
        <div>
          <h3 className="text-2xl font-bold mb-6">My Skills</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-3">Backend</h4>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-3">Tools & Others</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
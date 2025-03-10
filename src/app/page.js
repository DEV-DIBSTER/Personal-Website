import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">DIBSTER</h1>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-6">Hey, I'm DIBSTER 👋</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A passionate full-stack developer crafting digital experiences
          </p>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View my work
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section Placeholder */}
      <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will be added here */}
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations
          </p>
          {/* Contact form will be added here */}
        </div>
      </section>
    </div>
  );
}

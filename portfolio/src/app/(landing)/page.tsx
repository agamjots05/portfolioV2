export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white">
            Hello
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Welcome to my portfolio. The light rays above will guide you through this journey.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            I'm a passionate developer who loves creating beautiful and functional web experiences. 
            Notice how the light rays continue to flow down from the top as you scroll through the content.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            My Work
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Here you'll find examples of my projects and the technologies I work with. 
            The lighting effect creates a beautiful backdrop for showcasing creative work.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Contact
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to work together? Let's create something amazing. 
            The light rays symbolize the path forward in our collaboration.
          </p>
        </div>
      </section>
    </div>
  );
}
    


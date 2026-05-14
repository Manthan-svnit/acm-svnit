export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-acm-bg-dark text-white p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Welcome to <span className="text-acm-accent">ACM SVNIT</span>
        </h1>
        <p className="text-lg md:text-2xl text-acm-gray mb-10 max-w-2xl mx-auto">
          We are currently building the next generation platform for our student chapter.
        </p>
        <button className="bg-acm-primary hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
          Explore Chapter
        </button>
      </div>
    </section>
  );
}
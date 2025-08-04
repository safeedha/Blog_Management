
import {useNavigate} from 'react-router-dom'

const blogs = [
  {
    title: "10 Essential Tips for Successful Blogging",
    summary: "Discover strategies to grow your audience and boost engagement.",
    image: "https://images.unsplash.com/photo-1522202195468-5bd54845f5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Planning Your Blog Content Like a Pro",
    summary: "Stay ahead with content calendars and consistent scheduling.",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "SEO Strategies Every Blogger Should Know",
    summary: "Rank higher on search engines with optimized blog content.",
    image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=400&q=80",
  },
];

export default function LandingPage() {
     const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight animate-rotate-y">BlogMaster</h1>
        <button  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
     onClick={() => navigate('/login')}>
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 md:px-16 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-snug transition duration-1000 animate-fade-down">
          Your All‑in‑One Blog Management Platform
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto transition-opacity duration-1000 delay-300">
          Draft, schedule, and analyze your blog content with ease.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 text-lg rounded-md hover:scale-105 hover:bg-blue-700 transition-all duration-300">
          Start for Free
        </button>
      </section>

      {/* Blog Preview Section */}
      <section className="px-6 md:px-16 py-12 grid gap-8 md:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform duration-500 hover:scale-105 animate-fadeIn delay-100"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm">{blog.summary}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t mt-10">
        © 2025 BlogMaster. All rights reserved.
      </footer>
    </div>
  );
}

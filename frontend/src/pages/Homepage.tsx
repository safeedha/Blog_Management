import Navbar from '../component/Navbar'
import { useState, useEffect } from 'react'
import { getAllblogs } from '../api/blog'
import type{IBlog} from '../types'
const HomePage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [selectedBlog, setSelectedBlog]=useState<IBlog>()

  useEffect(() => {
    const getAllblog = async () => {
      try {
        const result = await getAllblogs();
        setBlogs(result);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    getAllblog();
  }, []);
  
  useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [isModalOpen]);
  const postHandle=(blog:IBlog)=>{
  setSelectedBlog(blog);
  setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />
      <main className="p-6 flex-1">
        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">All Blogs</h1>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border-l-4 border-indigo-400 rounded-xl shadow-md p-5 hover:shadow-xl transition transform hover:-translate-y-1"
                onClick={()=>postHandle(blog)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="rounded-md mb-4 w-full h-44 object-cover"
                />
                <h2 className="text-xl font-bold mb-1 text-gray-800">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                 {blog.createdAt ? new Date(blog.createdAt).toLocaleString() : "Date not available"} by <span className="font-medium text-indigo-600">{typeof blog.userId === 'object' && blog.userId?.username}</span>
                </p>
                <p className="text-gray-700">{blog.content.slice(0,78)}...</p>
              </div>
            ))}
          </div>
        )}
      </main>


      {isModalOpen && selectedBlog && (
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl">
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
          <img
            src={selectedBlog.image}
            alt={selectedBlog.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">{selectedBlog.title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {selectedBlog.createdAt ? new Date(selectedBlog.createdAt).toLocaleString() : "Date not available"} by{' '}
            <span className="font-medium text-indigo-600">
              {typeof selectedBlog.userId === 'object' && selectedBlog.userId?.username}
            </span>
          </p>
          <p className="text-gray-800 whitespace-pre-line">{selectedBlog.content}</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default HomePage;

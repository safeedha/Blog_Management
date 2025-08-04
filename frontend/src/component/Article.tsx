import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllblogByUser, deleteblogs,update } from '../api/blog';
import type { IBlog } from '../types';
import { toast } from 'react-toastify';

function Article() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [blogId,setblogId]=useState<string>("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", imagePreview as string);
    formData.append("upload_preset", "products");
     console.log(image)
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dwerqkqou/image/upload",
      formData
    );
    const uploadedUrl: string = response.data.secure_url;
    console.log(uploadedUrl);
    const result=await update(blogId,title, content, category, uploadedUrl)
    if(result==='Report updated successfully')
    {
      toast.success("Blog updated successfully ")
      setEdit(false)
    }
  };

  useEffect(() => {
    const getAllblogByuser = async () => {
      const result = await getAllblogByUser();
      setBlogs(result);
    };
    getAllblogByuser();
  }, [edit]);

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      await deleteblogs(blogToDelete);
      setBlogs(prev => prev.filter(blog => blog._id !== blogToDelete));
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  const editHandle = (blog: IBlog) => {
  setEdit(true);
  setTitle(blog.title);
  setContent(blog.content);
  setCategory(blog.category);
  setImagePreview(blog.image)
  setblogId(blog._id as string)
  };

  return (
    <div className="p-2">
      {!edit && (
        <>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{blog.content.slice(0,78)}...</p>
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                      onClick={() => editHandle(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setBlogToDelete(blog._id as string);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {edit && (
        <form
          className="bg-white relative rounded-lg shadow-lg p-6 space-y-6 mt-8"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold focus:outline-none"
            aria-label="Close"
          >
            close
          </button>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white"
        
            />
            {imagePreview && (
              <img
                src={imagePreview as string}
                alt="Preview"
                className="mt-4 rounded-md w-full h-40 object-contain border"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Write your blog content..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            >
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="fitness">Fitness</option>
              <option value="personal">Personal Growth</option>
              <option value="food">Food</option>
              <option value="news">News</option>
              <option value="fashion">Fashion</option>
              <option value="coding">Coding</option>
            </select>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition font-semibold"
            >
              Publish Blog
            </button>
          </div>
        </form>
      )}

      {/* ✅ Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Article;

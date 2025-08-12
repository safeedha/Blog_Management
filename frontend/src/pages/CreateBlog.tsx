import { useState } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { create } from '../api/blog';
import { toast } from 'react-toastify';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false); // 👈 Spinner control

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('this is file', file);
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


    if (title.trim().length < 5 || title.trim().length > 100) {
      toast.error("Title must be between 5 and 100 characters");
      return;
    }

 
    if (content.trim().length < 20 || content.trim().length > 5000) {
      toast.error("Content must be between 20 and 5000 characters");
      return;
    }

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "products");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwerqkqou/image/upload",
        formData
      );

      const uploadedUrl: string = response.data.secure_url;
      console.log("Uploaded URL:", uploadedUrl);

      const result = await create(title, content, category, uploadedUrl);

      if (result === 'report created') {
        toast.success("Blog created");

        setTitle('');
        setContent('');
        setCategory('');
        setImage(undefined);
        setImagePreview(null);
      } else {
        toast.error(result);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />
      <main className="p-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">Create New Blog</h1>

        <form className="bg-white rounded-lg shadow-lg p-6 space-y-6" onSubmit={handleSubmit}>
 
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
              required
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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
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
              disabled={loading}
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateBlog;

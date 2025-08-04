import  { useState } from 'react';
import Navbar from '../component/Navbar';
import UpdateProfile from '../component/UpdateProfile';
import ChangePassword from '../component/ChangePassword';
import Articles from '../component/Article';

function Profile() {
  const [selectedTab, setSelectedTab] = useState<'update' | 'picture' | 'articles'>('update');

  const renderContent = () => {
    switch (selectedTab) {
      case 'update':
        return <UpdateProfile />;
      case 'picture':
        return <ChangePassword />;
      case 'articles':
        return <Articles />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Profile Actions */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setSelectedTab('update')}
            className={`px-4 py-2 rounded ${
              selectedTab === 'update' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            } shadow`}
          >
            Update Profile
          </button>
          <button
            onClick={() => setSelectedTab('picture')}
            className={`px-4 py-2 rounded ${
              selectedTab === 'picture' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            } shadow`}
          >
            Change Profile password
          </button>
          <button
            onClick={() => setSelectedTab('articles')}
            className={`px-4 py-2 rounded ${
              selectedTab === 'articles' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            } shadow`}
          >
            Articles
          </button>
        </div>

        <div className=" p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Profile;

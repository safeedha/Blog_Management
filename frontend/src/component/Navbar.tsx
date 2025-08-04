import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {useEffect,useState} from 'react'
import {getUser} from '../api/profile'

function Navbar() {
  const navigate = useNavigate();
  const [name,setName]=useState('')
  useEffect(()=>{
   const getUserdetail=async()=>{
      const result=await getUser()
      setName(result.username)
   }
   getUserdetail()
  },[])
  const handleUserIconClick = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleCreateClick = () => {
    navigate('/create');
  };
   const logout=()=>{
    localStorage.removeItem('authToken')
    navigate('/')
   }

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 shadow-md flex-wrap gap-4 text-white">
      <h2 className="text-xl font-bold">Welcome, {name} 👋</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <FaUserCircle
          size={28}
          className="text-white cursor-pointer"
          onClick={handleUserIconClick}
          aria-label="User Profile"
        />
        <button
          className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 text-sm font-semibold transition"
          onClick={handleHomeClick}
        >
          Home
        </button>
        <button
          className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 text-sm font-semibold transition"
          onClick={handleCreateClick}
        >
          Create
        </button>
        <button className="flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition" onClick={logout}>
          <FiLogOut className="mr-1" /> Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;

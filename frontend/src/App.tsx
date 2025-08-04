
import Signup from './pages/Signup'
import Login from './pages/Login'
import Landing from './pages/Landing'
import HomePage from './pages/Homepage'
import CreateBlog from './pages/CreateBlog'
import Profile from './pages/Profile'

import Loginprotect from './component/Loginprotect'
import UserProtect from './component/UserProtect'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import './App.css'

function App() {


  return (
    <>
        <BrowserRouter>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    
        />
            <Routes>
              <Route path="/" element={<Landing />} />
               <Route path="/login" element={<Loginprotect><Login /></Loginprotect>} />
              <Route path="/signup" element={<Loginprotect><Signup /></Loginprotect>} />
               <Route path="/home" element={<UserProtect><HomePage /></UserProtect>} />
                <Route path="/create" element={<UserProtect><CreateBlog/></UserProtect>} />
                <Route path="/profile" element={<UserProtect><Profile/></UserProtect>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

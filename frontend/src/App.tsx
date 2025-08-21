import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from "react";
import './App.css'

// Normal imports
import Signup from './pages/Signup'
import Login from './pages/Login'
import Landing from './pages/Landing'
import CreateBlog from './pages/CreateBlog'

import Loginprotect from './component/Loginprotect'
import UserProtect from './component/UserProtect'

// Lazy imports
const HomePage = lazy(() => import('./pages/Homepage'));
const Profile = lazy(() => import('./pages/Profile'));

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
  
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Loginprotect><Login /></Loginprotect>} />
            <Route path="/signup" element={<Loginprotect><Signup /></Loginprotect>} />
            <Route path="/home" element={<UserProtect><HomePage /></UserProtect>} />
            <Route path="/create" element={<UserProtect><CreateBlog/></UserProtect>} />
            <Route path="/profile" element={<UserProtect><Profile /></UserProtect>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App;

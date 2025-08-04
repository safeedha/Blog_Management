import { Navigate } from 'react-router-dom';
import type{ ReactElement } from 'react';
function Loginprotect({children}:{ children: ReactElement }) {
  const user=localStorage.getItem('authToken')
   if(user)
  {
    return <Navigate to='/home'/>
  }
  return children
}

export default Loginprotect
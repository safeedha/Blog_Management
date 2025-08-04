import type{ ReactElement } from 'react';
import { Navigate } from 'react-router-dom';



function UserProtect({ children }: { children: ReactElement }) {
 const user=localStorage.getItem('authToken')

  if (user) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
}

export default UserProtect;
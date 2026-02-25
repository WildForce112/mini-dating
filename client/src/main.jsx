import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import { getStoredUser } from './auth';
import './index.css'
import App from './App.jsx'
import DateGrid from './components/DateGrid.jsx'
import CreateProfile from './pages/Register.jsx'
import Login from './pages/Login.jsx';
import API from './api.js';

function Root(){
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(getStoredUser());
  const fetchProfiles = async () => {
    const res = await API.get("/profiles");
    setProfiles(res.data);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <App user={user} profiles={profiles} fetchProfiles={fetchProfiles} setUser={setUser}/> : <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <Login profiles={profiles} fetchProfiles={fetchProfiles} setUser={setUser}/>,
    },
    {
      path: "/create",
      element: <CreateProfile setProfiles={setProfiles}/>,
    },
    {
      path: "/plan",
      element: user ? <DateGrid /> : <Navigate to="/login" replace />,
    }
  ])
  return <RouterProvider router={router} />;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

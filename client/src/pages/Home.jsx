import { useEffect } from 'react'
import API from "../api"
import { useNavigate } from 'react-router';
import { setStoredUser } from '../auth';
import Profiles from '../components/Profiles';

export default function Home({ user, profiles, fetchProfiles, setUser }){
  const navigate = useNavigate()
  useEffect(() => {
    fetchProfiles();
  }, []);
  const handleLike = async (targetID) => {
    try {
      const res = await API.post("/like", {
        fromID: user,
        toID: targetID,
      });
      alert(res.data?.message);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }
  const handleLogout = () => {
    setStoredUser(null);
    setUser(null)
    navigate("/");
  }
  return (
    <div style={{
      display: "flex",
      width: "100vw",
    }}>
      <h1 style={{
        width: "30vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        margin: "0",
        position: "fixed",
      }}>Mini Dating App</h1>
      <Profiles profiles={profiles} buttonLabel="Like" handleFunction={handleLike} width="70vw"/>
      <button style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "gray",
        color: "white",
        margin: "10px",
      }} onClick={handleLogout}>Log Out</button>
    </div>
  )
}
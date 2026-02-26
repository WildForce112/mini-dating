import { useEffect, useState } from 'react'
import API from "../api"
import { useNavigate } from 'react-router';
import { setStoredUser } from '../auth';
import Profiles from '../components/Profiles';

export default function Home({ user, setUser }){
  const navigate = useNavigate()
  const [matches, setMatches] = useState([]);
  const [notMatched, setNotMatched] = useState([]);
  const fetchDiscovery = async() => {
    const res = await API.get(`/discover/${user}`);
    setMatches(res.data.matches);
    setNotMatched(res.data.notMatched);
  }
  useEffect(() => {
    fetchDiscovery();
  }, []);
  console.log(matches);
  const handleLike = async (targetID) => {
    try {
      const res = await API.post("/like", {
        fromID: user,
        toID: targetID,
      });
      alert(res.data?.message);
      await fetchDiscovery();
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
      <div style={{
          width: "30vw",
          height: "100vh",
          display: "flex",
          paddingLeft: "1vw",
          paddingRight: "1vw",
          paddingTop: "1vh",
          paddingBottom: "1vh",
          backgroundColor: "gray",
          margin: "0",
          position: "fixed",
          textAlign: "left",
          flexDirection: "column",
        }}>
        <h1 >Mini Dating App</h1>
        {matches.map((p) => (
          <div key={p.id}>
            <h3>{p.name} ({p.age}y.o)</h3>
          </div>
        ))}
      </div>
      <Profiles profiles={notMatched} buttonLabel="Like" handleFunction={handleLike} width="70vw"/>
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
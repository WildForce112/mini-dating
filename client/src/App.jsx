import { useState, useEffect } from 'react'
import API from "./api"
import ProfileForm from "./components/ProfileForm"
import './App.css'

function App() {
  const currentUserID = 1; // don't have login logic so imagine being first user
  const [profiles, setProfiles] = useState([]);
  const fetchProfiles = async () => {
    const res = await API.get("/profiles");
    setProfiles(res.data);
  }
  useEffect(() => {
    fetchProfiles();
  }, []);
  const handleLike = async (targetID) => {
    try {
      const res = await API.post("/like", {
        fromID: currentUserID,
        toID: targetID,
      });
      alert(res.data?.message);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }
  return (
    <div>
      <h1>Mini Dating App</h1>
      <ProfileForm refresh={fetchProfiles}/>
      {profiles.map((p) => (
        <div key={p.id}>
          <h3>{p.name} ({p.age})</h3>
          <p>{p.gender}</p>
          <p>{p.bio}</p>
          <p>{p.email}</p>
          <button onClick={() => handleLike(p.id)}>Like</button>
        </div>
      ))}
    </div>
  )
}

export default App

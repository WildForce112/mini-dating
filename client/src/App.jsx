import { useState, useEffect } from 'react'
import API from "./api"
import ProfileForm from "./components/ProfileForm"
import './App.css'

function App() {
  const [profiles, setProfiles] = useState([]);
  const fetchProfiles = async () => {
    const res = await API.get("/profiles");
    setProfiles(res.data);
  }
  useEffect(() => {
    fetchProfiles();
  }, []);
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
        </div>
      ))}
    </div>
  )
}

export default App

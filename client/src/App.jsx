import Home from './pages/Home';
import './App.css'

function App({ user, profiles, fetchProfiles, setUser }) {
  return(
    <Home profiles={profiles} fetchProfiles={fetchProfiles} user={user} setUser={setUser}/>
  )
}

export default App

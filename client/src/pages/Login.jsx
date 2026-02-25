import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setStoredUser } from '../auth';
import LoginAndRegisterButtons from '../components/LoginAndRegisterButtons';
import Profiles from '../components/Profiles';

export default function Login({ profiles, fetchProfiles, setUser }){
  const navigate = useNavigate()
  useEffect(() => {
    fetchProfiles();
  }, []);
  const handleLogin = (targetID) => {
    setStoredUser(targetID);
    setUser(targetID)
    navigate("/");
  }
  return(
    <div style={{
      display: "flex",
      width: "100vw",
    }}>
      <LoginAndRegisterButtons />
      <Profiles profiles={profiles} buttonLabel="Login" handleFunction={handleLogin} width="70vw" />
    </div>
  )
}
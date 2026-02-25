import { useEffect } from 'react'
import ProfileForm from "../components/ProfileForm"
import LoginAndRegisterButtons from '../components/LoginAndRegisterButtons';
import API from '../api';

export default function CreateProfile({ setProfiles }){
  const fetchProfiles = async () => {
    const res = await API.get("/profiles");
    setProfiles(res.data);
  }
  useEffect(() => {
    fetchProfiles();
  }, []);
  return(
    <div style={{
      display: "flex",
      width: "100vw",
    }}>
      <LoginAndRegisterButtons />
      <ProfileForm refresh={fetchProfiles} width="70vw"/>
    </div>
  )
}
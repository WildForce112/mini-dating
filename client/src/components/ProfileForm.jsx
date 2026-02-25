import { useState } from "react";
import API from "../api";

export default function ProfileForm({ refresh, width }){
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bio: "",
    email: "",
  })
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await API.post("/profiles", form);
      refresh();
      alert("Profile created");
    }
    catch(err){
      alert(err.response?.data?.message || "Error");
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{
      marginLeft: "30vw",
      width: width,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}>
      <div style={{
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <label htmlFor="name">Name: </label>
        <input name="name" placeholder="Name" onChange={handleChange} type="text" style={{
          width: "80%",
        }}/>
      </div>
      <div style={{
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <label htmlFor="age">Age: </label>
        <input name="age" placeholder="Age" onChange={handleChange} type="number" style={{
          width: "80%",
        }}/>
      </div>
      <select name="gender" id="gender" onChange={handleChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <div style={{
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <label htmlFor="bio">Bio: </label>
        <textarea name="bio" id="Bio" onChange={handleChange} style={{
          width: "80%",
        }} />
      </div>
      <div style={{
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <label htmlFor="email">Email: </label>
        <input name="email" placeholder="Email" onChange={handleChange} type="email" style={{
          width: "80%",
        }}/>
      </div>
      <button type="submit">Create</button>
    </form>
  )
}
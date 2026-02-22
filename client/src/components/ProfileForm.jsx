import { useState } from "react";
import API from "../api";

export default function ProfileForm({ refresh }){
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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} type="text" />
      <input name="age" placeholder="Age" onChange={handleChange} type="number" />
      <select name="gender" id="gender" onChange={handleChange}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <textarea name="bio" id="Bio" onChange={handleChange}></textarea>
      <input name="email" placeholder="Email" onChange={handleChange} type="email" />
      <button type="submit">Create</button>
    </form>
  )
}
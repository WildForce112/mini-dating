import { NavLink } from "react-router";

export default function LoginAndRegisterButtons({  }){
  return(
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "30vw",
      height: "100vh",
      backgroundColor: "gray",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}>
      <NavLink to={"/login"} style={({ isActive }) => ({
        textDecoration: "none",
      })}>
        <button style={buttonStyle}>Login</button>
      </NavLink>
      <NavLink to={"/create"} style={({ isActive }) => ({
        textDecoration: "none",
      })}>
        <button style={buttonStyle}>Create New Profile</button>
      </NavLink>
    </div>
  )
}

const buttonStyle = {
  padding: "10px 20px",
  cursor: "pointer",
};
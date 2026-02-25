export default function Profiles({ profiles, buttonLabel, handleFunction, width }){
  return(
    <div style={{
      marginLeft: "30vw",
      width: width,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}>
      {profiles.map((p) => (
        <div key={p.id}>
          <h3>{p.name} ({p.age}y.o)</h3>
          <p>{p.gender}</p>
          <p>{p.bio}</p>
          <p>{p.email}</p>
          <button onClick={() => handleFunction(p.id)}>{buttonLabel}</button>
        </div>
      ))}
    </div>
  )
}
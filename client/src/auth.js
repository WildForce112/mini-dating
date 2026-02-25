export function getStoredUser(){
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(id){
  localStorage.setItem("user", id);
}
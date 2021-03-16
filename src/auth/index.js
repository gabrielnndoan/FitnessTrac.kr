export function getToken() {
    const token = localStorage.getItem("token");
    return token;
  }
  
  export function login(token) {
    localStorage.setItem("token", token);
  }
  
  export function logout() {
    localStorage.removeItem("token");
  }
  
  export function getUsername(){
    return fetch(
      "https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      
  }
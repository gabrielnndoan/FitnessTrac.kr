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

export function getUsername() {
  return fetch("https://nameless-cove-00092.herokuapp.com/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

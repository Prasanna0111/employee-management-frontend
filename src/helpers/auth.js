export const isAuthenticated = () => {
  const loginDetails = localStorage.getItem("login");
  const isLoggedIn = JSON.parse(loginDetails)?.loginState;
  return isLoggedIn;
};

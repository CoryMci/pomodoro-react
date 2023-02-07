const storage = {
  getToken: () => {
    return window.localStorage.getItem("token");
  },
  setToken: (jwt) => {
    window.localStorage.setItem("token", jwt);
  },
  clearToken: () => {
    window.localStorage.removeItem("token");
  },
};

export default storage;

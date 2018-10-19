
const checkAuth = (list, auth) => {
  if(auth.key) return list;
  return list.slice(0, -1);
};

const getExistingAuth = () => {
  let existingAuth = localStorage.getItem('auth');

  if(existingAuth) {
    try {
      existingAuth = JSON.parse(existingAuth);
    } catch(error) {
      existingAuth = null;
    }
  }
  if(!existingAuth) existingAuth = {key:'', username:''};
  return existingAuth;
}

module.exports = {
    checkAuth, getExistingAuth
}
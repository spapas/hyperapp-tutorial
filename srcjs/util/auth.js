
const checkAuth = (list, auth) => {
  if(auth.key) return list;
  return list.slice(0, -1);
};


module.exports = {
    checkAuth
}
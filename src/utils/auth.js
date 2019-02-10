import GoTrue from 'gotrue-js';

const auth = new GoTrue({
  APIUrl: " https://www.rededucate.com/.netlify/identity",
  audience: "",
  setCookie: false
});

export default auth;
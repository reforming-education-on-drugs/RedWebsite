import auth from "../utils/auth";
import { routes } from "./routes";

export const generateHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  if (auth.currentUser()) {
    return auth
      .currentUser()
      .jwt()
      .then((token) => {
        return { ...headers, Authorization: `Bearer ${token}` };
      });
  }
  return Promise.resolve(headers);
};
export const generateExecutiveHeaders = async () => {
  const headers = { "Content-Type": "application/json" };
  const executives = await GetExecutives();
  console.log(executives);
  if (auth.currentUser() && executives.includes(auth.currentUser().email)) {
    return auth
      .currentUser()
      .jwt()
      .then((token) => {
        return { ...headers, Authorization: `Bearer ${token}` };
      });
  }
  return Promise.resolve(headers);
};

export const GetExecutives = async () => {
  const headers = await generateHeaders();
  return fetch(routes.getExecutives, {
    method: "GET",
    headers,
  }).then((res) => res.json());
};

export const isExecutive = async (email) => {
  const executives = await GetExecutives();
  console.log(executives);
  console.log(email);
  console.log(executives.includes(email));
  return executives.includes(email);
};

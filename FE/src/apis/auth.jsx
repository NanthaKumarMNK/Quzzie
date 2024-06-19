import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URI;


export const registerUser = async ({ email, password, name, cPassword }) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const response = await axios.post(reqUrl, {
      email,
      password,
      name,
      cPassword,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

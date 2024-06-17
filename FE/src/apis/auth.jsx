import axios from "axios";
const backendUrl = "http://localhost:8000/api/v1";

export const registerUser = async ({ email, password, name, cPassword }) => {
  try {
    const reqUrl = `http://localhost:8000/api/v1/auth/register`;
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
    const reqUrl = `http://localhost:8000/api/v1/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

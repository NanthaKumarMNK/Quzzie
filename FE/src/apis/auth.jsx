import axios from "axios";
// const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({ email, password, name,cPassword }) => {
    try {
       
        const reqUrl = 'http://localhost:8000/api/v1/auth/register';
        const response = await axios.post(reqUrl, { email, password, name,cPassword });
        return response.data;
    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
};

export const loginUser = async ({email, password}) => {
    try {
        console.log({email, password})
        const reqUrl = `http://localhost:8000/api/v1/auth/login`;
        const response = await axios.post(reqUrl, { email, password })
        return response.data;
    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
};


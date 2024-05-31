import axios from "axios";
// const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getTrendingQuiz = async () => {
    try {
        const reqUrl = `http://localhost:8000/api/v1/quiz/trending_quiz`;
        // const token = localStorage.getItem("token");
        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(reqUrl);
        return response.data.Trending;
    } catch (error) {
        console.log(error);
       
    }
};

export const getUserQuiz = async (quizId) => {
    try {
        const reqUrl = `http://localhost:8000/api/v1/quiz/user_quiz:${quizId}`;
        const response = await axios.get(reqUrl);
        return(response.data.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const getImpression = async (quizId) => {
    try {
        const reqUrl = `http://localhost:8000/api/v1/quiz/get_impression:${quizId}`;
        const response = await axios.get(reqUrl);
        return(response.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const getQuiz = async (quizId) => {
    try {
        const reqUrl = `http://localhost:8000/api/v1/quiz/quiz:${quizId}`;
        const response = await axios.get(reqUrl);
       return (response.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const putImpression = async (quizId,selectedOption) => {
    try {
        
        const reqUrl = `http://localhost:8000/api/v1/quiz/post_impression:${quizId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(reqUrl,selectedOption);
        return response.data.message;
    } catch (error) {
        console.log(error);
       
    }
};


export const deleteQuiz = async (quizId) => {
    try {
        const reqUrl = `http://localhost:8000/api/v1/quiz/delete_quiz:${quizId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.delete(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
       
    }
};

export const postCreateQuiz = async () => {
    try {
        const reqUrl = `http://localhost:8000/api/v1/quiz/create_quiz`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
       
    }
};
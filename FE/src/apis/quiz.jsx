import axios from "axios";
const backendUrl = "http://localhost:8000/api/v1" ;

export const getTrendingQuiz = async () => {
    try {
        const reqUrl = `${backendUrl}/quiz/trending_quiz`;
        const response = await axios.get(reqUrl);
        return response.data.Trending;
    } catch (error) {
        console.log(error);
       
    }
};

export const getUserQuiz = async (quizId) => {
    try {
        const reqUrl = `${backendUrl}/quiz/user_quiz:${quizId}`;
        const response = await axios.get(reqUrl);
        return(response.data.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const getImpression = async (quizId) => {
    try {
        const reqUrl = `${backendUrl}/quiz/get_impression:${quizId}`;
        const response = await axios.get(reqUrl);
        return(response.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const getQuiz = async (quizId) => {
    try {
        const reqUrl = `${backendUrl}/quiz/quiz:${quizId}`;
        const response = await axios.get(reqUrl);
       return (response.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const getUserQuizById = async (stateId) => {
    try {
        const reqUrl = `${backendUrl}/quiz/get_quiz_byID:${stateId}`;
        const response = await axios.get(reqUrl);
       return (response.data.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const getLastQuizIdByUser = async (userId) => {
    try {
        const reqUrl = `${backendUrl}/quiz/get_last_quiz:${userId}`;
        const response = await axios.get(reqUrl);
       return (response.data) ;
    } catch (error) {
        console.log(error);
       
    }
};

export const putImpression = async (quizId,selectedOption) => {
    try {
        const reqUrl = `${backendUrl}/quiz/post_impression:${quizId}`;
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
        const reqUrl = `${backendUrl}/quiz/delete_quiz:${quizId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.delete(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
       
    }
};

export const postCreateQuiz = async (questionNumber) => {
    try {
        const reqUrl = `${backendUrl}/quiz/create_quiz`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(reqUrl,questionNumber);
        return response.data;
    } catch (error) {
        console.log(error);
       
    }
};

export const putEditQuiz = async (quizId,questionNumber) => {
    try {
        const reqUrl = `${backendUrl}/quiz/edit_quiz:${quizId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(reqUrl,questionNumber); 
        return response.data;
    } catch (error) {
        console.log(error);
       
    }
};
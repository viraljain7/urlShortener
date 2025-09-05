import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (email,password) => {
        const data = await axiosInstance.post("/api/auth/login", {email,password });
        return data.data;
    
}

export const registerUser = async (email,password,name) => {
    const data = await axiosInstance.post("/api/auth/register", {email,password,name });
    return data.data;

}

export const logout = async () => {
    const data = await axiosInstance.get("/api/auth/logout");
    return data.data;

}




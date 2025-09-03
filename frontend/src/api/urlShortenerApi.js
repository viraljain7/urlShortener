import axiosInstance from '../utils/axiosInstance';
export const createShortUrl = async (originalUrl) => {
        const data = await axiosInstance.post("/api/create", { url: originalUrl });
        return data.data;
    
}

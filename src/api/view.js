import axios from "axios";
import ApiPath from "./apiPaths";

export const addViewApi = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.post(ApiPath.addView, {}, config);
        return response;
    } catch (error) {
        console.error('Error in addViewApi:', error);
        throw error;
    }
};

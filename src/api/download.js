import axios from "axios"
import ApiPath from "./apiPaths"

export const getDownloadTotalApi = async (date) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.get(`${ApiPath.getTotalDownload}${date}`, config)
        return response?.data?.data
    } catch (error) {
        console.error(error);
        return false
    }
}

export const addDownloadTotalApi = async (data) => {
    //console.log(data);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await axios.post(`${ApiPath.addTotalDownload}`, data, config);
        return response
    } catch (error) {
        console.error(error);
        return false;
    }
};

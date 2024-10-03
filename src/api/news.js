import axios from "axios";
import ApiPath from "./apiPaths";
import { getHeaderConfig } from "../helpers";


export const getNewsApi = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.get(ApiPath.getNews, config)
        // console.log("response?.data?.data", response?.data?.data)
        return response?.data?.data
    } catch (error) {
        //console.log("Error getNews =>", error);
        throw error
        return false
    }
}

export const addNewsApi = async (data) => {
    const token = localStorage.getItem("token");
    const headerConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    };

    const formData = new FormData();
    formData.append("title", data?.title || "");
    formData.append("detail", data?.detail || "");
    formData.append("image", data?.image || "");
    formData.append("file", data?.file || "");

    try {
        const response = await axios.post(ApiPath.addNews, formData, headerConfig);
        // //console.log("res of AddProductApi =>> ", response);
        return response;
    } catch (error) {
        //console.log("error occurred in AddProductApi ==> ", error);
        return false;
    }
};

export const delNewsApi = async (id) => {
    try {
        const response = await axios.delete(`${ApiPath.delNews}/${id}`, getHeaderConfig())
        return response
    } catch (error) {
        console.error("Error in delNewsApi =>", error);
        return false;
    }
}

export const updateNewsApi = async (id, data) => {
    const token = localStorage.getItem("token");
    const headerConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    };
    const formData = new FormData();
    formData.append("title", data?.title || "");
    formData.append("detail", data?.detail || "");
    // formData.append("image", data?.image || "");
    // formData.append("file", data?.file || "");

    //console.log(data);
    try {
        const response = await axios.put(`${ApiPath.updateNews}/${id}`, formData, headerConfig)
        //console.log(response);
        return response
    } catch (error) {
        console.error("Error response updateNews", error);
    }
}

export const updateNewsImageApi = async (id, data) => {
    const token = localStorage.getItem("token");
    const headerConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    };
    const formData = new FormData();
    formData.append("image", data?.image || "");
    //console.log(data);
    try {
        const response = await axios.put(`${ApiPath.updateNewsImage}/${id}`, formData, headerConfig)
        //console.log(response);
        return response
    } catch (error) {
        console.error("Error response updateNews", error);
    }
}
export const updateNewsFileApi = async (id, data) => {
    const token = localStorage.getItem("token");
    const headerConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    };
    const formData = new FormData();
    formData.append("file", data?.file || "");
    //console.log(data);
    try {
        const response = await axios.put(`${ApiPath.updateNewsFile}/${id}`, formData, headerConfig)
        //console.log(response);
        return response
    } catch (error) {
        console.error("Error response updateNews", error);
    }
}
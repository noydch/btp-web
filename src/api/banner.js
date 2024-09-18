import axios from "axios";
import ApiPath from "./apiPaths";
import { getHeaderConfig } from "../helpers";

export const getBannerApi = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await axios.get(ApiPath.getBanner, config)
        //console.log(response?.data?.data);
        return response?.data?.data
    } catch (error) {
        console.error("Error get banner", error);
        return false
    }
}

export const delBannerApi = async (id) => {
    try {
        const response = await axios.delete(`${ApiPath.delBanner}/${id}`, getHeaderConfig())
        return response
    } catch (error) {
        console.error("Error in delBanner response=>", error);
        return false
    }
}
export const upadteSwitchBannerApi = async (id, value) => {
    const data = {
        isPublished: value
    }
    // //console.log(data);
    try {
        const response = await axios.put(`${ApiPath.updateSwitchBanner}/${id}`, data, getHeaderConfig())
        return response
    } catch (error) {
        console.error("Error switching banner");
        return false
    }
}
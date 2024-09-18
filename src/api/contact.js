import axios from "axios"
import ApiPath from "./apiPaths"


export const addContactApi = async (data) => {
    try {
        const headerConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`
            }
        }
        const formData = new FormData()
        formData.append("name", data?.name || "")
        formData.append("email", data?.email || "")
        formData.append("phoneNumber", data?.phoneNumber || "")
        formData.append("comment", data?.comment || "")
        //console.log("This data that send to backend", data);

        const response = await axios.post(ApiPath.addContact, formData, headerConfig)
        return response
    } catch (error) {
        console.error("Error in add contact in contact.js", error);
    }
}
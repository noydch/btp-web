const baseUrl = "https://scholarship-api-0oe7.onrender.com/api/v1"
// const baseUrl = "http://localhost:8000/api/v1"

export default class ApiPath {
    // about
    static getAbout = `${baseUrl}/about/selAll`
    static delAbout = `${baseUrl}/about/delete`
    static updateAbout = `${baseUrl}/about/update`
    static addCoverImage = `${baseUrl}/coverImage/insert`
    static updateCoverImage = `${baseUrl}/coverImage/updateImage`
    static getCoverImage = `${baseUrl}/coverImage/selAll`
    static getCompanyData = `${baseUrl}/companyData/selAll`
    static updateCompanyData = `${baseUrl}/companyData/update`


    // category
    static getCategory = `${baseUrl}/category/selAll`
    static addCategory = `${baseUrl}/category/insert`
    static deleteCategory = `${baseUrl}/category/delete`
    static updateCategory = `${baseUrl}/category/update`

    // service
    static getService = `${baseUrl}/services/selAll`
    static deleteSetvice = `${baseUrl}/services/delete`
    static addService = `${baseUrl}/services/insert`
    static updateService = `${baseUrl}/services/update`
    static updateServiceImage = `${baseUrl}/services/updateImage`
    static updateServiceFile = `${baseUrl}/services/updateFile`

    // news
    static getNews = `${baseUrl}/news/selAll`
    static addNews = `${baseUrl}/news/insert`
    static delNews = `${baseUrl}/news/delete`
    static updateNews = `${baseUrl}/news/update`
    static updateNewsImage = `${baseUrl}/news/updateImage`
    static updateNewsFile = `${baseUrl}/news/updateFile`

    // banner
    static getBanner = `${baseUrl}/banner/selAll`
    static delBanner = `${baseUrl}/banner/delete`
    static updateSwitchBanner = `${baseUrl}/banner/updateIsPublished`

    // contact 
    static addContact = `${baseUrl}/comment/insert`

    // user
    static getUser = `${baseUrl}/user/selAll`
    static updateUser = `${baseUrl}/user/update`
    static deleteUser = `${baseUrl}/user/delete`
    static register = `${baseUrl}/user/registor`
    static login = `${baseUrl}/user/login`

    // view
    static addView = `${baseUrl}/userview/insert`

    //download total
    static addTotalDownload = `${baseUrl}/totalDownloads/insert`
    static getTotalDownload = `${baseUrl}/totalDownloads/selByMonth?date=`
}
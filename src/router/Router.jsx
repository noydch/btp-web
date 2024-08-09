import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Post } from "../views/post/Post";
// import { PostNavbar } from "../views/post/components/PostNavbar.jsx";
import { NewsDetail } from "../views/news/components/NewsDetail.jsx";
import { News } from "../views/news/News.jsx";
import { PostDetail } from "../views/post/components/PostDetail.jsx";
import { AdsDetail } from "../views/ads/AdsDetail.jsx";
import { About } from "../views/about/About.jsx";
import { Contact } from "../views/contact/Contact.jsx";
// import { AdsDetail } from "../views/ads/AdsDetail.jsx";

export const RouterPaths = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Post />
        },
        {
            path: '/post',
            element: <Post />
        },
        {
            path: '/post/postDetail/:pID',
            element: <PostDetail />
        },
        {
            path: '/adsDetail',
            element: <AdsDetail />
        },
        {
            path: '/news',
            element: <News />
        },
        {
            path: '/news/:nID',
            element: <NewsDetail />
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path: '/contact',
            element: <Contact />
        },
    ])
    return <RouterProvider router={router} />
}
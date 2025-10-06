import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "./components/CourseCard";
import AddCourse from "./pages/AddCourse";
import Certificate from "./components/Certificate";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
// import CourseInfo from "./components/CourseInfo";
import Profile from "./components/Profile";
import Account from "./pages/Account";
import ViewTrasations from "./components/ViewTrasations";
// import MyContext from "./main";

import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
// import TempCourseAdd from "./temp/TempCourseAdd";
// import AddCourse1 from "./temp/AddCourse1";
// import TempChekbox from "./temp/TempChekbox";
import LearnCourse from "./components/LearnCourse";
import CourseProgressCard from "./components/CourseProgressCard";
import AllCourse from "./pages/AllCourse";
import NavLayout from "./layouts/NavLayout";
import ErrorPage from "./pages/ErrorPage";
import CourseInfoPage from "./pages/temp/CourseInfoPage";
import HomeAdmin from "./pages/HomeAdmin";
import HomeInstructor from "./pages/HomeInstructor";
import HomeStudent from "./pages/HomeStudent";
import CourseInfo from "./components/CourseInfo";
import CommaToTextarea from "./pages/temp/CommaToTextarea";
import ViewAllCourses from "./pages/ViewAllCourses";
import MyActivity from "./pages/MyActivity";
import QuestionTemp from "./pages/temp/QuestionTemp";
import Cart from "./pages/Cart";
import PdfOne from "./pages/temp/PdfOne";

const router = createBrowserRouter([
    // {
    //     path: "",
    //     element: <NavLayout />,
    //     errorElement: <ErrorPage />,
    //     children: [
    //         {
    //             path: "/",
    //             element: <LandingPage />,
    //         },

    //         {
    //             path: "/admin/dashboard",
    //             element: <HomeAdmin />,
    //         },

    //         {
    //             path: "/student/homepage",
    //             element: <HomeStudent />,
    //         },
    //         {
    //             path: "/student/myComplete",
    //             element: <HomeStudent />,
    //         },

    //         {
    //             path: "/instructor/addCourse",
    //             element: <AddCourse />,
    //         },
    //         {
    //             path: "/instructor/home",
    //             element: <HomeInstructor />,
    //         },

    //         {
    //             path: "/learnCourse/:courseTitle",
    //             element: <LearnCourse />,
    //         },
    //         {
    //             path: "/allCourses",
    //             element: <AllCourse />,
    //         },
    //     ],
    // },
    // {
    //     path: "/account",
    //     element: <Account />,
    // },

    // public
    {
        path: "/",
        element: <NavLayout />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/courses", element: <AllCourse /> },
            { path: "/account", element: <Account /> },
            { path: "/courses/:id", element: <CourseInfo /> },
        ],
    },

    // instructor
    {
        path: "/instructor",
        element: <NavLayout />,
        children: [
            { path: "home", element: <HomeInstructor /> },
            { path: "addCourse", element: <AddCourse /> },
            { path: "updateCourse/:id", element: <AddCourse /> },
            { path: "courses/:id", element: <CourseInfo /> },
            { path: "wallet", element: <ViewTrasations /> },
        ],
    },
    //admin
    {
        path: "/admin",
        element: <NavLayout />,
        children: [
            { path: "dashboard", element: <HomeAdmin /> },
            { path: "courses", element: <ViewAllCourses /> },
            { path: "wallet", element: <ViewTrasations /> },
            { path: "courses/:id", element: <CourseInfo /> },
            { path: "courses/learn/:id", element: <LearnCourse /> },
        ],
    },
    //student
    {
        path: "/student",
        element: <NavLayout />,
        children: [
            { path: "home", element: <HomeStudent /> },
            { path: "myActivity", element: <MyActivity /> },
            { path: "myActivity/certificate/:id", element: <Certificate /> },
            { path: "cart", element: <Cart /> },
            { path: "profile", element: <Profile /> },

            { path: "courses/:id", element: <CourseInfo /> },
            { path: "courses/learn/:id", element: <LearnCourse /> },
        ],
    },
    { path: "*", element: <ErrorPage /> },
    // {
    //   path: '/signup',
    //   element: <Signup/>
    // },
    // {
    //   path: '/dashboard',
    //   element: <Dashboard />
    // }
]);

const App = () => {
    // const {register} = useContext(MyContext)
    // console.log(register);
    return <RouterProvider router={router} />;
    // return (
    //     <>
    //         <PdfOne />
    //     </>
    // );
};

export default App;

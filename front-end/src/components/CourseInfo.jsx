import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    
    faUser,
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../main";

import { toast } from "react-toastify";

const CourseInfo = () => {
    const colors = [
        "#FF5733",
        "#3063fc",
        "#d730fc",
        "#ff1930",
        "#03968f",
        "#027d07",
        "#9e5c05",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const { id } = useParams();
    console.log(id);
    const [courseInfo, setCourseInfo] = useState(null);
    const { profile, setProfile } = useContext(MyContext);
    let { role } = useContext(MyContext);
    role = profile?.userRole || "user";

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(
                    `/skillora/user/viewCourseInfo?id=${id}`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                console.log(data.CourseInfo);
                if (data.CourseInfo) {
                    setCourseInfo(data.CourseInfo);
                }
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourse();
    }, [id]);

    const buyCourse = async () => {
        try {
            const response = await fetch(
                `/skillora/student/viewCourseDetails/buyCourse`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        CourseTitle: courseInfo.courseTitle,
                    }),
                }
            );
            console.log(response);
            const data = await response.json();
            if (data.errorMessage) {
                toast.error(data.errorMessage);
            }
            if (data.successMessage) {
                toast.success(data.successMessage);
            }
            if (role === "user") {
                toast.error("Not a loged user");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const addToCart = async () => {
        try {
            const response = await fetch(`/skillora/student/addtoCart`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ CourseTitle: courseInfo.courseTitle }),
            });
            console.log(response);
            const data = await response.json();
            if (data.errorMessage) {
                toast.error(data.errorMessage);
            }
            if (data.successMessage) {
                toast.success(data.successMessage);
            }
            if (role === "user") {
                toast.error("Not a loged user");
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (courseInfo) {
        const thumbnail_Path = `data:image/jpeg;base64,${courseInfo.thumbnail}`;
        courseInfo.ThumbnailPath = thumbnail_Path;
    }

    // console.log(role);

    return (
        <>
            {courseInfo ? (
                <div className=" pt-20 h-[1000px]  pt-30">
                    <div className="   bg-[#302E2E]">
                        <div className=" w-[83%] h-[380px] flex justify-between gap-x-3 m-auto ">
                            <div className=" py-10">
                                <div className=" h-[300px] text-white   w-[720px] flex flex-col justify-center ">
                                    <div className="w-[600px] h-[200px] ">
                                        <p className=" text-[40px] h-[200px] font-bold mt-10  overflow-y-auto  scrollbar-hide  mt-2">
                                            {courseInfo.courseTitle}
                                        </p>
                                    </div>
                                    <div>
                                        <p className=" text-[14px] w-[700px]  scrollbar-hide h-[80px]  mt-1 text-justify overflow-y-auto">
                                            {courseInfo.courseDescription}
                                        </p>
                                        <p className="text-[14px]  mt-5">
                                            Created by&nbsp;
                                            <span className="text-[18px] font-bold">
                                                {courseInfo.instructorName}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <div>
                                            <p
                                                style={{
                                                    backgroundColor:
                                                        randomColor,
                                                }}
                                                className="text-[14px] font-bold px-2  inline-block"
                                            >
                                                {courseInfo.category}
                                            </p>
                                        </div>
                                        <div className="flex mt-2 h-[50px] gap-x-10">
                                            <div className="">
                                                <FontAwesomeIcon
                                                    icon={faCircleQuestion}
                                                />
                                                <label className="ml-2 text-[14px]">
                                                    Course Level -{" "}
                                                    <span className="font-bold text-[16px]">
                                                        {courseInfo.courseLevel}
                                                    </span>
                                                </label>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                />
                                                <label className="ml-2 text-[14px]">
                                                    Target Audience -{" "}
                                                    <span className="font-bold text-[16px]">
                                                        {
                                                            courseInfo.targetAudience
                                                        }
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full  bg-white rounded-[4px] p-8 mt-12">
                                    <div className=" mt-1 ">
                                        <p className="text-[22px] font-bold">
                                            What You will Learn
                                        </p>
                                        <hr className="text-[#cdcecf] h-[2px] bg-[#cdcecf] -mx-10" />

                                        <ul>
                                            {courseInfo.courseSummery.map(
                                                (val, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {val}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-[22px] font-bold">
                                            Course Chapters
                                        </p>
                                        <hr className="text-[#cdcecf] h-[2px] bg-[#cdcecf] -mx-10" />
                                        <ul>
                                            {courseInfo.courseChapters.map(
                                                (chapter, index) => {
                                                    return (
                                                        <li key={index}>
                                                            Chapter {index + 1}{" "}
                                                            -{" "}
                                                            <span className="font-bold">
                                                                {
                                                                    chapter.ChapterName
                                                                }
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="border h-[30 0px] w-[320px] ">
                                <div className=" w-[320px] bg-white  group hover:border-[.5px] hover:border-[#969696] border-[.5px] border-white shadow-xl/30">
                                    <div className="w-full overflow-hidden ">
                                        <img
                                            src={courseInfo.ThumbnailPath}
                                            alt=""
                                            className="group-hover:scale-108 w-full h-full w-full transform transition duration-500"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <p className="text-[30px] font-bold text-[#8C1007]">
                                            ₹{courseInfo.price}
                                        </p>

                                        {role === "admin" && (
                                            <div className="flex text-center">
                                                <Link
                                                    className=" px-4 w-full py-2 rounded text-center bg-[#f57c00] font-bold text-[18px] hover:bg-[#fb8c00]"
                                                    to={`/admin/courses/learn/${id}`}
                                                >
                                                    View Chapters
                                                </Link>
                                            </div>
                                        )}

                                        {role === "instructor" && (
                                            <div className="flex text-center">
                                                <Link
                                                    state={{ courseInfo }}
                                                    to={`/instructor/updateCourse/${id}`}
                                                    className="bg-[#8e24aa] hover:bg-[#ab47bc] w-full  text-[18px] rounded-[4px] shadow-lg font-bold px-4 py-2  cursor-pointer"
                                                >
                                                    Update Course
                                                </Link>
                                            </div>
                                        )}

                                        {role !== "admin" &&
                                            role !== "instructor" && (
                                                <>
                                                    <button
                                                        className="bg-[#0066cc] hover:bg-[#3399ff] w-full text-[18px] rounded- [4px] font-bold px-4 py-2 my-2 cursor-pointer"
                                                        onClick={addToCart}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button
                                                        className="w-full border-[#0066cc] hover:border-[#ADD8E6]  hover:bg-[#ADD8E6] border-[2px] font-bold text-[16px] px-4 py-2 cursor-pointer"
                                                        onClick={buyCourse}
                                                    >
                                                        Buy Now
                                                    </button>
                                                </>
                                            )}

                                        <div className="p-2">
                                            <p className="font-bold mt-3">
                                                Course Requirements:
                                            </p>
                                            <ul>
                                                {courseInfo.courseRequirement.map(
                                                    (val, index) => {
                                                        return (
                                                            <li key={index}>
                                                                {val}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>loading</p>
            )}
        </>
    );
};

export default CourseInfo;

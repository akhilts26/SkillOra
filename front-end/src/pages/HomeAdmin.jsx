import React, { useContext, useEffect, useState } from "react";
import MyContext from "../main";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
    // const { profile, setProfile } = useContext(MyContext);
    const [submitCourse, setSubmitCourse] = useState([]);
    const [approveCourse, setApproveCourse] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch("/skillora/admin/dashboard", {
                    method: "GET",
                    credentials: "include",
                });
                // console.log(response);
                const data = await response.json();
                // console.log(data.myApprove);
                if (data.pending) {
                    // console.log("yes");
                    setApproveCourse(data.approved);
                    setSubmitCourse(data.pending);
                    setUpdateCourse(data.updated);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, []);

    submitCourse.map((course, index) => {
        if (!course.ThumbnailPath) {
            const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;
            course.ThumbnailPath = thumbnail_Path;
        }
    });
    approveCourse.map((course, index) => {
        if (!course.ThumbnailPath) {
            const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;
            course.ThumbnailPath = thumbnail_Path;
        }
    });

    return (
        <div className="pt-20 pl-10">
            <p className="font-bold text-[40px]">Courses Pending to Approve</p>
            <div className=" h-full  grid grid-cols-3 gap-y-1">
                {submitCourse.slice(0, 3).map((course) => (
                    <CourseCard key={course.courseTitle} course={course} />
                ))}
            </div>
            {submitCourse.length > 3 ? (
                <div className="text-end mx-23  mt-6">
                    <Link
                        to="/admin/courses"
                        className="py-2 px-15 rounded-[4px]  cursor-pointer text-[14px] font-bold hover:bg-[#2563eb] text-white bg-[#1e40af] "
                        state={{ courseList: submitCourse }}
                    >
                        More
                    </Link>
                </div>
            ) : (
                ""
            )}
            <p className="font-bold text-[40px] mt-10">Approved Courses</p>
            <div className=" h-full grid grid-cols-3   ">
                {approveCourse.slice(0, 3).map((course) => (
                    <CourseCard key={course.courseTitle} course={course} />
                ))}
            </div>
            {approveCourse.length > 3 ? (
                <div className="text-end mx-23  mt-6">
                    <Link
                        to="/admin/courses"
                        className="py-2 px-15 rounded-[4px]  cursor-pointer text-[14px] font-bold hover:bg-[#2563eb] text-white bg-[#1e40af] "
                        state={{ courseList: approveCourse }}
                    >
                        More
                    </Link>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default HomeAdmin;

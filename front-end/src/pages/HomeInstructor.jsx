import React, { useContext, useEffect } from "react";
import MyContext from "../main";
import { useState } from "react";
import CourseCard from "../components/CourseCard";

const HomeInstructor = () => {
    // const { profile, setProfile } = useContext(MyContext);
    const [submitCourse, setSubmitCourse] = useState([]);
    const [approveCourse, setApproveCourse] = useState([]);
    // console.log(profile.userName);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch("/skillora/instructor/homePage", {
                    method: "GET",
                    credentials: "include",
                });

                // console.log(response);
                const data = await response.json();
                // console.log("Backend Response:", data);
                // chapters = data.chapters;
                console.log(data.myApprove);
                if (data.myApprove) {

                    setApproveCourse(data.myApprove);
                    setSubmitCourse(data.mySubmit);
                } else {
                    console.log(no);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, []);
    if (submitCourse) {
        submitCourse.map((course, index) => {
            if (!course.ThumbnailPath) {
                const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;
                course.ThumbnailPath = thumbnail_Path;
            }
        });
    }
    if (approveCourse) {
        approveCourse.map((course, index) => {
            if (!course.ThumbnailPath) {
                const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;
                course.ThumbnailPath = thumbnail_Path;
            }
        });
    }
    return (
        <div className="pt-20 px-20">
            <p className="font-bold text-[40px] mt-10">Pending Approval</p>
            {submitCourse ? (
                <div className=" h-full grid grid-cols-3 mb-30">
                    {submitCourse.map((course) => (
                        <CourseCard key={course.courseTitle} course={course} />
                    ))}
                </div>
            ) : (
                <p>pending</p>
            )}

            <p className="font-bold text-[40px] mt-10">Approved Courses</p>
            <div className=" h-full grid grid-cols-3 mb-30">
                {approveCourse.map((course) => (
                    <CourseCard key={course.courseTitle} course={course} />
                ))}
            </div>
        </div>
    );
};

export default HomeInstructor;

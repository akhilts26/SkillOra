import React, { useState, useEffect, useContext } from "react";
import CourseCard from "../components/CourseCard";
import CourseProgressCard from "../components/CourseProgressCard";
import { Link } from "react-router-dom";
import MyContext from "../main";

const MyActivity = () => {
    const [purchasedCourse, setPurchasedCourse] = useState([]);
    const [completedCourse, setCompletedCourse] = useState([]);
    const { profile, setProfile } = useContext(MyContext);
    let { role } = useContext(MyContext);
    role = profile?.userRole || "user";

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch("/skillora/student/myActivity", {
                    method: "GET",
                    credentials: "include",
                });
                console.log(response);
                console.log("");
                const data = await response.json();
                if (data.courseBuy) {
                    setPurchasedCourse(data.courseBuy);
                    setCompletedCourse(data.certificate);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, [role]);

    purchasedCourse.map((course, index) => {
        // console.log(course.courseTitle);
        if (!course.ThumbnailPath) {
            const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;

            course.ThumbnailPath = thumbnail_Path;
        }
    });
    completedCourse.map((course, index) => {
        // console.log(course.courseTitle);
        if (!course.ThumbnailPath) {
            const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;

            course.ThumbnailPath = thumbnail_Path;
        }
    });
    return (
        <div className="pt-20 items center ml-20">
            <p className="font-bold text-[40px]">Purchased Courses</p>
            <div className=" flex ">
                {purchasedCourse.map((course) => (
            
                    <CourseProgressCard key={course._id} course={course} />
                    
                ))}
            </div>
            <p className="font-bold text-[40px] mt-10">Completed Courses</p>
            <div className="  flex ">
                {completedCourse.map((course) => (
                    <div key={course._id} className="mb-10  ">
                        <CourseProgressCard key={course._id} course={course}  />
                        <div className=" text-end mx-23 mt-3">
                            <Link
                                to={`/student/myActivity/certificate/${course._id}`}
                                className=" font-bold text-[14px] px-6 py-2 bg-[#4b8ef2]  hover:bg-[#1f78ff] shadow-2xl"
                            >
                                View Certificate
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyActivity;

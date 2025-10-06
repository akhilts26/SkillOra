import React from "react";
import python_course_img from "../assets/images/python.jpg";
import { Link } from "react-router-dom";

const CourseProgressCard = ({ course }) => {
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
    return (
        <Link to={`/student/courses/learn/${course._id}`}>
            <div className=" w-full mt-5">
                <div className=" w-[83%] h-[180px] m-auto bg-white hover:border-[.5px] hover:border-[#969696] border-[.5px] border-white shadow-xl/30 flex justify-between">
                    <div className="h-full w-[250px] overflow-hidden border ">
                        <img
                            src={course.ThumbnailPath}
                            alt=""
                            className="group-hover:scale-108   h-full transform transition duration-500"
                        />
                    </div>
                    <div className="p-3 w-[800px] flex flex-col justify-between">
                        <div>
                        <p className="text-[14px] px-3 font-bold   inline-block " style={{ backgroundColor: randomColor }}>
                            {/* Category */}
                            {course.category}
                        </p>
                        </div>
                        <div>
                            <p className=" text-[20px] font-bold  ">
                               
                                {course.courseTitle}
                            </p>
                            <p className=" text-[16px]  h-[70px] text-gray-900 text-justify w-[90%] scrollbar-hide  overflow-y-auto">
                               
                                {course.courseDescription}
                            </p>
                        </div>
                        <div className="flex justify-between items-center border">
                            <p>
                                by&nbsp;<span>{course.instructorName}</span>
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseProgressCard;

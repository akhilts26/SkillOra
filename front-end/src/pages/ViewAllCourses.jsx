import React, { useContext, useEffect } from "react";
import MyContext from "../main";
import CourseCard from "../components/CourseCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCaretLeft,
    faSquareCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
const ViewAllCourses = () => {
    const location = useLocation();
    const { courseList } = location.state || {};
    console.log(courseList);


    const [currentPage, setCurrentPage] = useState(1);
    const [postPerpage, setPostPerpage] = useState(6);

    const indexOfLastPost = currentPage * postPerpage;
    const indexOfFirstPost = indexOfLastPost - postPerpage;

    const currentPosts = courseList.slice(indexOfFirstPost, indexOfLastPost);
    // const totalPages = parseInt(courseList.length / postPerpage)+1 ;
    const totalPages = Math.ceil(courseList.length / postPerpage);
    

    return (
        <div className="pt-20 flex items-center mx-10">
            <div className=" w-full">
                <p className=" font-bold text-[40px] mt-10">All Coureses</p>
                <div className="  grid grid-cols-3 justify-items-center">
                    {currentPosts.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
                <div className="flex justify-center text-[18px] gap-x-2  mt-10 mb-20">
                    <button
                        onClick={() => setCurrentPage(1)}
                        className="bg-[#5c5b5b] px-4 text-white hover:bg-black cursor-pointer  rounded-[4px]"
                    >
                        First
                    </button>
                    <div className="gap-x-[1px] text-[14px]  font-bold flex ">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <FontAwesomeIcon
                                className="text-[20px] cursor-pointer hover:text-[#050f9e]"
                                icon={faSquareCaretLeft}
                            />
                        </button>
                        {new Array(totalPages).fill(0).map((_, index) => {
                            return (
                                <button
                                    className={`px-2 border rounded-[4px] border-black cursor-pointer
                                    ${
                                        currentPage === index + 1
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                    }`}
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <FontAwesomeIcon
                                className="text-[20px] cursor-pointer hover:text-[#050f9e]"
                                icon={faSquareCaretRight}
                            />
                        </button>
                    </div>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="bg-[#5c5b5b] px-4 rounded-[4px] text-white hover:bg-black cursor-pointer "
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAllCourses;

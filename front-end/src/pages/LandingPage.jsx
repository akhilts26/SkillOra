import React, { useContext, useEffect, useState } from "react";
import MyContext from "../main";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const { courses, setCourses } = useContext(MyContext);
    const [firstThree, setFirstThree] = useState([]);
    // console.log(courses);



    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch("/skillora/user/allCourses", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // console.log(response);

                const data = await response.json();
                console.log(data);

                console.log(data.Courses);
                if (data.Courses) {
                    setCourses(data.Courses);
                    setFirstThree(data.Courses.slice(0, 3));
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourse();
    }, []);

    courses.map((course, index) => {
        // console.log(course.courseTitle);
        if (!course.ThumbnailPath) {
            const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;
            course.ThumbnailPath = thumbnail_Path;
        }
    });
    

    return (
        <div className="w-full min-h-screen px-20 py-20 flex flex-col gap-4 max-md:p-0 max-md:pt-">
            <div className="w-full min-h-screen">
                <div className="w-full  h-[100vh] p-20 flex">
                    <div className="  grid justify-between">
                        <div className="">
                            <h1 className=" w-[800px] text-[80px] font-bold max-md:w-full">
                                Upskill. Reskill. Excel.
                            </h1>
                        </div>
                        <div className=" w-full text-left   ">
                            <p className="  max-md:ml-0 ml-140  text-justify ">
                                Unlock your potential with our expert-led online
                                courses designed to help you upskill and
                                reskill. Learn at your own pace, anytime and
                                anywhere, with resources that fit your
                                lifestyle. Start your journey today and take a
                                step closer to success.
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" w-[100%]   px-20 py-20 flex max-md:grid">
                    <div className="w-full ">
                        <div className=" w-full h-[100px] flex justify-between max-md:grid ">
                            <div className=" text-[24px] font-bold w-[35px] h-[40px] rounded-full flex items-center bg-black max-md:grid ">
                                <p className="ml-[9px] text-white">1</p>
                            </div>
                            <div className=" w-[48%]   h-full max-md:w-full max-md:px-3">
                                <p className="text-[24px]  font-bold">
                                    What You Looking for?
                                </p>
                                <p>
                                    Our dynamic educational platform offers you
                                    the tools and resources to propel yourself
                                    towards a brighter future.
                                </p>
                            </div>
                        </div>
                        <div className=" h-[380px] flex gap-6 mt-6 max-md:grid max-md:pt-3">
                            <div className=" w-full overflow-hidden">
                                <div className="  hover:scale-108 transform transition duration-500  h-[250px] p-[60px] bg-[#FB8500] flex flex-col  justify-between  max-md:p-[10px] max-md:flex-row">
                                    <p className="text-[24px] font-bold text-[#FFB703] ">
                                        Become an
                                    </p>
                                    <p className="bottom-0 right-0  text-[#FFB703] text-right text-[70px] font-bold">
                                        Instructor
                                    </p>
                                </div>
                                <p className="mt-2 text-[20px] font-bold">
                                    Do You Want Teach Here
                                </p>
                            </div>
                            <div className=" w-full overflow-hidden">
                                <div className=" hover:scale-108 transform transition duration-500 h-[250px] p-[60px] bg-[#D74BFA] flex flex-col justify-between ">
                                    <p className="text-[24px] font-bold text-[#EDA5FF]">
                                        Join as a
                                    </p>
                                    <p className="bottom-0 right-0  text-right text-[70px] font-bold text-[#EDA5FF]">
                                        Student
                                    </p>
                                </div>
                                <p className="mt-2 text-[20px] font-bold">
                                    Do You Want Learn Here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full ">
                    <div className=" w-full h-[100px] flex justify-between ">
                        <div className=" text-[24px] font-bold w-[35px] h-[40px] rounded-full flex items-center bg-black max-md:grid">
                            <p className="ml-[9px] text-white">2</p>
                        </div>
                        <div className=" w-[48%] h-full max-md:w-full ">
                            <p className="text-[24px]  font-bold">
                                Learn Our Courses
                            </p>
                            <p>
                                Discover a wide range of courses designed to
                                help you learn new skills, grow your knowledge,
                                and achieve your goals—start your learning
                                journey with us today.
                            </p>
                        </div>
                    </div>
                    <div className="    grid grid-cols-3 justify-items-center max-md:grid-cols-1">
                        {firstThree.map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                            />
                        ))}
                    </div>
                    <div className=" flex  -mt-10  justify-center max-md:grid  max-md:mt-2">
                        <Link
                            to="/courses"
                            className="py-1 px-15 rounded-full cursor-pointer text-[14px] font-bold hover:bg-[#333333] text-white bg-[#0d0d0d] mt-20 "
                        >
                            More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
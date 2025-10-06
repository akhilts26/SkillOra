import React, { useEffect } from "react";
import { useState } from "react";
import CourseInfo from "../../components/CourseInfo";

const CourseInfoPage = () => {
    const courseTitle = "chapter 1";
    const [courseInfo, setCourseInfo] = useState({});
    useEffect(() => {
        console.log("jk");

        const fetchCourseInfo = async () => {
            try {
                const response = await fetch(`/skillora/user/hai`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        CourseTitle: courseTitle,
                    }),
                });
                console.log(response);

                // const data = await response.json();
                // console.log("Backend Response:");
                // // chapters = data.chapters;
                // console.log(data.CourseInfo);
                // if (data.CourseInfo) {
                //     // console.log("inside");

                //     setCourseInfo(data.CourseInfo);
                //     // console.log(courseInfo);

                // }
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourseInfo();
    }, []);
    // courseInfo.map((course,indes)=>{
    //     console.log(course.categoy);
    // })
    // console.log(courseInfo);
    console.log(courseInfo.category);

    return (
        <div>
            {/* { courseInfo && <CourseInfo  courseInfo={courseInfo} />} */}

            <p>dlkjal</p>
        </div>
    );
};

export default CourseInfoPage;

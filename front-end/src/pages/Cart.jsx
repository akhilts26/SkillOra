import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { toast } from "react-toastify";
// import CourseProgressCard from "../components/CourseProgressCard";

const Cart = () => {
    const [cartInfo, setCartInfo] = useState([]);
    const [removeStatus, setRemoveStatus] = useState(false);

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
                if (data.cartInfo) {
                    // setPurchasedCourse(data.courseBuy);
                    // setCompletedCourse(data.certificate)
                    setCartInfo(data.cartInfo);
                }
                // console.log("Backend Response:", data);
                // chapters = data.chapters;
                // console.log(data.courses);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, [removeStatus]);

    cartInfo.map((course, index) => {
        console.log(course.courseTitle);
        if (!course.ThumbnailPath) {
            const thumbnail_Path = `data:image/jpeg;base64,${course.thumbnail}`;
            // chapter.append("VideoPath",videoPath)
            course.ThumbnailPath = thumbnail_Path;
        }
    });
    async function removeFromCart(id) {
        console.log(id);
        try {
            const response = await fetch(
                `/skillora/student/removeFromCart?id=${id}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            console.log(response);
            toast.success("removed succssfully");
            setRemoveStatus(!removeStatus);
            
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="pt-20">
            <div className=" px-20">
                <p className="font-bold text-[40px]"> My Cart</p>

                <div className=" h-full grid grid-cols-3 mb-30">
                    {cartInfo.map((course) => (
                        <div key={course._id}>
                            <CourseCard course={course} />
                            <div className=" text-end mt-2">
                                <button
                                    onClick={() => {
                                        removeFromCart(course._id);
                                        
                                    }}
                                    className="bg-[#fb8c00] hover:bg-[#ffa726] cursor-pointer font-bold px-4 py-[1px] mr-13"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;

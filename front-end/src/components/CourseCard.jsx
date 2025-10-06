
import { Link } from "react-router-dom";


const CourseCard = ({ course }) => {
    const colors = ["#FF5733", "#3063fc", "#d730fc", "#ff1930", "#03968f","#027d07","#9e5c05"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    console.log(course);
    
    return (
        <Link to={`/courses/${course._id}`} >
            <div className="mt-10">
                
                <div className=" w-[320px] bg-white  group hover:border-[.5px] hover:border-[#969696] border-[.5px] border-white shadow-xl/30">
                    <div className="w-full overflow-hidden ">
                        <img
                            src={course.ThumbnailPath}
                            alt=""
                            className="group-hover:scale-108 w-full h-[200px] w-full transform transition duration-500"
                        />
                    </div>

                    <div className="p-5   ">
                        <p className="text-[14px] font-bold px-2 text-white inline-block" style={{ backgroundColor: randomColor }}>
                            {course.category}
                        </p>
                        <p className=" text-[20px] font-bold h-[70px]  mt- overflow-y-auto scrollbar-hide">
                            {course.courseTitle}
                        </p>
                        <p className=" text-[16px] h-[100px] mt-3 text-gray-900 text-justify overflow-y-auto scrollbar-hide">
                            {course.courseDescription}
                        </p>
                        

                        <hr className="text-[#5EABD6] h-[3px] bg-[#5EABD6] mt-5" />

                        <div className="flex justify-between items-center mt-3">
                            <p className="text-[20px] font-bold text-[#8C1007]">
                                ₹ {course.price}
                            </p>
                            <div className="flex items-center gap-2">
                                
                                <p className="text-[12px] ">
                                   instructor -<span className="text-[16px] font-bold">{course.instructorName}</span> 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;

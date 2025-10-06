import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import MyContext from "../main";
import { toast } from "react-toastify";

const LearnCourse = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const { profile, setProfile } = useContext(MyContext);

    let { role } = useContext(MyContext);

    role = profile?.userRole || "user";

    const [chapters, setChapters] = useState([]);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [selectedType, setSelectedType] = useState("video");
    
    const [success, setSuccess] = useState("");
    const [viewQuestion, setViewQuestion] = useState(false);
    const [courseComplete, setCourseComplete] = useState(false);
    const [certiArray, setCertiArray] = useState([]);

    async function deleteCourse(id) {
        console.log("inside");

        const response = await fetch(`/skillora/admin/deleteCourse?id=${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        console.log(response);
    }
    async function approveCourse(id) {
        const response = await fetch(`/skillora/admin/approveCourse?id=${id}`, {
            method: "POST",
            credentials: "include",
        });
        console.log(response);
        console.log("success");
        toast.success("Course Approved successfully");
        // navigate("/admin/dashboard")
    }

    async function completeCourse(id) {
        console.log("insude complete");
        let currectAnswer = 0;
        answerArray.forEach((val, index) => {
            if (val == studentAnswer[index]) {
                currectAnswer += 1;
            }
        });
        console.log("currectAnswer", currectAnswer);

        // console.log("answerArray le", answerArray.length);
        console.log("studentAnswer", studentAnswer);
// console.log(currectAnswer == answerArray.length);

        if (currectAnswer == answerArray.length) {
            console.log("inside 1");
            
            const response = await fetch(
                `/skillora/student/compleCourse?id=${id}`,
                {
                    method: "POST",
                    credentials: "include",
                
                }
            );
            console.log("inside 2");

            toast.success("Course Completed succssfully");
            console.log(response);
            // const data = await response.json();
            toast.success("Successfully Completed");

            setTimeout(() => {
                navigate("/student/myActivity");
            }, 500);
            // navigate("/student/cart");
            setCourseComplete(true);
        } else {
            toast.error("Wrong Answers");
            setViewQuestion(false);
            
        }
    }
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!profile) return;
        const fetchCourse = async () => {
            try {
                const response = await fetch(
                    `/skillora/user/learnCourse?id=${id}`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                console.log(data.chapters);
                if (data.chapters) {
                    setChapters(data.chapters);
                    setTitle(data.title);
                }
                console.log(data.title);

                if (profile?.userRole === "student") {
                    console.log("inside");

                    const response1 = await fetch(
                        "/skillora/student/myActivity",
                        {
                            method: "GET",
                            credentials: "include",
                        }
                    );
                    // console.log(response1);

                    const data1 = await response1.json();
                    // console.log(data1.certificateTitles);

                    if (data1.certificateTitles) {
                        
                        setCertiArray(data1.certificateTitles);
                        
                    }
                    
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchCourse();
    }, [id, profile]);

    const questionArray = [];
    const answerArray = [];
    const studentAnswer = [];
    chapters.map((chapter, index) => {
        // console.log(chapter.ChapterName);
        questionArray.push(chapter.Question);
        answerArray.push(chapter.Question.Answer);
        studentAnswer.push("");
        if (!chapters.VideoPath) {
            const videoPath = `data:video/mp4;base64,${chapter.chapterVideo}`;
            
            chapter.VideoPath = videoPath;
        }
    });
    // console.log(questionArray);
    // console.log(answerArray);

    // console.log(chapters[0]);
    const handleSelect = (chapterIndex, type) => {
        setSelectedChapterIndex(chapterIndex);
        setSelectedType(type);
    };
    function AddAnswerArray(i, value) {
        studentAnswer[i] = value;
        console.log(studentAnswer);
    }



    useEffect(() => {
        if (certiArray.includes(title)) {
            setCourseComplete(true);
        }
    }, [certiArray, title]);

    const selectedChapter = chapters[selectedChapterIndex] || {};

    return (
        <div>
            <div className="w-full h-[100vh]  flex pt-10">
                <div className="  w-[80%] h-[80%] bg-white m-auto flex justify-between p-1 gap-2">
                    <div className=" w-[30%] h-full p-[1px]">
                        <div className=" h-[60px] bg-[#2c7da0] flex px-2">
                            <p className="text my-auto text-[20px] font-bold">
                                Leanrn Your course
                            </p>
                        </div>
                        <div className=" h-[420px] mt-[2px] scrollbar-hide  overflow-y-auto">
                            {chapters.map((chapter, index) => (
                                <div key={chapter.ChapterName}>
                                    <div className=" bg-[#61a5c2] flex px-2 my-[1px]">
                                        <p className="text-[14px] my-auto">
                                            chapter
                                            {index + 1}
                                            <br />
                                            <span className="text-[16px] font-bold ">
                                                {chapter.ChapterName}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex bg-[#a9d6e5] h-[40px] cursor-pointer hover:bg-[#89c2d9] px-2 my-[1px]">
                                        <p
                                            className="my-auto text-[14px] "
                                            onClick={() =>
                                                handleSelect(index, "video")
                                            }
                                        >
                                            Video
                                        </p>
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleSelect(index, "note")
                                        }
                                        className="flex bg-[#a9d6e5] cursor-pointer h-[40px] hover:bg-[#89c2d9] px-2 my-[1px]"
                                    >
                                        <p className="my-auto text-[14px]">
                                            Note
                                        </p>
                                    </div>
                                    {/* <div
                                        onClick={() =>
                                            handleSelect(index, "question")
                                        }
                                        className="flex bg-[#a9d6e5] cursor-pointer h-[40px] hover:bg-[#89c2d9] px-2 my-[1px]"
                                    >
                                        <p className="my-auto text-[14px]">
                                            Question
                                        </p>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" overflow-y-auto w-[69%] scrollbar-hide  bg-[#d2fcf4] h-full flex justify-between items-end">
                        <div>
                           
                        </div>
                        {viewQuestion ? (
                            <div className="p-4 w-full h-[95%] mb-4  grid items-center">

                                <div className=" text-cen ter">
                                    <p className=" text-blue-600 font-bold text-[20px]">
                                        Answer the Questions
                                    </p>
                                    {questionArray.map((val, index) => {
                                        return (
                                            <div key={index} className="mb-3">
                                                <div>
                                                    <p className="font-bold text-[14px]">{val.ChapterQuestion}</p>
                                                    <input
                                                        name={
                                                            val.ChapterQuestion
                                                        }
                                                        type="radio"
                                                        className="mr-2"
                                                        onClick={() =>
                                                            AddAnswerArray(
                                                                index,
                                                                val.Option1
                                                            )
                                                        }
                                                    />
                                                    <label>{val.Option1}</label>
                                                </div>
                                                <div>
                                                    
                                                    <input
                                                        name={
                                                            val.ChapterQuestion
                                                        }
                                                        type="radio"
                                                        className="mr-2"
                                                        onClick={() =>
                                                            AddAnswerArray(
                                                                index,
                                                                val.Option2
                                                            )
                                                        }
                                                    />
                                                    <label>{val.Option2}</label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : selectedType === "video" ? (
                            <video controls className="w-full h-full">
                                <source
                                    src={selectedChapter.VideoPath}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        ) : selectedType === "note" ? (
                            <div className="p-4 w-full h-[95%] mb-4 inset-shadow-sm grid items-center">
                                <p>{selectedChapter.ChapterNote}</p>
                            </div>
                        ) : (
                            <div className="p-4 w-full h-[95%] mb-4 inset-shadow-sm grid items-center">
                                <p>
                                    {selectedChapter.Question.ChapterQuestion}
                                </p>
                            </div>
                        )}

                        <div className="h-[8]">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end -mt-13 mb-20">
                

                {profile ? (
                    profile.userRole === "admin" ? (
                        <div>
                            <button
                                onClick={() => {
                                    approveCourse(id);
                                    toast.success("Approved Successfully");
                                    navigate("/admin/dashboard");
                                }}
                                className="mx-35  py-[2px] text-[16px] bg-[#43a047] hover:bg-[#4caf50] cursor-pointer font-bold px-10"
                            >
                                Approve Course
                            </button>
                            <button
                                onClick={() => {
                                    deleteCourse(id);
                                    toast.error("Deleted successfully");
                                    navigate("/admin/dashboard");
                                }}
                                className="mx-35  py-[2px] text-[16px] bg-[#d32f2f] hover:bg-[#f44336] cursor-pointer font-bold px-10"
                            >
                                Delete Course
                            </button>
                        </div>
                    ) : profile.userRole === "student" ? (
                        courseComplete ? (
                            <p>Completed</p>
                        ) : viewQuestion ? (
                            <button
                                onClick={() => {
                                    completeCourse(id); 
                                }}
                                className="mx-35  py-[2px] text-[16px] bg-[#fb8c00] hover:bg-[#ffa726] cursor-pointer font-bold px-6"
                            >
                                
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    
                                    setViewQuestion(true);
                                }}
                                className="mx-35  py-[2px] text-[16px] bg-[#0a81ff] hover:bg-[#0066cc] font-bold px-6 "
                            >
                               
                                Complete Course
                            </button>
                        )
                    ) : null
                ) : null}
            </div>
            <div className=" text-center  ">
                
                {success && <p className="text-green-500 mb-3">{success}</p>}
            </div>
        </div>
    );
};

export default LearnCourse;

import React, { useState, useContext } from "react";
import "./styles/addCourse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import MyContext from "../main";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddCourse = () => {
    const { id } = useParams();

    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const [courseLevel, setCourseLevel] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [price, setPrice] = useState("");
    const [courseRequirement, setCourseRequirement] = useState("");
    const [courseSummery, setCourseSummery] = useState("");

    const [chapterName, setChapterName] = useState("");
    const [chapterVideo, setChapterVideo] = useState("");
    const [chapterNote, setChapterNote] = useState("");
    const [chapterQuestion, setChapterQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [answer, setAnswer] = useState(0);

    const [chapers, setChapers] = useState([]);
    const [showForm, setShowForm] = useState(true);
    // const [error, setError] = useState("");
    const { profile } = useContext(MyContext);
    const instructorName = profile?.userName || "";

    // const [success, setSuccess] = useState("");

    const [updateNewChapters, setUpdateNewChapters] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchCourse = async () => {
                try {
                    const response = await fetch(
                        `/skillora/instructor/viewCourse?id=${id}`,
                        {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    console.log("hai");

                    console.log(response);

                    const data = await response.json();
                    console.log(data.couseInfo);

                    setCourseTitle(data.couseInfo.courseTitle);
                    setCourseDescription(data.couseInfo.courseDescription);
                    setCategory(data.couseInfo.category);
                    setCourseLevel(data.couseInfo.courseLevel);
                    // setThumbnail(data.couseInfo.);
                    setTargetAudience(data.couseInfo.targetAudience);
                    setPrice(data.couseInfo.price);
                    console.log(typeof data.couseInfo.courseDescription);
                    setCourseRequirement(
                        String(data.couseInfo.courseRequirement)
                            .split(",")
                            .map((item) => item.trim())
                            .join("\n")
                    );
                    setCourseSummery(
                        String(data.couseInfo.courseSummery)
                            .split(",")
                            .map((item) => item.trim())
                            .join("\n")
                    );
                    // setChapers(data.couseInfo.courseChapters)
                } catch (err) {
                    console.log(err);
                }
            };

            fetchCourse();
        }
    }, [id]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setAnswer(value);

        if (value === "A") {
            setSelectedAnswer(option1);
        }
        if (value === "B") {
            setSelectedAnswer(option2);
        }
    };
    const addChapter = (e) => {
        e.preventDefault();

        if (
            chapterName &&
            chapterNote &&
            chapterVideo &&
            chapterQuestion &&
            option1 &&
            option2 &&
            answer
        ) {
            console.log("val", answer);

            setChapers([
                ...chapers,
                {
                    ChapterName: chapterName,
                    ChapterNote: chapterNote,
                    ChapterVideo: chapterVideo,
                    Question: {
                        ChapterQuestion: chapterQuestion,
                        Option1: option1,
                        Option2: option2,
                        Answer: answer,
                    },
                },
            ]);
            setChapterName("");
            setChapterNote("");
            setChapterVideo("");
            setChapterQuestion("");
            setOption1("");
            setOption2("");
            setAnswer("");
            setShowForm(false);
        }
    };

    const navigate = useNavigate();
    const submitCourse = async (e) => {
        e.preventDefault();
        if (
            !courseTitle ||
            !category ||
            !courseLevel ||
            !thumbnail ||
            !courseDescription ||
            !targetAudience ||
            !price ||
            !courseRequirement ||
            !courseSummery
        ) {
            toast.error("Please fill the fileds");
            return;
        } else if (chapers.length == 0) {
            toast.error("Add Chapters");
            return;
        } else {
            try {
                console.log("inside try");

                let chapter1_video = chapers[0].ChapterVideo,
                    chapter2_video = "",
                    chapter3_video = "",
                    chapter4_video = "",
                    chapter5_video = "";

                if (chapers.length > 1) {
                    chapter2_video = chapers[1].ChapterVideo;
                }
                if (chapers.length > 2) {
                    chapter3_video = chapers[2].ChapterVideo;
                }
                if (chapers.length > 3) {
                    chapter4_video = chapers[3].ChapterVideo;
                }
                if (chapers.length > 4) {
                    chapter5_video = chapers[4].ChapterVideo;
                }

                console.log(chapers);
                const formData = new FormData();
                formData.append("CourseTitle", courseTitle);
                formData.append("Category", category);
                formData.append("CourseLevel", courseLevel);
                if (thumbnail) {
                    formData.append("Thumbnail", thumbnail);
                }

                console.log(profile.userName);

                formData.append("InstructorName", instructorName);
                formData.append("CourseDescription", courseDescription);
                formData.append("TargetAudience", targetAudience);
                let requirements = [];
                if (courseRequirement) {
                    requirements = courseRequirement
                        .split("\n")
                        .map((r) => r.trim())
                        .filter((r) => r.length > 0);
                }
                formData.append(
                    "CourseRequirement",
                    JSON.stringify(requirements)
                );
                let summery = [];
                if (courseSummery) {
                    summery = courseSummery
                        .split("\n")
                        .map((s) => s.trim())
                        .filter((s) => s.length > 0);
                }
                formData.append("CourseSummery", JSON.stringify(summery));

                formData.append("CourseChapters", JSON.stringify(chapers));
                formData.append("Price", price);
                formData.append("Chapter1_video", chapter1_video);

                if (chapter2_video) {
                    formData.append("Chapter2_video", chapter2_video);
                }
                if (chapter3_video) {
                    formData.append("Chapter3_video", chapter3_video);
                }
                if (chapter4_video) {
                    formData.append("Chapter4_video", chapter4_video);
                }
                if (chapter5_video) {
                    formData.append("Chapter5_video", chapter5_video);
                }
                formData.append("UpdateChapter", updateNewChapters);
                console.log("data");
                console.log(formData);
                if (id) {
                    const response = await fetch(
                        "/skillora/instructor/updateApprovedCourse",
                        {
                            method: "PUT",

                            credentials: "include",
                            body: formData,
                        }
                    );
                    console.log(response);
                    if (!response.ok) {
                        toast.error("Course not updated");
                    } else {
                        toast.success("Course Updated succssfully ");
                        navigate("/instructor/home");
                    }
                } else {
                    const response = await fetch(
                        "/skillora/instructor/addCourse",
                        {
                            method: "POST",
                            credentials: "include",
                            body: formData,
                        }
                    );
                    console.log(response);
                    if (!response.ok) {
                        toast.error("Course name already exist");
                    } else {
                        toast.success("Course added succssfully ");
                        navigate("/instructor/home");
                    }
                }

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || "add Course failed");
                }
                setCourseTitle("");
                setCourseDescription("");
                setCategory("");
                setCourseLevel("");
                setThumbnail("");
                setTargetAudience("");
                setPrice("");
                setCourseRequirement("");
                setChapers([]);
                // setSuccess("Course added successfully!");
                setChecked(false);
            } catch (err) {
                // setError(err.message || "Course Add failed");
                console.log(err);
            }
        }
    };
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        if (
            !courseTitle ||
            !category ||
            !courseLevel ||
            !thumbnail ||
            !courseDescription ||
            !targetAudience ||
            !price ||
            !courseRequirement ||
            !courseSummery
        ) {
            toast.error("Please fill the fileds");
            return;
        }
        setChecked(e.target.checked);
    };

    const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);

    const [chapterUpdate, setChapterUpdate] = useState(false);
    function displayChapter(index) {
        setSelectedChapterIndex(index);
        setChapterUpdate(true);
        console.log(index);
        setShowForm(true);
        setChapterName(chapers[index].ChapterName);
        setChapterNote(chapers[index].ChapterNote);
        setChapterVideo(chapers[index].ChapterVideo);
        setChapterQuestion(chapers[index].Question.ChapterQuestion);
        setOption1(chapers[index].Question.Option1);
        setOption2(chapers[index].Question.Option2);
        setAnswer(chapers[index].Question.Answer);
    }

    function handleAddChapter() {
        // console.log("inside");

        if (chapers.length > 4) {
            toast.error("You can Add only 5 chapters");
        } else {
            setShowForm(true);
        }
    }

    function handleChapterUpdate(index) {
        if (selectedChapterIndex !== null) {
            const updatedChapters = [...chapers];
            updatedChapters[selectedChapterIndex] = {
                ChapterName: chapterName,
                ChapterNote: chapterNote,
                ChapterVideo: chapterVideo,
                Question: {
                    ChapterQuestion: chapterQuestion,
                    Option1: option1,
                    Option2: option2,
                    Answer: answer,
                },
            };
            setChapers(updatedChapters);
            setShowForm(false);
            setChapterUpdate(false);
            setSelectedChapterIndex(null);
        }
    }
    return (
        <div className=" w-auto pt-20">
            <div className="w-[75%] mb-20 h-auto  m-auto bg-white   p-10  border-[1px] border-[#cdcecf] rounded-[4px] ">
                <form className="course-form ">
                    <div className=" flex items-center gap-2 mb-4">
                        <FontAwesomeIcon
                            icon={faPersonChalkboard}
                            className="text-[30px] text-[#61acda]"
                        />
                        <div>
                            <h1>Add Course</h1>

                            <p className="text-[12px] ">add your course here</p>
                        </div>
                    </div>
                    <hr className="text-[#cdcecf] h-[2px] bg-[#cdcecf] -mx-10" />
                    <div className="pt-6">
                        <h2>Course Information</h2>
                        <p className="text-[12px] ">add your course here</p>
                        <h3>Course Title</h3>
                        <input
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            type="text"
                            className=" w-full h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                            required
                            readOnly={!!id || checked}
                        />
                        <div className=" grid grid-cols-2 gap-x-6">
                            <div>
                                <h3>Category</h3>
                                <select
                                    required
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="addcourse-select"
                                    readOnly={checked}
                                >
                                    <option value="" hidden></option>
                                    <option value="Web Development">
                                        Web Development
                                    </option>
                                    <option value="Data Science">
                                        Data Science
                                    </option>
                                    <option value="Digital Marketing">
                                        Digital Marketing
                                    </option>
                                    <option value="Finance & Investing">
                                        Finance & Investing
                                    </option>
                                    <option value="Personal Development">
                                        Personal Development
                                    </option>
                                    <option value="Graphic Design & UI/UX">
                                        Graphic Design & UI/UX
                                    </option>
                                    <option value="Artificial Intelligence & Machine Learning">
                                        Artificial Intelligence & Machine
                                        Learning
                                    </option>
                                    <option value="Entrepreneurship & Business Management">
                                        Entrepreneurship & Business Management
                                    </option>
                                    <option value="Health & Fitness">
                                        Health & Fitness
                                    </option>
                                    <option value="Photography, Music & Creative Arts">
                                        Photography, Music & Creative Arts
                                    </option>
                                </select>
                            </div>
                            <div>
                                <h3>Course Level</h3>
                                <select
                                    required
                                    className="addcourse-select "
                                    value={courseLevel}
                                    onChange={(e) =>
                                        setCourseLevel(e.target.value)
                                    }
                                    readOnly={checked}
                                >
                                    <option value="" hidden></option>
                                    <option value="New Learner">
                                        New Learner
                                    </option>
                                    <option value="Growing Learner">
                                        Growing Learner
                                    </option>
                                    <option value="Proficient">
                                        Proficient
                                    </option>
                                    <option value="Expert">Expert</option>
                                    <option value="Master">Master</option>
                                </select>
                            </div>
                            <div>
                                <h3>Thumbnail</h3>
                            </div>
                        </div>
                        <input
                            accept="image/*"
                            required
                            type="file"
                            // value={thumbnail}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setThumbnail(e.target.files[0]);
                                }
                            }}
                            className=" w-full bg-gray-200 text-red-500 border border-gray-500    text-14px   "
                            readOnly={checked}
                        />

                        <h3>Course Description</h3>
                        <textarea
                            required
                            value={courseDescription}
                            onChange={(e) =>
                                setCourseDescription(e.target.value)
                            }
                            readOnly={checked}
                            name=""
                            id=""
                            className=" w-full h-[100px] mb-6 border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        ></textarea>
                        <hr className="text-[#cdcecf] h-[2px] bg-[#cdcecf] -mx-10" />

                        <hr className="text-[#cdcecf] h-[2px] bg-[#cdcecf] -mx-10" />
                        <div className="mt-6">
                            <h2>Course Information</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6">
                            <div>
                                <h3>Target Audience</h3>
                                <select
                                    required
                                    value={targetAudience}
                                    onChange={(e) =>
                                        setTargetAudience(e.target.value)
                                    }
                                    name=""
                                    id=""
                                    className="addcourse-select"
                                    readOnly={checked}
                                >
                                    <option value="" hidden></option>
                                    <option value="Students">Students</option>
                                    <option value="Job Seekers">
                                        Job Seekers
                                    </option>
                                    <option value="Marketers">Marketers</option>
                                    <option value="Designers">Designers</option>
                                    <option value="Developers">
                                        Developers
                                    </option>
                                    <option value="Entrepreneurs">
                                        Entrepreneurs
                                    </option>
                                    <option value="Teachers">Teachers</option>
                                    <option value="Freelancers">
                                        Freelancers
                                    </option>
                                    <option value="Content Creators">
                                        Content Creators
                                    </option>
                                    <option value="Project Managers">
                                        Project Managers
                                    </option>
                                    <option value="Researchers">
                                        Researchers
                                    </option>
                                    <option value="Data Analysts">
                                        Data Analysts
                                    </option>
                                    <option value="IT Professionals">
                                        IT Professionals
                                    </option>
                                    <option value="Business Owners">
                                        Business Owners
                                    </option>
                                    <option value="Engineers">Engineers</option>
                                    <option value="Travel Enthusiasts">
                                        Travel Enthusiasts
                                    </option>
                                    <option value="Photographers">
                                        Photographers
                                    </option>
                                    <option value="Bloggers">Bloggers</option>
                                </select>
                            </div>
                            <div>
                                <h3>Price</h3>
                                <select
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    name=""
                                    id=""
                                    className="addcourse-select"
                                    readOnly={checked}
                                >
                                    <option value="" hidden></option>
                                    <option value="400">400</option>
                                    <option value="700">700</option>
                                    <option value="1400">1400</option>
                                    <option value="2000">2000</option>
                                </select>
                            </div>
                        </div>
                        <h3>Course Requirements</h3>
                        <textarea
                            required
                            value={courseRequirement}
                            onChange={(e) =>
                                setCourseRequirement(e.target.value)
                            }
                            name=""
                            id=""
                            className=" w-full h-[200px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                            readOnly={checked}
                        ></textarea>

                        <h3>Course Summery</h3>
                        <textarea
                            required
                            value={courseSummery}
                            onChange={(e) => setCourseSummery(e.target.value)}
                            name=""
                            id=""
                            className=" w-full h-[200px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                            readOnly={checked}
                        ></textarea>
                    </div>
                    <div className=" mt-3">
                        <div className="flex">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={handleCheckboxChange}
                            />
                            <label>Confirm after filling the fields</label>
                        </div>
                    </div>
                </form>

                <div>
                    {/* display submited Chapers */}
                    <div>
                        <div className="my-5">
                            <h2>Add Chapters</h2>
                            <p className="text-[12px] ">add your course here</p>
                        </div>
                        {chapers.map((c, index) => (
                            <button
                                onClick={() => displayChapter(index)}
                                key={index}
                                className="p-2 w-full border-black border-[1px] bg-[#fcd5b6]"
                            >
                                <p className="text-[12px]  ">
                                    chpater {index + 1}
                                    <br />
                                    <span className="text-[16px] font-bold">
                                        {c.ChapterName}
                                    </span>
                                </p>
                            </button>
                        ))}
                    </div>

                    {showForm && (
                        <form onSubmit={addChapter}>
                            <h3>Name of Chapter</h3>
                            <input
                                value={chapterName}
                                onChange={(e) => setChapterName(e.target.value)}
                                type="text"
                                required
                                className="bg-red-100 w-full h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                            />
                            <h3>Upload Chapter Video</h3>
                            <input
                                required
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setChapterVideo(e.target.files[0]);
                                    }
                                }}
                                // value={chapterVideo}

                                className=" w-full bg-gray-200 text-red-600 border border-gray-500    text-14px   "
                            />
                            <h3>Add Chapter Note</h3>
                            <textarea
                                value={chapterNote}
                                onChange={(e) => setChapterNote(e.target.value)}
                                name=""
                                id=""
                                required
                                className="bg-red-100 w-full h-[100px] mb-6 border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                            ></textarea>
                            <div>
                                <h3>Question </h3>
                                <input
                                    required
                                    value={chapterQuestion}
                                    onChange={(e) =>
                                        setChapterQuestion(e.target.value)
                                    }
                                    type="text"
                                    className=" w-full h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                                />
                                <div className="my-2">
                                    <p>Options</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex gap-2 items-center">
                                            <p>A</p>
                                            <input
                                                required
                                                value={option1}
                                                onChange={(e) =>
                                                    setOption1(e.target.value)
                                                }
                                                type="text"
                                                className=" w-full h-[30px] text-[16px]  border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                                            />
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p>B</p>
                                            <input
                                                required
                                                value={option2}
                                                onChange={(e) =>
                                                    setOption2(e.target.value)
                                                }
                                                type="text"
                                                className=" w-full h-[30px] text-[16px]  border-[2px] border-[#cdcecf] focus:border-[#61acda] "
                                            />
                                        </div>
                                    </div>
                                    <div className=" flex mt-4">
                                        <p className="w-[50%] font-bold">
                                            Select the Answer
                                        </p>
                                        <select
                                            value={answer}
                                            onChange={(e) => {
                                                setAnswer(e.target.value);
                                                // handleSelectChange
                                            }}
                                            className="bg-[#f7b37e] px-2 py-1 border-[2px]"
                                        >
                                            <option value=""></option>

                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {chapterUpdate ? (
                                <button
                                    onClick={() =>
                                        handleChapterUpdate(
                                            selectedChapterIndex
                                        )
                                    }
                                    type="button"
                                    className="border bg-[#024fcc] text-white px-6 font-bold text-[18px] hover:bg-[#0a64f7] "
                                >
                                    update Chapter
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="border cursor-pointer bg-[#024fcc] text-white px-6 font-bold text-[18px] hover:bg-[#0a64f7] "
                                >
                                    Submit
                                </button>
                            )}
                        </form>
                    )}

                    {/* add another button */}
                    {!showForm && (
                        <button
                            className="bg-[#02bf0b]  font-bold hover:bg-[#1bf726] px-6 text-[14px] py-2 mt-5"
                            // onClick={() => setShowForm(true)}
                            onClick={handleAddChapter}
                        >
                            Add Next Chapter
                        </button>
                    )}
                </div>
                <div className="flex justify-end">
                    {id ? (
                        <button
                            onClick={submitCourse}
                            className="bg-black text-white font-bold text-[16px] px-6 py-2 hover:bg-[#262626] cursor-pointer"
                        >
                            Update Course
                        </button>
                    ) : (
                        <button
                            onClick={submitCourse}
                            className="bg-black text-white font-bold text-[16px] px-6 py-2 hover:bg-[#262626] cursor-pointer"
                        >
                            Add Course
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddCourse;

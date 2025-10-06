import React, { useEffect, useRef, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "../main";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Certificate = () => {
    const { id } = useParams();
    const [courseInfo, setCourseInfo] = useState(null);
    const { profile } = useContext(MyContext);
    const targetRef = useRef();

    
    const viewPDF = async () => {
        const element = targetRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        window.open(pdf.output("bloburl"), "_blank");
    };


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/skillora/user/viewCourseInfo?id=${id}`, {
                    method: "POST",
                    credentials: "include",
                });
                const data = await response.json();
                if (data.CourseInfo) setCourseInfo(data.CourseInfo);
            } catch (err) {
                console.error("Error fetching course:", err);
            }
        };

        fetchCourse();
    }, [id]);

    if (!courseInfo || !profile) {
        return <div>Loading certificate...</div>;
    }

    return (
        <div className="flex flex-col items-center pt-20">
            <div ref={targetRef} className="w-[1150px]  shadow-md">
                <div
                    className="w-[1122px] h-[794px] m-auto p-6 rounded-[4px]"
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #cdcecf",
                    }}
                >
                    <div
                        className="h-full flex flex-col justify-between p-10"
                        style={{ backgroundColor: "#ebf2fc" }}
                    >
                        
                        <div className="h-[100px]">
                            <p className="text-[50px] font-[600]">
                                Skill
                                <span
                                    className="text-[70px] font-[500]"
                                    style={{ color: "#4682A9" }}
                                >
                                    ora
                                </span>
                            </p>
                        </div>

                        
                        <div className="h-[200px]">
                            <div
                                className="text-[18px] font-bold"
                                style={{ color: "gray" }}
                            >
                                <p>CERTIFICATE OF COMPLETION</p>
                            </div>

                            <div className="w-[700px] text-[50px] font-bold leading-[56px]">
                                {courseInfo.courseTitle}
                            </div>

                            <div>
                                <p className="text-[16px]">
                                    Instructor{" "}
                                    <span
                                        className="font-bold text-[20px]"
                                        style={{ color: "#000" }}
                                    >
                                        {courseInfo.instructorName}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* User Name */}
                        <div className="h-[50px] text-[22px] font-bold">
                            <p>{profile.userName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Button */}
            <button
                onClick={viewPDF}
                style={{
                    backgroundColor: "#0a81ff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: "20px",
                }}
            >
                View as PDF
            </button>
        </div>
    );
};

export default Certificate;

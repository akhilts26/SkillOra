import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PdfOne = () => {
  const targetRef = useRef();

  const viewPDF = async () => {
    const element = targetRef.current;

    // Convert div to canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // 👉 Open PDF in new tab instead of download
    window.open(pdf.output("bloburl"), "_blank");
  };

  return (
    <div>
      {/* Content to export */}
      
      <div  className="">
        <div ref={targetRef} className="w-[1150px] border ">
          <div
            className="w-[1122px] h-[794px]  m-auto mt-10 p-6 rounded-[4px]"
            style={{
              backgroundColor: "#ffffff", // white background
              border: "1px solid #cdcecf", // replaced Tailwind border color
            }}
          >
            <div
              className="h-full flex flex-col justify-between p-15"
              style={{ backgroundColor: "#ebf2fc" }} // replaced Tailwind bg
            >
              <div className="h-[100px]">
                <p className="text-[50px] font-[600]">
                  Skill
                  <span
                    className="text-[70px] font-[500]"
                    style={{ color: "#4682A9" }} // replaced Tailwind text color
                  >
                    ora
                  </span>
                </p>
              </div>

              <div className="h-[200px]">
                <div
                  className="text-[18px] font-bold"
                  style={{ color: "gray" }} // text-gray-500 replaced
                >
                  <p>CERTIFICATE OF COMPLETION</p>
                </div>

                <div className="w-[700px] text-[50px] font-bold leading-[56px]">
                  {/* Design Fundamentals fear of puplic speakin */}
                                {courseInfo.courseTitle}
                
                </div>

                <div>
                  <p className="text-[16px]">
                    Instructor{" "}
                    <span
                      className="font-bold text-[20px]"
                      style={{ color: "#000" }} // black text
                    >
                      {/* Michael R */}
                                        {courseInfo.instructorName}

                    </span>
                  </p>
                </div>
              </div>

              <div className="h-[50px] text-[22px] font-bold">
                <p>{profile.userName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={viewPDF}
          style={{
            backgroundColor: "#0a81ff", // fixed blue hex
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          View as PDF
        </button>
      </div>
    </div>
  );
};

export default PdfOne;

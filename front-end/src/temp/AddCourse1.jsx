import React, { useState } from "react";

const AddCourse1 = () => {
    const [chapterName, setChapterName] = useState("");
    const [chapterViedeo, setChapterViedeo] = useState("");
    const [chapterNote, setChapterNote] = useState("");
    // const [chapterQuestion, setChapterQuestion] = useState("");
    // const [option1, setOption1] = useState("");
    // const [option2, setOption2] = useState("");
    const [chapers, setChapers] = useState([]);
    const [showForm, setShowForm] = useState(true);
    // const [count, setCount] = useState(0);

    const addChapter = (e) => {
        e.preventDefault();
        if (chapterName && chapterNote) {
            setChapers([...chapers, { chapterName, chapterNote }]);
            setChapterName("");
            setChapterNote("");
            setShowForm(false);
        }
    };
    return (
        <div>
            {/* display submited Chapers */}
            <div>
                {chapers.map((c, index) => (
                    <div key={index}>{c.chapterName}</div>
                ))}
            </div>

            {/* show form if active */}
            {showForm && (
                <form onSubmit={addChapter}>
                    <h3>Name of Chapter 1</h3>
                    <input
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                        type="text"
                        required
                        className="bg-red-100 w-full h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                    />
                    <h3>Add Chapter 1 Note</h3>
                    <textarea
                        value={chapterNote}
                        onChange={(e) => setChapterNote(e.target.value)}
                        name=""
                        id=""
                        required
                        className="bg-red-100 w-full h-[100px] mb-6 border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                    ></textarea>
                     <button type="submit">Submit</button>
                </form>
            )}

            {/* add another button */}
            {!showForm&& (<button className="bg-blue-500" onClick={() => setShowForm(true)}>
                    Add Another Name
                </button>)}
        </div>
    );
};

export default AddCourse1;

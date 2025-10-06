import { json, Router } from "express";
import { courseSample } from "../Models/sample.js";

const user = Router();

user.post('/hai',(req,res)=>{
    console.log("hai inside user");
    res.status(200).json({msg :"hai"})
    
    })

user.get("/allCourses", async (req, res) => {
    try {
        const result = await courseSample.find({status:"approved"});
        if (!result) {
            console.log("not approved courses");
            res.status(404);
        } else {
            console.log("taking courses succcessfully");

            res.status(200).json({
                msg:"fetching course successfully",

                Courses: result,
            });
        }
        // console.log(result);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "something went wrong" });
    }
});

user.post("/viewCourseInfo", async (req, res) => {
    try {
        const { id } = req.query;
        // console.log(req.body);
        console.log("inside view course");
        
        const result = await courseSample.findOne({ _id: id });
        
        if (!result) {
            console.log("invalid course title");
            res.status(401).json({ msg: "invalid course title" });
        } else {
            // const Chapters = result.courseChapters;
            // res.status(200)json({});
            console.log("get course successfully");
            // console.log(result);
            
            // console.log(Chapters);
            // console.log(result);

            res.status(200).json({
                msg: "get course successfully",
                CourseInfo: result,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "something went wrong" });
    }
});


user.get("/viewCourseInfo", async (req, res) =>{})

// user.post("/learnCourse", async (req, res) => {
//     try {
//         console.log("inside");

//         const { CourseTitle } = req.body;
//         console.log(CourseTitle);

//         const result = await courseSample.findOne({ courseTitle: CourseTitle });
//         if (!result) {
//             console.log("invalid course title");
//             res.status(404).json({ msg: "invalid course title" });
//         } else {
//             const Chapters = result.courseChapters;
//             // res.status(200)json({});
//             console.log("get course successfully");
//             console.log(Chapters);

//             res.status(200).json({
//                 msg: "get course successfully",
//                 chapters: Chapters,
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         console.log("something went wrong");
//         res.status(404).json({ msg: "something went wrong" });
//     }
// });


user.post("/learnCourse", async (req, res) => {
    try {
        console.log("inside learn course user");
        
        // const { CourseTitle } = req.body;
        const { id } = req.query;
        const result = await courseSample.findOne({
            _id: id
        });
        if (!result) {
            console.log("course not found");
            res.status(404);
        } else {
            console.log("course info sending ");
            res.status(200).json({
                chapters: result.courseChapters,
                title:result.courseTitle
            });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});



// user.get("/viewCourse",async (req, res) => {
//     try{
//         const result = await courseSample.findOne({ status: "approved" });
//     }catch (err) {
//         console.log(err);
//         console.log("something went wrong");
//         res.status(404).json({ msg: "something went wrong" });
//     }
// })

export default user;

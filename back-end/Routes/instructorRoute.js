import { Router } from "express";
import {
    courseSample,
    instructorWallet,
    updateCourseSample,
    profileSample,
    adminWallet,
    studentActivitySample,
} from "../Models/sample.js";

import upload from "../midleware/upload.js";
import multer from "multer";
import authenticate from "../midleware/auth.js";
import instructorAuth from "../midleware/instuctorAuth.js";

const instrutor = Router();
const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

instrutor.post(
    "/addCourse",
    upload.fields([
        { name: "Thumbnail" },
        { name: "Chapter1_video" },
        { name: "Chapter2_video" },
        { name: "Chapter3_video" },
        { name: "Chapter4_video" },
        { name: "Chapter5_video" },
    ]),
    async (req, res) => {
        try {
            const {
                CourseTitle,
                Category,
                CourseLevel,
                // InstructorName,
                CourseDescription,
                TargetAudience,
                Price,
                CourseRequirement,
                CourseSummery,
            } = req.body;
           
            
            // console.log(CourseSummery);
            

            const result = await courseSample.findOne({
                courseTitle: CourseTitle,
            });

            if (result) {
                console.log("couse name already exist");
                res.status(404).json({ msg: "couse name already exist" });
            } else {
                let Thumbnail_Base64 = null,
                    Chapter1_video_Base64 = null,
                    Chapter2_video_Base64 = null,
                    Chapter3_video_Base64 = null,
                    Chapter4_video_Base64 = null,
                    Chapter5_video_Base64 = null;

                if (req.files && req.files["Thumbnail"]) {
                    Thumbnail_Base64 = convertToBase64(
                        req.files["Thumbnail"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter1_video"]) {
                    Chapter1_video_Base64 = convertToBase64(
                        req.files["Chapter1_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter2_video"]) {
                    Chapter2_video_Base64 = convertToBase64(
                        req.files["Chapter2_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter3_video"]) {
                    Chapter3_video_Base64 = convertToBase64(
                        req.files["Chapter3_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter4_video"]) {
                    Chapter4_video_Base64 = convertToBase64(
                        req.files["Chapter4_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter5_video"]) {
                    Chapter5_video_Base64 = convertToBase64(
                        req.files["Chapter5_video"][0].buffer
                    );
                }

                const base64Array = [
                    Chapter1_video_Base64,
                    Chapter2_video_Base64,
                    Chapter3_video_Base64,
                    Chapter4_video_Base64,
                    Chapter5_video_Base64,
                ];

                let courseChapters1 = [];
                if (req.body.CourseChapters) {
                    courseChapters1 = JSON.parse(req.body.CourseChapters);
                }

                courseChapters1.forEach((val, index) => {
                    val.chapterVideo = base64Array[index];
                    if(val.Question.Answer =="A"){
                        val.Question.Answer = val.Question.Option1
                    }else{
                        val.Question.Answer = val.Question.Option2
                    }

                });

                console.log(CourseSummery);
                console.log(CourseRequirement);
                
                
                const newCourse = new courseSample({
                    courseTitle: CourseTitle,
                    instructorName: req.name,
                    status: "not approved",
                    category: Category,
                    courseLevel: CourseLevel,
                    thumbnail: Thumbnail_Base64,
                    courseDescription: CourseDescription,
                    targetAudience: TargetAudience,
                    price: Price,
                    courseRequirement: JSON.parse(CourseRequirement),
                    courseChapters: courseChapters1,
                    courseSummery: JSON.parse(CourseSummery),
                });

                

                
                
                console.log("CourseRequirement:", CourseRequirement);
                await newCourse.save();
                // console.log(courseChapters1);
                
                console.log("course added successfully");
                res.status(201).json({ msg: "course added successfully" });
            }
        } catch (err) {
            console.log(err);

            console.log("something went wrong");
            res.status(404).json({ msg: "something went wrong" });
        }
    }
);






instrutor.put(
    "/updateApprovedCourse",
    upload.fields([
        { name: "Thumbnail" },
        { name: "Chapter1_video" },
        { name: "Chapter2_video" },
        { name: "Chapter3_video" },
        { name: "Chapter4_video" },
        { name: "Chapter5_video" },
    ]),
    async (req, res) => {
        try {
            console.log("inside add course");

            const { CourseTitle } = req.body;
            console.log("ct", CourseTitle);

            const approvedResult = await courseSample.findOne({
                courseTitle: CourseTitle,
                // status: "approved",
            });
            // const updateResult = await updateCourseSample.findOne({
            //     courseTitle: CourseTitle,
            // });
            if (!approvedResult) {
                console.log("Course not found");
                res.status(404).json({ msg: "Course not found" });
            } else {
                // if (updateResult) {
                //     await updateCourseSample.deleteOne({
                //         courseTitle: CourseTitle,
                //     });
                // }
                console.log("inside");

                const {
                    CourseTitle,
                    Category,
                    CourseLevel,
                    // InstructorName,
                    CourseDescription,
                    TargetAudience,
                    Price,
                    CourseRequirement,
                    UpdateChapter,
                } = req.body;

                let Thumbnail_Base64 = null,
                    Chapter1_video_Base64 = null,
                    Chapter2_video_Base64 = null,
                    Chapter3_video_Base64 = null,
                    Chapter4_video_Base64 = null,
                    Chapter5_video_Base64 = null;

                if (req.files && req.files["Thumbnail"]) {
                    Thumbnail_Base64 = convertToBase64(
                        req.files["Thumbnail"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter1_video"]) {
                    Chapter1_video_Base64 = convertToBase64(
                        req.files["Chapter1_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter2_video"]) {
                    Chapter2_video_Base64 = convertToBase64(
                        req.files["Chapter2_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter3_video"]) {
                    Chapter3_video_Base64 = convertToBase64(
                        req.files["Chapter3_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter4_video"]) {
                    Chapter4_video_Base64 = convertToBase64(
                        req.files["Chapter4_video"][0].buffer
                    );
                }
                if (req.files && req.files["Chapter5_video"]) {
                    Chapter5_video_Base64 = convertToBase64(
                        req.files["Chapter5_video"][0].buffer
                    );
                }

                const base64Array = [
                    Chapter1_video_Base64,
                    Chapter2_video_Base64,
                    Chapter3_video_Base64,
                    Chapter4_video_Base64,
                    Chapter5_video_Base64,
                ];
                let courseChapters1 = [];
                if (req.body.CourseChapters) {
                    courseChapters1 = JSON.parse(req.body.CourseChapters);
                }

                courseChapters1.forEach((val, index) => {
                    val.chapterVideo = base64Array[index];
                });
                // console.log(courseChapters1);
                
                // if (UpdateChapter == true) {
                //      await courseSample.updateOne({courseTitle:CourseTitle},{$set:{
                //         courseTitle: CourseTitle,
                //         instructorName: req.name,
                //         category: Category,
                //         courseLevel: CourseLevel,
                //         thumbnail: Thumbnail_Base64,
                //         courseDescription: CourseDescription,
                //         targetAudience: TargetAudience,
                //         price: Price,
                //         courseRequirement: CourseRequirement,
                //         courseChapters: courseChapters1,
                //     }})
                // await newCourse.save();

                // } else {
                    console.log("coursetitile",CourseTitle);
                    
                    await courseSample.updateOne({courseTitle:CourseTitle},{$set:{
                    
                        // courseTitle: CourseTitle,
                        instructorName: req.name,
                        // status:"approved",
                        category: Category,
                        courseLevel: CourseLevel,
                        thumbnail: Thumbnail_Base64,
                        courseDescription: CourseDescription,
                        targetAudience: TargetAudience,
                        price: Price,
                        courseRequirement: CourseRequirement,
                        courseChapters: courseChapters1
                    }})
                

                // }
                console.log("update submited successfully");
                res.status(201).json({
                    msg: "update submited successfully",
                });
            }
        } catch (err) {
            console.log(err);

            console.log("something went wrong");
            res.status(404).json({ msg: "something went wrong" });
        }
    }
);

instrutor.delete("/deleteCourse", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "not approved",
            instructorName: req.name,
        });
        console.log(CourseTitle);

        if (!result) {
            console.log("Course not found");
            res.status(401).json({ msg: "Course not found" });
        } else {
            await courseSample.deleteOne({
                courseTitle: CourseTitle,
                status: "not approved",
                instructorName: req.name,
            });
            console.log("Course deleted  successfully");
            res.status(401).json({ msg: "Course deleted  successfully" });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});
instrutor.delete("/deleteUpdate", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        const result = await updateCourseSample.findOne({
            courseTitle: CourseTitle,
            instructorName: req.name,
        });
        console.log(CourseTitle);

        if (!result) {
            console.log("Course not found");
            res.status(401).json({ msg: "Course not found" });
        } else {
            await updateCourseSample.deleteOne({
                courseTitle: CourseTitle,
                instructorName: req.name,
            });
            console.log("Course deleted  successfully");
            res.status(401).json({ msg: "Course deleted  successfully" });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

instrutor.post("/blockCourse", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "approved",
            instructorName: req.name,
        });
        if (!result) {
            console.log("Course not found");
            res.status(401).json({ msg: "Course not found" });
        } else {
            await courseSample.updateOne(
                { courseTitle: CourseTitle },
                { $set: { status: "blocked" } }
            );
            console.log("Course blocked  successfully");
            res.status(401).json({ msg: "Course blocked  successfully" });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

instrutor.get("/homePage", async (req, res) => {
    console.log("inside home instuctor");
    try {
        const InstructorName = req.name;
        console.log(InstructorName);

        const submitResult = await courseSample.find({
            instructorName: InstructorName,
            status: "not approved",
        });
        const approveResult = await courseSample.find({
            instructorName: InstructorName,
            status: "approved",
        });
        // console.log(submitResult);
        // console.log(approveResult);

        console.log("data fetched successfully..");
        console.log(submitResult.length);
        console.log(approveResult.length);
        res.status(200).json({
            msg: "get course successfully",
            mySubmit: submitResult,
            myApprove: approveResult,
        });
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

instrutor.get("/viewCourse", async (req, res) => {
    try {
        const { id } = req.query;
        const result = await courseSample.findOne({
            _id: id,
            instructorName: req.name,
        });
        if (!result) {
            console.log("course not found");
            res.status(404);
        } else {
            console.log("course found");
            res.status(200).json({
                couseInfo: result,
            });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

instrutor.get('/getProfile',async (req, res) => {
    try {
        const profileInfo = await profileSample.findOne({userName:req.name})
        if(profileInfo){
            console.log("profile send successfully");
            res.status(200).json({profileInfo:profileInfo})
        }else{
            console.log("student not found");
            res.status(400).json({msg:"student not found"})
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
})

instrutor.put("/updateProfile",async (req, res) => {
    try{
        const {FirstName,LastName,Email,PhoneNumber,DOB,City,Country,Pin} = req.body
        // console.log("inside");
        
        // console.log("un",req.body);
        // console.log("firstname",Country);
        
        
        const result = await profileSample.findOne({userName:req.name})
        if(result){
            await profileSample.updateOne({userName:req.name},{$set:{firstName:FirstName,lastName:LastName,dob:DOB,email:Email,phoneNumber:PhoneNumber,city:City,country:Country,pin:Pin}})
            console.log("profile updated successfully");
            res.status(200).json({ msg: "profile updated successfully" });
        }else{
            console.log("profile not found");
            res.status(404).json({ msg: "profile not found" });
        }
    }catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
})

instrutor.get("/paymentInfo", async (req, res) => {
    try {
        const result = await instructorWallet.findOne({
            instructorName: req.name,
        });
        console.log(req.name);
        
        if(result){
            if(result.wallet.length==0){
                console.log("Empty Wallet Info");
                res.status(400).json({ msg: "Empty Wallet Info" });
            }else{
                console.log("success");
                res.status(200).json({wallet:result.wallet})
            }
        }else{
            console.log("instrutor have no wallet info");
            res.status(404).json({ msg: "instrutor have no wallet info" });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});


// instrutor.get("/viewWallet",async(req,res)=>{
//     try{
//         const {InstructorName} = req.body

//         const result = await instructorWallet.findOne({instructorName:InstructorName})
//         if(!result){
//             console.log("instutor not have a wallet");
//             res.status(400)
//         }else{
//             console.log("instructor have a wallet");
//             res.status(200).json({
//                 instructorWallet:result.wallet
//             })
//         }

//     }catch (err) {
//         console.log(err);

//         console.log("something went wrong");
//         res.status(404).json({ msg: "something went wrong" });
//     }
// })

export default instrutor;

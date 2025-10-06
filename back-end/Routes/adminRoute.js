import { Router } from "express";
import {
    courseSample,
    instructorWallet,
    profileSample,
    updateCourseSample,
    adminWallet,
    studentActivitySample,
} from "../Models/sample.js";

const admin = Router();

admin.get("/dashboard", async (req, res) => {
    console.log("inside dashboard");

    try {
        const pendingApprove = await courseSample.find({
            status: "not approved",
        });
        const approvedCourse = await courseSample.find({ status: "approved" });
        const updatedCourses = await updateCourseSample.find();
        console.log("sending successfully");
        console.log("not approved", pendingApprove.length);
        console.log("approved", approvedCourse.length);
        console.log("updatd", updatedCourses.length);

        res.status(200).json({
            pending: pendingApprove,
            approved: approvedCourse,
            updated: updatedCourses,
        });
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.get("/viewCourse", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        const result = await courseSample.findOne({ courseTitle: CourseTitle });
        if (!result) {
            console.log("course not found");
            res.status(404).json({ msg: "course not found" });
        } else {
            console.log("course find successfully");
            res.status(200).json({
                msg: "course find successfully",
                // couseInfo: result,
            });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.post("/viewUpdatedCourses", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        // const result = await courseSample.updateOne(
        //     { courseTitle: CourseTitle, status: "not approved" },
        //     { $set: { status: "approved" } }
        // );
        const result = await updateCourseSample.findOne({
            courseTitle: CourseTitle,
        });

        if (!result) {
            console.log("course not found");
            res.status(404).json({ msg: "course not found" });
        } else {
            await updateCourseSample.findOne({ courseTitle: CourseTitle });
            console.log("course viewed successfully");
            res.status(200).json({ msg: "course viewed successfully" });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.delete("/deleteCourse", async (req, res) => {
    try {
        // const { CourseTitle } = req.body;
        console.log("inside deleete cours admin");
        
        const { id } = req.query;

        const result = await courseSample.findOne({
        _id: id,
            // status: "not approved",
        });
        if (!result) {
            console.log("course not found");
            res.status(404);
        } else {
            await courseSample.deleteOne({
                _id: id,
            });
            console.log("course deleted successfully");
            res.status(200).json({ msg: "course deleted successfully" });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.delete("/deleteUpdate", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        const result = await updateCourseSample.findOne({
            courseTitle: CourseTitle,
        });
        console.log(CourseTitle);

        if (!result) {
            console.log("Course not found");
            res.status(401).json({ msg: "Course not found" });
        } else {
            await updateCourseSample.deleteOne({ courseTitle: CourseTitle });
            console.log("Course deleted  successfully");
            res.status(401).json({ msg: "Course deleted  successfully" });
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.post("/blockCourse", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "approved",
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

admin.post("/approveCourse", async (req, res) => {
    try {
        // const { CourseTitle } = req.body;
        const { id } = req.query;

        // const result = await courseSample.updateOne(
        //     { courseTitle: CourseTitle, status: "not approved" },
        //     { $set: { status: "approved" } }
        // );
        const result = await courseSample.findOne({
            _id: id,
            status: "not approved",
        });

        if (!result) {
            console.log("course not found");
            res.status(404);
        } else {
            await courseSample.updateOne(
                { _id: id, status: "not approved" },
                { $set: { status: "approved" } }
            );
            console.log("course approved");
            res.status(200);
        }
    } catch (err) {
        console.log(err);

        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.get("/getProfile", async (req, res) => {
    try {
        const profileInfo = await profileSample.findOne({ userName: req.name });
        if (profileInfo) {
            console.log("profile send successfully");
            res.status(200).json({ profileInfo: profileInfo });
        } else {
            console.log("student not found");
            res.status(400).json({ msg: "student not found" });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.put("/updateProfile", async (req, res) => {
    try {
        const {
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            DOB,
            City,
            Country,
            Pin,
        } = req.body;
        // console.log("inside");

        // console.log("un",req.body);
        // console.log("firstname",Country);

        const result = await profileSample.findOne({ userName: req.name });
        if (result) {
            await profileSample.updateOne(
                { userName: req.name },
                {
                    $set: {
                        firstName: FirstName,
                        lastName: LastName,
                        dob: DOB,
                        email: Email,
                        phoneNumber: PhoneNumber,
                        city: City,
                        country: Country,
                        pin: Pin,
                    },
                }
            );
            console.log("profile updated successfully");
            res.status(200).json({ msg: "profile updated successfully" });
        } else {
            console.log("profile not found");
            res.status(404).json({ msg: "profile not found" });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.get("/paymentInfo", async (req, res) => {
    try {
        const result = await adminWallet.findOne({
            adminName: req.name,
        });
        if(result){
            if(result.wallet.length==0){
                console.log("Empty Wallet Info");
                res.status(400).json({ msg: "Empty Wallet Info" });
            }else{
                console.log("success");
                res.status(200).json({wallet:result.wallet})
            }
        }else{
            console.log("admin have no wallet info");
            res.status(404).json({ msg: "admin have no wallet info" });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

admin.get("/learnCourse", async (req, res) => {
    try {
        console.log("inside");

        const { CourseTitle } = req.body;
        console.log(CourseTitle);

        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "approved",
        });
        if (!result) {
            console.log("invalid course title");
            res.status(404).json({ msg: "invalid course title" });
        } else {
            const stuentActivity = await studentActivitySample.findOne({
                studentName: req.name,
            });
            if (stuentActivity) {
                if (stuentActivity.purchaseInfo.includes(CourseTitle)) {
                    const Chapters = result.courseChapters;
                    // res.status(200)json({});
                    console.log("get course successfully");
                    // console.log(Chapters);
                    res.status(200).json({
                        msg: "get course successfully",
                        // chapters: Chapters,
                    });
                } else {
                    console.log("student not purchased this course");
                    res.status(401).json({
                        msg: "student not purchased this course",
                    });
                }
            } else {
                console.log("student not purchased this course");
                res.status(401).json({
                    msg: "student not purchased this course",
                });
            }
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

export default admin;

import { json, Router } from "express";
import {
    courseSample,
    instructorWallet,
    adminWallet,
    studentActivitySample,
    profileSample,
} from "../Models/sample.js";
import instrutor from "./instructorRoute.js";

const student = Router();
student.post("/hai", async (req, res) => {
    console.log();

    console.log("inside my main student hai");
});

student.get("/Home", async (req, res) => {
    try {
        const result = await courseSample.find({ status: "approved" });
        if (!result) {
            console.log("course not found");
            res.status(404);
        } else {
            const stuentActivity = await studentActivitySample.findOne({
                studentName: req.name,
            });
            console.log("activity");

            console.log(stuentActivity);

            if (stuentActivity) {
                const concatArray = stuentActivity.purchaseInfo.concat(stuentActivity.certificateInfo)
                const notEntrolledCourse = result.filter(
                    (course) =>
                        !concatArray.includes(
                            course.courseTitle
                        )
                );
                console.log(notEntrolledCourse.length);
                console.log("courses  sending successfully ");
                res.status(200).json({
                    msg: "courses  sending successfully",
                    courses: notEntrolledCourse,
                });
            } else {
                console.log(result.length);

                console.log("courses  sending successfully ");
                res.status(200).json({
                    msg: "courses  sending successfully",
                    courses: result,
                });
            }
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.get("/viewCourseDetails", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        console.log(CourseTitle);

        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "approved",
        });
        if (!result) {
            console.log("course not found");
            res.status(404).json({ msg: "course not found" });
        } else {
            console.log("course info sending ");
            res.status(200).json({
                msg: "course info sending",
                // courseInfo: result,
            });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.post("/viewCourseDetails/buyCourse", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        console.log("ct", CourseTitle);

        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "approved",
        });
        if (!result) {
            console.log("course not found");
            res.status(404).json({ errorMessage: "course not found" });
        } else {
            const stuentActivity = await studentActivitySample.findOne({
                studentName: req.name,
            });

            if (stuentActivity) {
                if (
                    stuentActivity.purchaseInfo.includes(CourseTitle) ||
                    stuentActivity.certificateInfo.includes(CourseTitle)
                ) {
                    console.log("You alrady purchased this course");
                    res.status(201).json({
                        errorMessage: "You alrady purchased this course",
                    });
                } else {
                    const CartInfo = stuentActivity.cartInfo;
                    if (CartInfo.includes(CourseTitle)) {
                        let index = CartInfo.indexOf(CourseTitle);
                        if (index !== -1) {
                            CartInfo.splice(index, 1);
                        }
                    }
                    const PuchaseInfo = stuentActivity.purchaseInfo;
                    // .push(CourseTitle);
                    console.log("p info");
                    PuchaseInfo.push(CourseTitle);
                    // console.log(PuchaseInfo);

                    await studentActivitySample.updateOne(
                        { studentName: req.name },
                        {
                            $set: {
                                purchaseInfo: PuchaseInfo,
                                cartInfo: CartInfo,
                            },
                        }
                    );
                    instrutorPayment(
                        result.instructorName,
                        result.courseTitle,
                        req.name,
                        result.price
                    );
                    adminPayment(
                        result.instructorName,
                        result.courseTitle,
                        req.name,
                        result.price
                    );
                    console.log("Course purchased successfully this course");
                    res.status(201).json({
                        successMessage: "Course purchased successfully",
                    });
                }
            } else {
                const newStudentActivity = new studentActivitySample({
                    studentName: req.name,
                    purchaseInfo: [CourseTitle],
                });
                await newStudentActivity.save();
                instrutorPayment(
                    result.instructorName,
                    result.courseTitle,
                    req.name,
                    result.price
                );
                adminPayment(
                    result.instructorName,
                    result.courseTitle,
                    req.name,
                    result.price
                );
                console.log("Course purchased successfully this course");
                res.status(201).json({
                    successMessage: "Course purchased successfully",
                });
            }
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ errorMessage: "something went wrong" });
    }
});

async function instrutorPayment(
    InstructorName,
    CourseTitle,
    StudentName,
    CoursePrice
) {
    const instrutorPayment = parseInt((CoursePrice / 100) * 60);
    const paymentInfo = {
        courseTitle: CourseTitle,
        studentName: StudentName,
        coursePrice: CoursePrice,
        yourEarn: instrutorPayment,
    };
    const instructorInfo = await instructorWallet.findOne({
        instructorName: InstructorName,
    });
    if (instructorInfo) {
        const paymentArray = instructorInfo.wallet;
        paymentArray.push(paymentInfo);
        await instructorWallet.updateOne(
            { instructorName: InstructorName },
            { $set: { wallet: paymentArray } }
        );
        console.log("instructor payment info added successfully instrutor1");
    } else {
        const newInstructorInfo = new instructorWallet({
            instructorName: InstructorName,
            wallet: [paymentInfo],
        });
        await newInstructorInfo.save();
        console.log("instructor payment info added successfully instructor2");
    }
}

async function adminPayment(
    InstructorName,
    CourseTitle,
    StudentName,
    CoursePrice
) {
    const adminPayment = parseInt((CoursePrice / 100) * 40);
    const paymentInfo = {
        courseTitle: CourseTitle,
        instructorName: InstructorName,
        studentName: StudentName,
        coursePrice: CoursePrice,
        yourEarn: adminPayment,
    };
    console.log("inside admin");
    
    const result = await profileSample.findOne({ userRole: "admin" });
    console.log("username");
    
    console.log(result.userName);
    
    if (result) {
        const AdminName = result.userName;
        console.log("admin naem",AdminName);
        
        const adminInfo = await adminWallet.findOne({
            adminName: AdminName,
        });
        // console.log(adminInfo);
        
        if (adminInfo) {
            const paymentArray = adminInfo.wallet;
            paymentArray.push(paymentInfo);
            await adminWallet.updateOne(
                { adminName: AdminName },
                { $set: { wallet: paymentArray } }
            );
            console.log(" admin payment info added successfully admin1");
        } else {
            const newAdminInfo = new adminWallet({
                adminName: AdminName,
                wallet: [paymentInfo],
            });
            await newAdminInfo.save();
            console.log("admin payment info added successfully admin2");
        }
    }else{
        console.log("admin not found");
        
    }
}

student.get("/learnCourse", async (req, res) => {
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

student.post("/addtoCart", async (req, res) => {
    try {
        const { CourseTitle } = req.body;
        console.log(CourseTitle);

        const result = await courseSample.findOne({
            courseTitle: CourseTitle,
            status: "approved",
        });
        if (!result) {
            console.log("invalid course title");
            res.status(404).json({ errorMessage: "invalid course title" });
        } else {
            const stuentActivity = await studentActivitySample.findOne({
                studentName: req.name,
            });
            if (stuentActivity) {
                if (
                    stuentActivity.purchaseInfo.includes(CourseTitle) ||
                    stuentActivity.certificateInfo.includes(CourseTitle)
                ) {
                    // const Chapters = result.courseChapters;
                    // res.status(200)json({});
                    console.log(
                        "you already purchsed this course. No need to add to cart"
                    );
                    // console.log(Chapters);
                    res.status(200).json({
                        errorMessage: "you already purchsed this course",
                    });
                } else {
                    if (stuentActivity.cartInfo.includes(CourseTitle)) {
                        console.log("you already added this course to cart");
                        res.status(200).json({
                            errorMessage: "you already added this course to cart",
                        });
                    } else {
                        const CartInfo = stuentActivity.cartInfo;
                        CartInfo.push(CourseTitle);
                        // console.log(stuentActivity.cartInfo);

                        console.log(CartInfo);

                        await studentActivitySample.updateOne(
                            { studentName: req.name },
                            { $set: { cartInfo: CartInfo } }
                        );
                        console.log("course added to the cart");
                        res.status(200).json({
                            successMessage: "course added to the cart",
                        });
                    }
                }
            } else {
                const newStudentActivity = new studentActivitySample({
                    studentName: req.name,
                    cartInfo: [CourseTitle],
                });
                await newStudentActivity.save();
                console.log("Course added to the cart successfully ");
                res.status(201).json({
                    successMessage: "course added to the cart",
                });
            }
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.post("/removeFromCart", async (req, res) => {
    try {
        // const { CourseTitle } = req.body;
        const { id } = req.query;

        // console.log(CourseTitle);

        const result = await courseSample.findOne({
            _id: id,
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
                const CartInfo = stuentActivity.cartInfo;
                if (CartInfo.includes(result.courseTitle)) {
                    let index = CartInfo.indexOf(result.courseTitle);
                    if (index !== -1) {
                        CartInfo.splice(index, 1);
                    }
                    await studentActivitySample.updateOne(
                        { studentName: req.name },
                        { $set: { cartInfo: CartInfo } }
                    );
                    console.log("Course Removed fromCart");
                    res.status(200).json({ msg: "Course Removed fromCart" });
                } else {
                    console.log("Course is not in the cart");
                    res.status(400).json({ msg: "Course is not in the cart" });
                }
            } else {
                console.log("you have empty Cart");
                res.status(400).json({ msg: "you have empty Cart" });
            }
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.get("/viewMyCart", async (req, res) => {
    try {
        const stuentActivity = await studentActivitySample.findOne({
            studentName: req.name,
        });
        if (stuentActivity) {
            const CartInfo = stuentActivity.cartInfo;
            if (CartInfo.length == 0) {
                console.log("Empty Cart");
                res.status(400).json({ msg: "Empty Cart" });
            } else {
                console.log(CartInfo);
                res.status(200).json({ msg: "Display Cart successfully" });
            }
        } else {
            console.log("Empty Cart");
            res.status(400).json({ msg: "Empty Cart " });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.get("/myActivity", async (req, res) => {
    try {
        const stuentActivity = await studentActivitySample.findOne({ 
            studentName: req.name,
        });
        if (stuentActivity) {
            const PurchaseInfo = stuentActivity.purchaseInfo.concat(stuentActivity.certificateInfo).concat(stuentActivity.cartInfo);
            if (PurchaseInfo.length == 0) {
                console.log("Empty Cart");
                res.status(400).json({ msg: "Empty Cart" });
            } else {
                const courseInfo = [];
                for (const val of stuentActivity.purchaseInfo) {
                    // console.log(val);
                    const fullCourse = await courseSample.findOne({
                        courseTitle: val,
                    });
                    courseInfo.push(fullCourse);
                }
                console.log(courseInfo.length);

                const certiInfo = [];

                for (const val of stuentActivity.certificateInfo) {
                    // console.log(val);
                    const fullCourse = await courseSample.findOne({
                        courseTitle: val,
                    });
                    certiInfo.push(fullCourse);
                }
                console.log(courseInfo.length);
                const cartInfo = [];

                for (const val of stuentActivity.cartInfo) {
                    // console.log(val);
                    const fullCourse = await courseSample.findOne({
                        courseTitle: val,
                    });
                    cartInfo.push(fullCourse);
                }
                console.log(courseInfo.length);

                // const cetiArray = stuentActivity.certificateInfo

                // console.log(PurchaseInfo);
                res.status(200).json({
                    msg: "Display Buy successfully",
                    courseBuy: courseInfo,
                    certificate: certiInfo,
                    cartInfo: cartInfo,
                    certificateTitles: stuentActivity.certificateInfo,
                });
            }
        } else {
            console.log("Empty User activity");
            res.status(400).json({ msg: "Empty User activity" });
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.post("/compleCourse", async (req, res) => {
    try {
        // const { CourseTitle } = req.body;
        const { id } = req.query;

        const result = await courseSample.findOne({
            _id: id,
            status: "approved",
        });
        if (!result) {
            console.log("course not found");
            res.status(404);
        } else {
            let check = false;
            const activity = await studentActivitySample.findOne({
                studentName: req.name,
            });
            console.log("activity", activity);

            if (activity) {
                const certiArray = activity.certificateInfo;
                certiArray.forEach((val, index) => {
                    if (val == result.courseTitle) {
                        check = true;
                    }
                });
                if (check == true) {
                    console.log("course already completed");
                    res.status(400).json({ msg: "course already completed" });
                } else {
                    certiArray.push(result.courseTitle);
                    console.log("certiArray", certiArray);

                    const buyArray = activity.purchaseInfo;
                    const index = buyArray.indexOf(result.courseTitle);
                    if (index !== -1) {
                        buyArray.splice(index, 1); 
                    }
                    await studentActivitySample.updateOne( 
                        { studentName: req.name },
                        { $set: { certificateInfo: certiArray,purchaseInfo:buyArray } }
                    );
                    console.log("course added successfully1");
                    res.status(200).json({ msg: "course added successfully1" });
                }
            } else {
                const newActivity = new studentActivitySample({
                    studentName: req.name,
                    certificate: [result.courseTitle],
                });
                await newActivity.save();
                console.log("course added successfully2");
                    res.status(200).json({ msg: "course added successfully2" });
                
            }
        }
    } catch (err) {
        console.log(err);
        console.log("something went wrong");
        res.status(404).json({ msg: "something went wrong" });
    }
});

student.get("/getProfile", async (req, res) => {
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

student.put("/updateProfile", async (req, res) => {
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

export default student;

import { Schema, model } from "mongoose";

const signupSchmema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: {
        type: String,
        enum: ["admin", "instructor", "student"],
        required: true,
    },
    email: String,
    phoneNumber : String,
    dob: Date,
    country : String,
    city : String,
    pin : Number

});
const profileSample = model("profile", signupSchmema);

const courseSchema = new Schema({
    courseTitle: { type: String, required: true, unique: true },
    instructorName: { type: String, required: true },
    status:{ type: String, required: true ,enum:["not approved","approved","blocked"]},
    category: { type: String, required: true },
    courseLevel: { type: String, required: true },
    thumbnail: { type: String,  },
    courseDescription: { type: String, required: true },
    targetAudience: { type: String, required: true },
    price: { type: Number, required: true },
    courseRequirement: { type: [String], required: true },
    courseSummery: { type: [String], required: true },

    courseChapters: {type:Array},
});
const courseSample = model("courses", courseSchema);
const updateCourseSchema = new Schema({
    courseTitle: { type: String, required: true, unique: true },
    instructorName: { type: String, required: true },
   
    category: { type: String, required: true },
    courseLevel: { type: String, required: true },
    thumbnail: { type: String,  },
    courseDescription: { type: String, required: true },
    targetAudience: { type: String, required: true },
    price: { type: Number, required: true },
    courseRequirement: { type: [String], required: true },
    courseSummery: { type: [String], required: true },
    // courseChapters: {type:Array}, 
});
const updateCourseSample = model("updateCourses", updateCourseSchema);


const instructorWalletSchema = new Schema({
    instructorName:{ type: String, required: true, unique: true },
    wallet:Array
})

const instructorWallet = model("instrucorWallet",instructorWalletSchema)
const adminWalletSchema = new Schema({
    adminName:{ type: String, required: true, unique: true },
    wallet:Array
})

const adminWallet = model("adminWallet",adminWalletSchema)

const studentActivitySchema = new Schema({
    studentName:{ type: String, required: true, unique: true },
    cartInfo:Array,
    purchaseInfo:Array,
    certificateInfo:Array
})
const studentActivitySample = model("studentActivity",studentActivitySchema)

export { profileSample, courseSample,updateCourseSample ,instructorWallet,adminWallet,studentActivitySample};

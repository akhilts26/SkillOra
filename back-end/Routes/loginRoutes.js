import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { profileSample } from "../Models/sample.js";
import dotenv from "dotenv";
import authenticate from "../midleware/auth.js";

const router = Router();

router.post("/signup", async (req, res) => {
    console.log("inside signup");
    // console.log(req.body);

    try {
        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        // console.log("inside signup");
        // console.log(req.body);

        const result = await profileSample.findOne({ userName: UserName });

        if (result) {
            // console.log(result);
            console.log("UserName Already Exist");
            res.status(400).json({ msg: "UserName Already Exist" });
        } else {
            // console.log('jao');

            const newPassword = await bcrypt.hash(Password, 10);
            // console.log();

            const newUser = new profileSample({
                firstName: FirstName,
                lastName: LastName,
                userName: UserName,
                password: newPassword,
                userRole: UserRole,
            });
            await newUser.save();
            // console.log("new user");

            // console.log(newUser);

            console.log("sign up successfully");
            res.status(201).json({ msg: "Sign Up successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    
    try {
        console.log("inside");

        const { UserName, Password } = req.body;
        const result = await profileSample.findOne({ userName: UserName });
        if (!result) {
            console.log("Invalid UserName");
            res.status(401).json({ msg: "Invalid UserName" });
        } else {
            const valid = await bcrypt.compare(Password, result.password);
            if (valid) {
                const token = jwt.sign(
                    { UserName, UserRole: result.userRole },
                    process.env.SECRET_KEY,
                    { expiresIn: "3hr" }
                );
                if (token) {
                    res.cookie("authToken", token, {
                        httpOnly: true,
                    });
                    console.log("Succesfully loggedin11");

                    res.status(200).json({ message: "Succesfully loggedin11" });
                } else {
                    console.log("Something wrong in token generation");

                    res.status(400).json({
                        message: "Something wrong in token generation",
                    });
                }
            } else {
                console.log("wrong password");
                res.status(404).json({ msg: "wrong password" });
            }
        }
    }   catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/profile',authenticate,(req,res)=>{
    console.log("inside profile");
    
    res.status(200).json({userName:req.name,userRole:req.role})
})

router.post("/logout", (req, res) => {
    const cookieOpts = {
        httpOnly: true,
        sameSite: "lax", // match your login
        secure: process.env.NODE_ENV === "production",
        path: "/", // match path
        // domain: '.yourdomain.com',                  // include if you set it at login
    };

    res.clearCookie("authToken", cookieOpts);
    res.cookie("authToken", "", { ...cookieOpts, expires: new Date(0) });
    res.set("Cache-Control", "no-store, private");
    res.status(200).json({ msg: "Successfully logged out" });
});

export default router;

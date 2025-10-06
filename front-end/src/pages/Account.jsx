import React, { useContext, useEffect, useState } from "react";
import "./styles/account.css";
import { Link } from "react-router-dom";
import MyContext from "../main";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const { register, setRegister } = useContext(MyContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("user");
    const [error, setError] = useState("");
    const { profile, setProfile } = useContext(MyContext);

    const navigate = useNavigate();

    const handleAccount = async (e) => {
        e.preventDefault();
        if (register == "Sign Up") {
            try {
                const response = await fetch("/skillora/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        FirstName: firstName,
                        LastName: lastName,
                        UserName: userName,
                        Password: password,
                        UserRole: userRole,
                    }),
                });
                setFirstName("");
                setLastName("");
                setUserName("");
                setPassword("");
                setUserRole("");
                // console.log(response);

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || "signUP failed");
                }
                setRegister("Sign In");
            } catch (err) {
                setError(err.message || "Signup Failed: Please Try Again!");
            }
        } else {
            try {
                const response = await fetch("/skillora/login", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        UserName: userName,
                        Password: password,
                    }),
                });
                // console.log(response);

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || "Login Failed");
                } else {
                    const fetchProfile = async () => {
                        try {
                            const response = await fetch("/skillora/profile", {
                                method: "GET",
                                credentials: "include",
                            });
                            if (!response.ok) {
                                throw new Error("Unauthorized Access!");
                            }
                            const data = await response.json();
                            if (data.msg) {
                                setError(data.msg);
                            }
                            setProfile(data);
                            // console.log(profile);
                        } catch (err) {
                            setError(err.message || "Error fetching Profile");
                            navigate("/account");
                        }
                    };
                    fetchProfile();
                }
            } catch (err) {
                setError(err.message || "Signup Failed: Please Try Again!");
            }
        }
    };

    if (profile) {
        if (profile.userRole == "admin") {
            navigate("/admin/dashboard");
        } else if (profile.userRole == "instructor") {
            navigate("/instructor/home");
        } else {
            navigate("/student/home");
        }
    }
    return (
        <div className="signup-body h-[100vh]">
            <div className="container ">
                <h1>{register}</h1>
                {error && <p className="text-red-500 mb-4"> {error}</p>}

                <form onSubmit={handleAccount}>
                    {register == "Sign Up" && (
                        <div>
                            <input
                                required
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    )}
                    <input
                        required
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <input
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {register == "Sign Up" && (
                        <select
                            value1={userRole}
                            required
                            onChange={(e) => setUserRole(e.target.value)}
                            name="UserRole"
                            className={`account-select w-full p-2 border rounded mt-1 `}
                        >
                            <option value="" hidden>
                                User Role
                            </option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    )}
                    <button type="submit" className="mt-2 mb-2 ">
                        {register}
                    </button>
                    {register == "Sign Up" ? (
                        <p className="text-[14px]">
                            Already have an accont?{" "}
                            <span
                                className="cursor-pointer text-bold hover:border-b-[2px] text-[16px]"
                                onClick={() => setRegister("Sign In")}
                            >
                                Sign in
                            </span>
                        </p>
                    ) : (
                        <p className="text-[14px]">
                            Don't have an accont?{" "}
                            <span
                                className="cursor-pointer text-bold hover:border-b-[2px] text-[16px]"
                                onClick={() => setRegister("Sign Up")}
                            >
                                Sign up
                            </span>
                        </p>
                    )}
                </form>
                <Link to="/" className="text-[30px] mt-2">
                    &larr;<span className="text-[16px]">back</span>
                </Link>
            </div>
        </div>
    );
};

export default Account;

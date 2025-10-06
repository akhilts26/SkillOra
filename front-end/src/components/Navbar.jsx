import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { Link, NavLink, useMatch } from "react-router-dom";
import MyContext from "../main";

import React, { useContext, useState } from "react";

const Navbar = () => {
    console.log("nav");
    const { profile, setProfile } = useContext(MyContext);
    let {role}= useContext(MyContext);
    role = profile?.userRole || "user";


    const { register, setRegister,logout } = useContext(MyContext);
    console.log(register);

   const onLogout = async () => {
    try {
      await logout();                         // clears cookie + state
      toast.success("Logged out");
      navigate("/", { replace: true });  // prevent Back from reviving
    } catch {
      toast.error("Logout failed");
    }
  };




    return (
        <div className="nav-body z-50 bg-[#cdcecf] fixed margin-top">
            <div className="navContent  flex max-md:grid">
                <div className="text-[1.2rem] flex gap-[14px] items-center max-md:grid max-md:gap-0">
                    <p className="text-[18px] font-[600] max-md:ml-2 ">
                        Skill<span className="text-[35px] font-[500]">ora</span>
                    </p>
                    {/* <div className="  relative flex items-center">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute  ml-7  text-[16px]"
                        />
                        <input
                            type="text"
                            placeholder="What You Looking for?"
                        />
                    </div> */}
                    <div className="options flex gap-10 font-bold text-[#5c5b5b] text-[16px] ml-8 max-md:ml-2 ">
                        {role == "user" ? (
                            <>
                            <NavLink to="/" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>Home</NavLink>
                            <NavLink to="/courses" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>Courses</NavLink>
                            </>
                        ) : role == "student" ? (
                            <>
                            <NavLink className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"} to="/student/home">Home</NavLink>
                            <NavLink className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"} to="/student/myActivity">My Activity</NavLink>

                            

                            </>
                        ) : role == "admin" ? (
                            <>
                            <NavLink className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"} to="/admin/dashboard">Dashboard</NavLink>
                                <NavLink to="/admin/wallet" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>Wallet</NavLink>
                            
                            </>
                            
                        ) : (
                            <>
                                <NavLink to="/instructor/home" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>Home</NavLink>
                                <NavLink to="/instructor/addCourse" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>Add Course</NavLink>
                                <NavLink to="/instructor/wallet" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>Wallet</NavLink>
                            
                            </>
                        )}

        
                    </div>
                </div>

                <div className="flex  items-center gap-6 text-[#5c5b5b] font-bold">
                    {role != "user" && (
                        <div className="flex cursor-pointer items-center gap-1 text-[15px]  ">

                            
                            <NavLink to="/student/profile" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>
                            <p>Profile</p>
                            </NavLink>
                        </div>
                    )}
                    {/* <Link> */}
                    {role == "student" && (
                        
                            <NavLink to="/student/cart" className={({isActive})=>isActive?"border-b-2 text-black":"hover:text-black"}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="text-[16px]  cursor-pointer"
                            />
                            </NavLink>
                        

                    )}

                    {/* </Link> */}
                    {role == "user" ? (
                        <>
                            <Link
                                to="/account"
                                onClick={() => setRegister("Sign In")}
                                className=" hover:border-b-[4px] hover:text-[#0d0b0b] text-[16px]  px-2 py-1 cursor-pointer"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/account"
                                onClick={() => setRegister("Sign Up")}
                                className="bg-black hover:bg-[#454444]  text-white  rounded-full text-[16px]  px-8 py-1 cursor-pointer"
                            >
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/"
                            
                            onClick={onLogout}
                            className="bg-black hover:bg-[#454444]  text-white  rounded-full text-[16px]  px-8 py-1 cursor-pointer"
                        >
                            Log out
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
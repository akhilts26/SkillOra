import React, { useContext, useEffect, useState } from "react";

import MyContext from "../main";
import { toast } from "react-toastify";

const Profile = () => {
    const { profile, setProfile } = useContext(MyContext);

    let { role } = useContext(MyContext);

    role = profile?.userRole || "user";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!profile) return;
        // console.log("inside");

        const fetchCourse = async () => {
            try {
                let response;
                if (profile?.userRole === "student") {
                    response = await fetch("/skillora/student/getProfile", {
                        method: "GET",
                        credentials: "include",
                    });
                }
                if (profile?.userRole === "instructor") {
                    response = await fetch("/skillora/instructor/getProfile", {
                        method: "GET",
                        credentials: "include",
                    });
                }
                 if (profile?.userRole === "admin") {
                    response = await fetch("/skillora/admin/getProfile", {
                        method: "GET",
                        credentials: "include",
                    });
                }

                // console.log(response);

                const data = await response.json();
                if (data.profileInfo) {
                    console.log("yes");
                    setFirstName(data.profileInfo.firstName || "");
                    // console.log(data.profileInfo.firstName);
                    setLastName(data.profileInfo.lastName || "");
                    setEmail(data.profileInfo.email || "");
                    setPhoneNumber(data.profileInfo.phoneNumber || "");
                    setDob(data.profileInfo.dob || "");
                    setCountry(data.profileInfo.country || "");
                    setCity(data.profileInfo.city || "");
                    setPin(data.profileInfo.pin || "");

                    
                }
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, [profile]);

    const addNewData = async () => {
        console.log("inside");

        try {
            

            let response;
            if (profile?.userRole === "student") {
                response = await fetch("/skillora/student/updateProfile", {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                },

                    body: JSON.stringify({
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,

                        PhoneNumber: phoneNumber,
                        DOB: dob,
                        City: city,
                        Country: country,
                        Pin: pin,
                        // console.log(formData);
                    }),
                });
            }

            if (profile?.userRole === "instructor") {
                response = await fetch("/skillora/instructor/updateProfile", {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                },

                    body: JSON.stringify({
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,

                        PhoneNumber: phoneNumber,
                        DOB: dob,
                        City: city,
                        Country: country,
                        Pin: pin,
                        
                    }),
                });
            }

            if (profile?.userRole === "admin") {
                response = await fetch("/skillora/admin/updateProfile", {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                },

                    body: JSON.stringify({
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,

                        PhoneNumber: phoneNumber,
                        DOB: dob,
                        City: city,
                        Country: country,
                        Pin: pin,
                       
                    }),
                });
            }
            // console.log(response);
            toast.success("Data Updated Successfully")
            setEdit(false)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full  pt-20">
            <div className="w-[80%] m-auto bg-white p-10">
                <p className="text-[24px] font-bold">Personal information</p>

                <hr className="text-[#cdcecf] h-[2px] bg-[#cdcecf] -mx-10 my-6" />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="ml-2 my-1">first Name</p>
                        <input
                        required
                            readOnly={!edit}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                    <div>
                        <p className="ml-2 my-1">Last Name</p>
                        <input
                        required
                            readOnly={!edit}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                    <div>
                        <p className="ml-2 my-1">Your Role</p>
                        <input
                            readOnly={!edit}
                            type="email"
                            value={role}
                            // onChange={(e) => setEmail(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                    <div>
                        <p className="ml-2 my-1">Email</p>
                        <input
                            readOnly={!edit}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                    <div>
                        <p className="ml-2 my-1">Phone Number</p>
                        <input
                            readOnly={!edit}
                            type="Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>

                    {/* <div> 
                        <p className="ml-2 my-1">DOB</p>
                        <input
                            readOnly={!edit}
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div> */}
                    <div>
                        <p className="ml-2 my-1">Country</p>
                        <input
                            readOnly={!edit}
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                    <div>
                        <p className="ml-2 my-1">City</p>
                        <input
                            readOnly={!edit}
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className=" rounded-full w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                    <div>
                        <p className="ml-2 my-1">Pin</p>
                        <input
                            readOnly={!edit}
                            type="Number"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className=" rounded-full  w-full  h-[35px] text-[16px] border-[2px] border-[#cdcecf] focus:border-[#61acda]"
                        />
                    </div>
                </div>

                <div className=" text-end mt-6">
                    {edit ? (
                        <button
                            onClick={addNewData}
                            className=" text-[16px] font-bold px-8 rounded-full bg-[#00c853] hover:bg-[#00e676] py-1 mr-10 cursor-pointer"
                        >
                            Sumbit
                        </button>
                    ) : (
                        <button
                            onClick={() => setEdit(true)}
                            className=" text-[16px] font-bold px-8 rounded-full bg-[#0a81ff] hover:bg-[#0066cc] cursor-pointer py-1 mr-10"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

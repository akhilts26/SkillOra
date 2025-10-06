import React, { useContext, useEffect, useState } from "react";
import MyContext from "../main";
import { data } from "react-router-dom";

const ViewTrasations = () => {
    const { profile, setProfile } = useContext(MyContext);
    let { role } = useContext(MyContext);
    role = profile?.userRole || "user";
    console.log(role);
    const [walletData, setWalletData] = useState([]);

    useEffect(() => {
        if (!profile) return;
        const fetchCourse = async () => {
            try {
                let response;
                if (profile?.userRole === "admin") {
                    response = await fetch("/skillora/admin/paymentInfo", {
                        method: "GET",
                        credentials: "include",
                    });
                }
                if (profile?.userRole === "instructor") {
                    response = await fetch("/skillora/instructor/paymentInfo", {
                        method: "GET",
                        credentials: "include",
                    });
                }
                const data = await response.json();
                if (data.wallet) {
                    setWalletData(data.wallet);
                }
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourse();
    }, [profile]);

    console.log(walletData);

    return (
        <div className="w-full pt-20 flex flex-col min-h-screen">
            <div className="bg-white w-[83%]  m-auto px-20 py-10 ">
                <div className=" h-full">
                    <table className="w-full outline-[2px]">
                        <thead className="border bg-[#4682A9] text-white text-[16px] ">
                            <tr>
                                <th className="border-[2px] border-black">
                                    Sl no
                                </th>

                                <th className="border-[2px] border-black">
                                    Course Title
                                </th>
                                {role === "admin" && (
                                    <th className="border-[2px] border-black">
                                        Instructor Name
                                    </th>
                                )}

                                <th className="border-[2px] border-black">
                                    Student Name
                                </th>
                                <th className="border-[2px] border-black">
                                    Course Price
                                </th>
                                <th className="border-[2px] border-black">
                                    Your Earing
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center ">
                            {walletData.map((val, index) => (
                                <tr>
                                    <td className="border-[2px] border-[#cdcecf]">
                                        {index + 1}
                                    </td>
                                    <td className="border-[2px] border-[#cdcecf]">
                                        {val.courseTitle}
                                    </td>
                                    {role === "admin" && (
                                        <td className="border-[2px] border-[#cdcecf]">
                                            {val.instructorName}
                                        </td>
                                    )}
                                    <td className="border-[2px] border-[#cdcecf]">
                                        {val.studentName}
                                    </td>
                                    <td className="border-[2px] border-[#cdcecf]">
                                        {val.coursePrice}
                                    </td>
                                    <td className="border-[2px] border-[#cdcecf]">
                                        {val.yourEarn}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewTrasations;

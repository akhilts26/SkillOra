import React from "react";

const Footer = () => {
    return (
        <div className="w-full h-[150px] bg-[#302E2E] mt-10  p-5 max-md:h-[400px]">
            <div className="  w-[83%] h-full m-auto flex justify-between max-md:grid">
                <div className="w-[400px]">
                    <p className="text-[22px] font-bold text-white">Skillora</p>
                    <p className="text-[12px] text-white mt-2">
                        We're always in search for talented and motivated
                        people. Unlock full access to expert-led courses and
                        start learning without limits. Purchase your course
                        today and take the next step toward your future.
                    </p>
                </div>
                <div className="w-[300px]">
                    <p className="text-[18px] font-bold text-white">Social</p>
                    <p className="text-[12px] text-white mt-2">
                        Instagram
                        <br />
                        LinkedIn
                        <br />
                        X/ Twitter
                    </p>
                </div>
                <div className="w-[200px]">
                    <p className="text-[18px] font-bold text-white">Contact</p>
                    <p className="text-[12px] text-white mt-2">
                        skillora@gmail.com <br />
                        +000 000 0000
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;

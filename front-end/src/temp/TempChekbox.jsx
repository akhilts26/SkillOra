import React, { useState } from "react";

const TempChekbox = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        if (!firstName || !secondName) {
            alert(
                "Please fill in both First Name and Second Name before checking."
            );
            return;
        }
        setChecked(e.target.checked);
    };
    return (
        <div className="p-4 space-y-4">
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border p-2 rounded w-full"
                readOnly={checked}
            />

            <input
                type="text"
                placeholder="Second Name"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                className="border p-2 rounded w-full"
                readOnly={checked}
            />

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <label>Confirm after filling both names</label>
            </div>
        </div>
    );
};

export default TempChekbox;

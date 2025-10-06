import React, { useState } from "react";

const TempCourseAdd = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [names, setNames] = useState([]);
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName && lastName) {
            setNames([...names, { firstName, lastName }]);
            setFirstName("");
            setLastName("");
            setShowForm(false); // hide form after submit
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Display names */}
            <div style={{ marginBottom: "20px" }}>
                {names.map((n, index) => (
                    <span key={index} style={{ marginRight: "15px" }}>
                        {n.firstName} {n.lastName}
                    </span>
                ))}
            </div>

            {/* Show form if active */}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}

            {/* Add another button */}
            {!showForm && (
                <button onClick={() => setShowForm(true)}>
                    Add Another Name
                </button>
            )}
        </div>
    );
};

export default TempCourseAdd;

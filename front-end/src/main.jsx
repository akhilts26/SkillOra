import {
    createContext,
    StrictMode,
    useEffect,
    useState,
    useCallback,
} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, toast } from "react-toastify";

const MyContext = createContext();

function MyProvider({ children }) {
    const [register, setRegister] = useState("Sign Up");
    const [courses, setCourses] = useState([]);
    const [profile, setProfile] = useState(null);
    const role = "user";
    // const

    const logout = useCallback(async () => {
        await fetch("/skillora/logout", {
            method: "POST",
            credentials: "include",
        });
        setProfile(null); // drop client state immediately
    }, []);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/skillora/profile", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    setProfile(null);
                    return;
                }

                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <MyContext.Provider
            value={{
                register,
                setRegister,
                courses,
                setCourses,
                profile,
                setProfile,
                role,
                logout,
            }}
        >
            {children}
        </MyContext.Provider>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MyProvider>
            <App />
            <ToastContainer position="top-center" reverseOrder={false} />
        </MyProvider>
    </StrictMode>
);

export default MyContext;

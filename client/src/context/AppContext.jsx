import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export const AppContent = createContext()

export const AppContextProvider =(props)=>{


    axios.defaults.withCredentials = true;
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    console.log("🟢 Backend URL:", backendUrl);

    //initially user will be logged out i.e., loggedin will be false
    const[isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null);


    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
    
            if (data.success) {
                setIsLoggedin(true);
                console.log("✅ User is logged in");
                await getUserData();  // ✅ Ensure user data is fetched after login state is set
            } else {
                console.log("❌ User is NOT logged in");
                setIsLoggedin(false);
            }
        } catch (error) {
            console.error("🔴 Error in Auth Check:", error);
            toast.error(error.message);
        }
    };
    


    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/data");
    
            if (data.success) {
                console.log("🔵 User Data Fetched:", data.userData);
                setUserData(data.userData);
            } else {
                console.log("❌ User Data Not Found");
                toast.error(data.message);
            }
        } catch (error) {
            console.error("🔴 Error Fetching User Data:", error);
            toast.error(error.message);
        }
    };
    

    useEffect(()=>{
        getAuthState()
    },[])

    const value={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData
    }

    return(
        <AppContent.Provider value={value} >
            {props.children} 
        </AppContent.Provider>
    )
}
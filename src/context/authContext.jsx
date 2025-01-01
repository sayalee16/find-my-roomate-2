import {createContext, useState, useEffect } from "react";
import { data } from "react-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setCurrUser(userData);
        }
    }, []);

    const updateUser = (data) => {
        setCurrUser(data);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currUser));
    },[currUser]);
    return <AuthContext.Provider value={{currUser,updateUser}}>{children}</AuthContext.Provider>
}


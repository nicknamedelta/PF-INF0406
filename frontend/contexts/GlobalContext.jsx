import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [module, setModule] = useState("SERVICE_CALL");
    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    return <GlobalContext.Provider value={{ module, setModule, userType, setUserType, userId, setUserId }}>{children }</GlobalContext.Provider>;
};

export default GlobalContextProvider;

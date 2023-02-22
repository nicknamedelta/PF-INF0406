import React, { createContext, useState } from "react";

export const OrganizationContext = createContext();

const OrganizationContextProvider = ({ children }) => {    
    const [selectedOrganization, setSelectedOrganizaton] = useState(null);
    return <OrganizationContext.Provider value={{ selectedOrganization, setSelectedOrganizaton }}>{children }</OrganizationContext.Provider>;
};

export default OrganizationContextProvider;

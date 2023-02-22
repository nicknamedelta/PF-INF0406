import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { GlobalContext } from "../../contexts/GlobalContext";
import UserTable from "../Tables/UserTable/UserTable";
import OrganizationTable from "../Tables/OrganizationTable/OrganizationTable";
import DepartmentTable from "../Tables/DepartmentTable/DepartmentTable";
import ServiceCallTable from "../Tables/ServiceCallTable/ServiceCallTable";
const Routing = () => {
    const { module, setModule, userType, setUserType } = useContext(GlobalContext);
    return (
        <>
            {module == "SERVICE_CALL" && <ServiceCallTable />}
            {module == "USER" && <UserTable />}
            {module == "ORGANIZATION" && <OrganizationTable />}
            {module == "DEPARTMENT" && <DepartmentTable />}
        </>
    );
};

export default Routing;

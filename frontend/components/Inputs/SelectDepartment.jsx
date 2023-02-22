import React, { useContext, useEffect, useState } from "react";
import { SelectElement } from "react-hook-form-mui";
import { useQuery } from "react-query";
import listDepartmentByOrganization from "../../services/department/listDepartmentByOrganization";
import axios from "axios";
import { OrganizationContext } from "../../contexts/OrganizationContext";
export default function SelectDepartment({ name, label, onChange }) {
    const { selectedOrganization, setSelectedOrganizaton } = useContext(OrganizationContext);
    const [departments, setDepartments] = useState([]);
    /* const { data, error, isLoading, isSuccess, refetch } = useQuery("departments", listDepartmentByOrganization(selectedOrganization)); */
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/department/organization/${selectedOrganization}`).then((data) => {
            let options = data.data.map((row) => ({ id: row.id, label: row.name }));
            setDepartments(options);
        });
    }, [selectedOrganization]);

    return (
        <>
            <SelectElement name={name} label={label} sx={{ width: "100%" }} options={departments} type="string" />
        </>
    );
}

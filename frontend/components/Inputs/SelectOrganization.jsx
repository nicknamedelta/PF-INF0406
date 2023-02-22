import React, { useContext, useEffect, useState } from "react";
import { SelectElement } from "react-hook-form-mui";
import { useQuery } from "react-query";
import listOrganization from "../../services/organization/listOrganization";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import { useRouter } from "next/router";
export default function SelectOrganization({ name, label, onChange }) {
    const { selectedOrganization, setSelectedOrganizaton } = useContext(OrganizationContext);
    const [organizations, setOrganizations] = useState([]);
    const { data, error, isLoading, isSuccess } = useQuery("organizations", listOrganization);

    const router = useRouter();
    useEffect(() => {
        if (data != undefined) {
            let options = data.map((row) => ({ id: row.id, label: row.name }));
            setOrganizations(options);
        } else if (error) {
            console.log(error);

            router.push("/login");
        }
    }, [data]);
    const handleOrganizationChange = (value) => {
        setSelectedOrganizaton(value)
    };
    return (
        <>
            <SelectElement
                name={name}
                label={label}
                sx={{ width: "100%" }}
                onChange={(value) => handleOrganizationChange(value)}
                options={organizations}
                type="string"
            />
        </>
    );
}

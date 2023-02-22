import { Button, CircularProgress, Container, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "react-query";
import listDepartment from "../../../services/department/listDepartment";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteDepartmentButton from "./Buttons/DeleteDepartmentButton";
import CreateDepartmentForm from "./Forms/CreateDepartmentForm";
import OrganizationContextProvider, { OrganizationContext } from "../../../contexts/OrganizationContext";

const MySwal = withReactContent(Swal);

export default function DepartmentTable() {
    const [openCreateDepartmentForm, setOpenCreateDepartmentForm] = React.useState(false);
    const { data, error, isLoading, isSuccess, refech } = useQuery("Departments", listDepartment, {
        refetchInterval: 6000,
    });
    const columns = [
        { field: "name", headerName: "Nome", width: 300 },
        { field: "abbreviation", headerName: "Abreviação", width: 150 },
        { field: "place", headerName: "Localização", width: 450 },
        { field: "organization", headerName: "Organização", width: 150 },
        {
            field: "button",
            headerName: "Ações",
            width: 100,
            renderCell: (params) => <DeleteDepartmentButton params={params} />,
        },
    ];
    const handleOpenCreateDepartmentForm = () => {
        setOpenCreateDepartmentForm(true);
    };
    return (
        <>
            <OrganizationContextProvider>
                <CreateDepartmentForm open={openCreateDepartmentForm} setOpen={setOpenCreateDepartmentForm} />
            </OrganizationContextProvider>

            <Typography sx={{ mt: 3 }} textAlign="center" fontSize="32px">
                Departamentos
            </Typography>

            <Paper elevation={16} sx={{ height: 600, width: "80%", mt: 3 }}>
                <Box sx={{ display: "flex", widht: "100%", alignItems: "right", justifyContent: "right", m: 2 }}>
                    <Button variant="contained" onClick={handleOpenCreateDepartmentForm}>
                        Cadastrar Departamento
                    </Button>
                </Box>
                {data ? (
                    <DataGrid
                        sx={{ m: 1, height: "80%" }}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                        rows={data.map((row) => ({ ...row, organization: row.Organization.name }))}
                        columns={columns}
                    />
                ) : (
                    <Box sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                )}
            </Paper>
        </>
    );
}

import { Button, CircularProgress, Container, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "react-query";
import listUsers from "../../../services/user/listUsers";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteUserButton from "./Buttons/DeleteUserButton";
import CreateUserForm from "./Forms/CreateUserForm";
import OrganizationContextProvider, { OrganizationContext } from "../../../contexts/OrganizationContext";

const MySwal = withReactContent(Swal);

export default function UserTable() {
    const [openCreateUserForm, setOpenCreateUserForm] = React.useState(false);
    const { data, error, isLoading, isSuccess, refech } = useQuery("users", listUsers, {
        refetchInterval: 6000,
    });
    const columns = [
        { field: "name", headerName: "Nome", width: 150 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "userType", headerName: "Tipo de usuário", width: 100 },
        { field: "role", headerName: "Cargo", width: 150 },
        { field: "department", headerName: "Departamento", width: 200 },
        { field: "organization", headerName: "Organização", width: 150 },
        {
            field: "button",
            headerName: "Ações",
            width: 100,
            renderCell: (params) => params.row.userType != "admin" && <DeleteUserButton params={params} />,
        },
    ];
    const handleOpenCreateUserForm = () => {
        setOpenCreateUserForm(true);
    };
    return (
        <>
            <OrganizationContextProvider>
                <CreateUserForm open={openCreateUserForm} setOpen={setOpenCreateUserForm} />
            </OrganizationContextProvider>

            <Typography sx={{ mt: 3 }} textAlign="center" fontSize="32px">
                Usuários
            </Typography>

            <Paper elevation={16} sx={{ height: 600, width: "80%", mt: 3 }}>
                <Box sx={{ display: "flex", widht: "100%", alignItems: "right", justifyContent: "right", m: 2 }}>
                    <Button variant="contained" onClick={handleOpenCreateUserForm}>
                        Cadastrar Usuário
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
                        rows={data.map((row) => ({ ...row, department: row.Department.name, organization: row.Organization.name }))}
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

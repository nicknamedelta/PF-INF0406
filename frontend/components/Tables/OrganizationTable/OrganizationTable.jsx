import { Button, CircularProgress, Container, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "react-query";
import listOrganization from "../../../services/organization/listOrganization";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteOrganizationButton from "./Buttons/DeleteOrganizationButton";
import CreateOrganizationForm from "./Forms/CreateOrganizationForm";
import OrganizationContextProvider, { OrganizationContext } from "../../../contexts/OrganizationContext";

const MySwal = withReactContent(Swal);

export default function OrganizationTable() {
    const [openCreateOrganizationForm, setOpenCreateOrganizationForm] = React.useState(false);
    const { data, error, isLoading, isSuccess, refech } = useQuery("organizations", listOrganization,{
        refetchInterval: 6000,
      });

    const columns = [
        { field: "name", headerName: "Nome", width: 350 },
        { field: "email", headerName: "Email", width: 350 },
        { field: "cnpj", headerName: "CNPJ", width: 200 },
        { field: "cellphone", headerName: "Telefone", width: 150 },
        {
            field: "button",
            headerName: "Ações",
            width: 100,
            renderCell: (params) => <DeleteOrganizationButton params={params} />,
        },
    ];
    const handleOpenCreateOrganizationForm = () => {
        setOpenCreateOrganizationForm(true);
    };
    return (
        <>
            <OrganizationContextProvider>
                <CreateOrganizationForm open={openCreateOrganizationForm} setOpen={setOpenCreateOrganizationForm} />
            </OrganizationContextProvider>

            <Typography sx={{ mt: 3 }} textAlign="center" fontSize="32px">
                Organizações
            </Typography>

            <Paper elevation={16} sx={{ height: 600, width: "80%", mt: 3 }}>
                <Box sx={{ display: "flex", widht: "100%", alignItems: "right", justifyContent: "right", m: 2 }}>
                    <Button variant="contained" onClick={handleOpenCreateOrganizationForm}>
                        Cadastrar Organização
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
                        rows={data}
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

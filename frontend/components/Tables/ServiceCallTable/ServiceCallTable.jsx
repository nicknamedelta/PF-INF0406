import { Button, CircularProgress, Container, IconButton, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "react-query";
import listServiceCall from "../../../services/service_call/listServiceCall";
import listServiceCallByUser from "../../../services/service_call/listServiceCallByUser";

import { GlobalContext } from "../../../contexts/GlobalContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteUserButton from "./Buttons/DeleteServiceCallButton";
import FinishServiceCallButton from "./Buttons/FinishServiceCallButton";
import CreateUserForm from "./Forms/CreateServiceCallForm";
import OrganizationContextProvider, { OrganizationContext } from "../../../contexts/OrganizationContext";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function UserTable() {
    const { module, setModule, userType, setUserType, userId, setUserId } = useContext(GlobalContext);
    const [openCreateServiceCallForm, setOpenCreateServiceCallForm] = React.useState(false);
    const [isContextLoaded, setIsContextLoaded] = useState(false);
    const [data, setData] = useState([]);
    const { data: UserServiceCallList } = useQuery(["service_call_user", userId], () => listServiceCallByUser(userId), {
        enabled: isContextLoaded && userType !== "tec",
        refetchInterval: 4000,
    });

    const { data: ServiceCallList } = useQuery(["service_call"], () => listServiceCall(), {
        enabled: isContextLoaded && userType === "tec",
        refetchInterval: 4000,
    });

    useEffect(() => {
        setIsContextLoaded(true);
    }, []);

    useEffect(() => {
        if (userType !== "tec") {
            setData(UserServiceCallList);
        } else {
            setData(ServiceCallList);
        }
    }, [UserServiceCallList, ServiceCallList, userType]);

    /* useEffect(() => {
        if (userId && userType != 'tec') {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service-call/user/${userId}/all`).then(function (response) {
                setData(response.data);
            });
        }else if(userId && userType == 'tec'){
            
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service-call/all`).then(function (response) {
                setData(response.data);
            });
        }
    }, [userId]); */

    const columns = [
        { field: "longDescription", headerName: "Descrição", width: 300 },
        { field: "shortDescription", headerName: "Resumo", width: 300 },
        { field: "priority", headerName: "Prioridade", width: 100 },
        { field: "department", headerName: "Departamento", width: 200 },
        { field: "organization", headerName: "Organização", width: 150 },
        {
            field: "button",
            headerName: "Ações",
            width: 100,
            renderCell: (params) => (userType != "tec" ? <DeleteUserButton params={params} /> : <FinishServiceCallButton params={params} />),
        },
    ];
    const handleOpenCreateServiceCallForm = () => {
        setOpenCreateServiceCallForm(true);
    };
    return (
        <>
            <OrganizationContextProvider>
                <CreateUserForm open={openCreateServiceCallForm} setOpen={setOpenCreateServiceCallForm} />
            </OrganizationContextProvider>

            <Typography sx={{ mt: 3 }} textAlign="center" fontSize="32px">
                Chamados
            </Typography>

            <Paper elevation={16} sx={{ height: 600, width: "80%", mt: 3 }}>
                {userType != "tec" && (
                    <Box sx={{ display: "flex", widht: "100%", alignItems: "right", justifyContent: "right", m: 2 }}>
                        <Button variant="contained" onClick={handleOpenCreateServiceCallForm}>
                            Cadastrar Chamado
                        </Button>
                    </Box>
                )}
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

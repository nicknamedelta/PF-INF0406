import react, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormContainer, PasswordElement, SelectElement, TextFieldElement } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid } from "@mui/material";
import SelectDepartment from "../../../Inputs/SelectDepartment";
import SelectOrganization from "../../../Inputs/SelectOrganization";
import { OrganizationContext } from "../../../../contexts/OrganizationContext";
import createServiceCall from "../../../../services/service_call/createServiceCall";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function CreateServiceCallForm({ open, setOpen }) {
    const MySwal = withReactContent(Swal);
    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const { selectedOrganization, setSelectedOrganizaton } = useContext(OrganizationContext);

    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => createServiceCall(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Chamado cadastrado com sucesso", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao cadastrar o chamado", "", "error");
        },
    });
    const ServiceCallTypes = [
        {
            id: "admin",
            label: "Administrador",
        },
        {
            id: "tec",
            label: "Técnico",
        },
        {
            id: "common",
            label: "Comum",
        },
    ];

    const schema = yup.object().shape({
        longDescription: yup.string().min(14, 'Mínimo 14 caracteres').max(255, 'Máximo 24 caracteres').required("Descrição é obrigatória"),
        shortDescription: yup.string().min(4, 'Mínimo 14 caracteres').max(24, 'Máximo 24 caracteres').required("Resumo é obrigatório!"),
        priority: yup.number("Deve ser numérico").required("Prioriade é obrigatória"),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (FormData) => {
        FormData["currentState"] = 1;
        FormData["userId"] = userId;
        FormData["departmentId"] = departmentId;
        FormData["organizationId"] = organizationId;
        mutate(FormData)
        setOpen(false);
    };

    useEffect(() => {
        setUserType(localStorage.getItem("USER_TYPE"));
        setUserId(localStorage.getItem("USER_ID"));
        setOrganizationId(localStorage.getItem("ORGANIZATION_ID"));
        setDepartmentId(localStorage.getItem("DEPARTMENT_ID"));
    }, []);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FormContainer defaultValues={{}} resolver={yupResolver(schema)} onSuccess={(FormData) => handleSubmit(FormData)}>
                    <DialogTitle>Cadastrar usuário</DialogTitle>
                    <DialogContent>
                        {/* 
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates occasionally.
                        </DialogContentText> */}

                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 1, mb: 1 }} spacing={3} direction="row">
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Descrição" name="longDescription" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Resumo" name="shortDescription" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement type={"number"} fullWidth label="Prioridade" name="priority" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">Criar</Button>
                    </DialogActions>
                </FormContainer>
            </Dialog>
        </div>
    );
}

import react, { useContext, useState } from "react";
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
import createOrganization from "../../../../services/organization/createOrganization";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function CreateOrganizationForm({ open, setOpen }) {
    const MySwal = withReactContent(Swal);
    const { selectedOrganization, setSelectedOrganizaton } = useContext(OrganizationContext);

    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => createOrganization(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Organização cadastrada com sucesso", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao cadastrar a organização", "", "error");
        },
    });

    const OrganizationTypes = [
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
        email: yup.string().email("Formato inválido!").required("E-mail é obrigatório"),
        cnpj: yup.string().length(14, 'Deve ter 14 caracteres').required("CNPJ é obrigatório!"),
        cellphone: yup.string().length(11, 'Deve ter 11 caracteres').required("Telefone é obrigatório!"),
        name: yup.string().max(45, 'Máximo 45 caracteres').required("Nome é obrigatório!"),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (FormData) => {
        mutate(FormData);
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FormContainer defaultValues={{}} resolver={yupResolver(schema)} onSuccess={(FormData) => handleSubmit(FormData)}>
                    <DialogTitle>Cadastrar Organização</DialogTitle>
                    <DialogContent>
                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 1, mb: 1 }} spacing={3} direction="row">
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="E-mail" name="email" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Nome" name="name" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="CNPJ" name="cnpj" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Telefone" name="cellphone" />
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

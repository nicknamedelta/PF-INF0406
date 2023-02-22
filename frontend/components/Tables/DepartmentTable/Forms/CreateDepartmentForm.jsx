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
import createDepartment from "../../../../services/department/createDepartment";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function CreateDepartmentForm({ open, setOpen }) {
    const MySwal = withReactContent(Swal);
    const { selectedOrganization, setSelectedOrganizaton } = useContext(OrganizationContext);

    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => createDepartment(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Departamento cadastrado com sucesso", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao cadastrar o departamento", "", "error");
        },
    });

    const schema = yup.object().shape({
        abbreviation: yup.string().required("Abreviação"),
        name: yup.string().min(6, 'Mínimo 6 caracteres').max(45, 'Máximo 45 caracteres').required("Nome é obrigatório!"),
        organizationId: yup.string().required("Organização é obrigatória!"),
        place: yup.string().required("Localização é obrigatória!"),
        priority: yup.number("Deve ser numérico").required("Prioriade é obrigatória"),
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
                    <DialogTitle>Cadastrar departamento</DialogTitle>
                    <DialogContent>
                        {/* 
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates occasionally.
                        </DialogContentText> */}

                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 1, mb: 1 }} spacing={3} direction="row">
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Nome" name="name" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Abreviação" name="abbreviation" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement type={'number'} fullWidth label="Prioridade" name="priority" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Localização" name="place" />
                            </Grid>
                            <Grid item md={10}>
                                <SelectOrganization name="organizationId" label="Organização" />
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

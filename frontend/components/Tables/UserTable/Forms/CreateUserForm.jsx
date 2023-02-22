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
import createUser from "../../../../services/user/createUser";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function CreateUserForm({ open, setOpen }) {
    const MySwal = withReactContent(Swal);
    const { selectedOrganization, setSelectedOrganizaton } = useContext(OrganizationContext);

    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => createUser(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Usuário cadastrado com sucesso", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao cadastrar o usuário", "", "error");
        },
    });

    const userTypes = [
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
        password: yup.string().required("Senha é obrigatória!"),
        role: yup.string().min(6, 'mínimo 6 caracteres!').required("Cargo é obrigatório!"),
        name: yup.string().required("Nome é obrigatório!"),
        departmentId: yup.string().required("Departamento é obrigatório!"),
        organizationId: yup.string().required("Organização é obrigatória!"),
        userType: yup.string().required("Tipo de usuário é obrigatório!"),
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
                    <DialogTitle>Cadastrar usuário</DialogTitle>
                    <DialogContent>{/* 
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates occasionally.
                        </DialogContentText> */}

                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 1, mb: 1 }} spacing={3} direction="row">
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="E-mail" name="email" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Nome" name="name" />
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="Cargo" name="role" />
                            </Grid>
                            <Grid item md={10}>
                                <SelectElement name="userType" label="Tipo de usuário" options={userTypes} sx={{ width: "100%" }} type="string" />
                            </Grid>

                            <Grid item md={10}>
                                <SelectOrganization name="organizationId" label="Organização" />
                            </Grid>
                            {selectedOrganization && (
                                <Grid item md={10}>
                                    <SelectDepartment name="departmentId" label="Departamento" />
                                </Grid>
                            )}

                            <Grid item md={10}>
                                <PasswordElement sx={{ width: "100%" }} label={"Senha"} name={"password"} />
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

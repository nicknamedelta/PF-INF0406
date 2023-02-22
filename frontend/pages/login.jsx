import React, { useEffect } from "react";
import { FormContainer, PasswordElement, TextFieldElement } from "react-hook-form-mui";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, FormControl, Grid, Paper, Typography } from "@mui/material";
import loginToAccount from "../services/user/loginToAccount";
import { useMutation } from "react-query";
import { Container } from "@mui/system";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
    const [token, setToken] = React.useState();
    const [userId, setUserId] = React.useState();
    const [userType, setUserType] = React.useState();
    const [departmentId, setDepartmentId] = React.useState();
    const [oganizationId, setOrganizationId] = React.useState();
    const router = useRouter();

    const schema = yup.object().shape({
        email: yup.string().email('Formato inválido!').required("E-mail é obrigatório"),
        password: yup.string().required("Senha é obrigatória"),
    });

    const MySwal = withReactContent(Swal);
    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => loginToAccount(FormData), {
        onSuccess: async (data) => {
            /*  MySwal.hideLoading();
            MySwal.close(); */
            console.log(data)
            setToken(data.token);
            setUserId(data.id);
            setUserType(data.userType);
            setDepartmentId(data.departmentId);
            setOrganizationId(data.organizationId);
            router.push("/");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao realizar o login", "", "error");
        },
    });

    useEffect(() => {
        localStorage.setItem("JWT_TOKEN", token);
        localStorage.setItem("USER_TYPE", userType);
        localStorage.setItem("USER_ID", userId);
        localStorage.setItem("DEPARTMENT_ID", departmentId);
        localStorage.setItem("ORGANIZATION_ID", oganizationId);
        axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    }, [token]);

    const handleSubmit = (FormData) => {
        /* MySwal.fire("Carregando dados", "");
        MySwal.showLoading(); */
        mutate(FormData);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <Paper sx={{ minWidth: "400px" }} elevation={16}>
                    <FormContainer defaultValues={{}} resolver={yupResolver(schema)} onSuccess={(FormData) => handleSubmit(FormData)}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 1, mb: 1 }} spacing={3} direction="row">
                            <Grid item md={10} sx={{ textAlign: "center" }}>
                                <Typography>Login</Typography>
                            </Grid>
                            <Grid item md={10}>
                                <TextFieldElement fullWidth label="E-mail" name="email" />
                            </Grid>
                            <Grid item md={10}>
                                <PasswordElement sx={{ width: "100%" }} label={"Senha"} name={"password"} />
                            </Grid>
                            <Grid item md={10} sx={{ display: "flex", justifyContent: "right" }}>
                                <Button type="submit" variant="contained">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </FormContainer>
                </Paper>
            </Container>
        </Box>
    );
}

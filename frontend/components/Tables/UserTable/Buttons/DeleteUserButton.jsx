import { IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "react-query";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteUser from "../../../../services/user/deleteUser";

const MySwal = withReactContent(Swal);

export default function DeleteUserButton({ params }) {
    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => deleteUser(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Usuário excluído com sucesso!", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao deletar o usuário", "", "error");
        },
    });

    const handleDelete = (params) => {
        MySwal.fire({ title: "Deseja excluir esse usuário?", icon: "question", showCancelButton: true, showConfirmButton: true }).then((result) => {
            if (result.isConfirmed) {
                mutate(params.row.email);
            }
        });
    };

    return (
        <>
            <IconButton size="large" aria-label="excluir" onClick={() => handleDelete(params)}>
                <DeleteIcon style={{ color: "#f44336" }}></DeleteIcon>
            </IconButton>
        </>
    );
}

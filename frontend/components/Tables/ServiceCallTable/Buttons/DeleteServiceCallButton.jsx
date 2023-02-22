import { IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "react-query";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteServiceCall from "../../../../services/service_call/deleteServiceCall";

const MySwal = withReactContent(Swal);

export default function DeleteServiceCallButton({ params }) {
    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => deleteServiceCall(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Chamado excluído com sucesso!", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao deletar o chamado", "", "error");
        },
    });

    const handleDelete = (params) => {
        MySwal.fire({ title: "Deseja excluir esse chamado?", icon: "question", showCancelButton: true, showConfirmButton: true }).then((result) => {
            if (result.isConfirmed) {
                mutate(params.row.id);
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

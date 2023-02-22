import { IconButton } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useMutation, useQuery } from "react-query";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteServiceCall from "../../../../services/service_call/deleteServiceCall";

const MySwal = withReactContent(Swal);

export default function DeleteServiceCallButton({ params }) {
    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => deleteServiceCall(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Chamado finalizado com sucesso!", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao finalizar o chamado", "", "error");
        },
    });

    const handleDelete = (params) => {
        MySwal.fire({ title: "Deseja finalizado esse chamado?", icon: "question", showCancelButton: true, showConfirmButton: true }).then((result) => {
            if (result.isConfirmed) {
                mutate(params.row.id);
            }
        });
    };

    return (
        <>
            <IconButton size="large" aria-label="excluir" onClick={() => handleDelete(params)}>
                <DoneIcon style={{ color: "#64f461" }}></DoneIcon>
            </IconButton>
        </>
    );
}

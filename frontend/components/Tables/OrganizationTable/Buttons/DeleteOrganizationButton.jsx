import { IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "react-query";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteOrganization from "../../../../services/organization/deleteOrganization";

const MySwal = withReactContent(Swal);

export default function DeleteOrganizationButton({ params }) {
    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => deleteOrganization(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Organização excluída com sucesso!", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao deletar o a organização", "", "error");
        },
    });

    const handleDelete = (params) => {
        MySwal.fire({ title: "Deseja excluir essa organização?", icon: "question", showCancelButton: true, showConfirmButton: true }).then((result) => {
            if (result.isConfirmed) {
                mutate(params.row.cnpj);
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

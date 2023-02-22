import { IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "react-query";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteDepartment from "../../../../services/department/deleteDepartment";

const MySwal = withReactContent(Swal);

export default function DeleteDepartmentButton({ params }) {
    const { mutate, isLoading, error, data, isSuccess } = useMutation((FormData) => deleteDepartment(FormData), {
        onSuccess: async (data) => {
            MySwal.fire("Departamento excluído com sucesso!", "", "success");
        },
        onError: (error) => {
            MySwal.fire("Ocorreu um erro ao deletar o departamento", "", "error");
        },
    });

    const handleDelete = (params) => {
        MySwal.fire({ title: "Deseja excluir esse departamento?", icon: "question", showCancelButton: true, showConfirmButton: true }).then((result) => {
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

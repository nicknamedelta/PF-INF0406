import { AutocompleteElement, DatePickerElement, FormContainer, TextFieldElement } from "react-hook-form-mui";
import { LocalizationProvider, AdapterDateFns } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DateFnsUtils from "@date-io/date-fns";
const schema = yup.object().shape({
    name: yup.string().required(),
});

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Submit = (data) => {
    console.log(process.env.API_URL);
    MySwal.fire({ title: "<p>Shorthand works too</p>", showDenyButton: true, showCancelButton: true }).then((result) => {
        if (result.isConfirmed) {
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "error");
        }
    });
};

const Teste = () => {
    return (
        <FormContainer resolver={yupResolver(schema)} defaultValues={{ name: "" }} onSuccess={(data) => Submit(data)}>
            <TextFieldElement name="name" label="Name" />

            <DatePickerElement name="date" label="Date" inputFormat="dd/MM/yyyy" />
            <AutocompleteElement
                label="Multiple Required Custom"
                multiple
                name="multi_required_custom"
                options={[
                    {
                        id: 1,
                        label: "First",
                    },
                    {
                        id: 2,
                        label: "Second",
                    },
                    {
                        id: 3,
                        label: "Third",
                    },
                    {
                        id: 4,
                        label: "Four",
                    },
                ]}
                rules={{
                    required: "Please fill out.",
                }}
            />
            <Button type="submit">submit</Button>
        </FormContainer>
    );
};
export default Teste;

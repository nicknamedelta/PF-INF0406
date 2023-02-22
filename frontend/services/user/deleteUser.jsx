import axios from "axios";

const deleteOrganization = async (FormData) => {
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/organization/delete/${FormData}`);
    return data;
};

export default deleteOrganization;

import axios from "axios";

const createDepartment = async (FormData) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/department/create`, FormData);
    return data;
};

export default createDepartment;

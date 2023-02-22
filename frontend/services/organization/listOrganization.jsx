import axios from "axios";

const listDepartment = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organization/all`);
    return data;
};
export default listDepartment;

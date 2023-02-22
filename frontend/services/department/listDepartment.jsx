import axios from "axios";

const listOrganizations = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/department/all`);
    return data;
};
export default listOrganizations;

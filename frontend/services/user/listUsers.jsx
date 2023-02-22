import axios from "axios";

const listUsers = async () => {
    const { data, error } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all`);
    return data;
};
export default listUsers;

import axios from "axios";

const createUser = async (FormData) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, FormData);
    return data;
};

export default createUser;

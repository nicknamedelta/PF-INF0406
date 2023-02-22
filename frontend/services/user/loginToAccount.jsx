import axios from "axios";

const loginToAccount = async (FormData) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, FormData);
    return data;
};

export default loginToAccount;

import axios from "axios";

const createServiceCall = async (FormData) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/service-call/create`, FormData);
    return data;
};

export default createServiceCall;

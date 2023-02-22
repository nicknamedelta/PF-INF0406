import axios from "axios";

const listServiceCall = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service-call/all`);
    return data;
};
export default listServiceCall;

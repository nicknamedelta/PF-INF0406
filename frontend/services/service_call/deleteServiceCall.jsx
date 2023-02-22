import axios from "axios";

const deleteServiceCall = async (FormData) => {
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/service-call/delete/${FormData}`);
    return data;
};

export default deleteServiceCall;

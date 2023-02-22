import axios from "axios";

const listServiceCallByUser = async (UserId) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service-call/user/${UserId}/all`);
    return data;
};
export default listServiceCallByUser;

import axios from "axios";

const deleteDepartment = async (FormData) => {
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/department/delete/${FormData}`);
    return data;
};

export default deleteDepartment;

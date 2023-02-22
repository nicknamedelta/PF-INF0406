import axios from "axios";

const listDepartmentByOrganization = async (DepartmentId) => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/department/organization/${DepartmentId}`);
};
export default listDepartmentByOrganization;

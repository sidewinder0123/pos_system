import AxiosInstance from "../AxiosInstance";

const RoleService = {
  loadRoles: async () => {
    return AxiosInstance.get("/loadRoles")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  getRole: async (RoleId: number) => {
    return AxiosInstance.get(`/getRole/${RoleId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  storeRole: async (data: any) => {
    return AxiosInstance.post("/storeRole", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  updateRole: async (RoleId: number, data: any) => {
    return AxiosInstance.put(`/updateRole/${RoleId}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  destroyRole: async (RoleId: number) => {
    return AxiosInstance.put(`/destroyRole/${RoleId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default RoleService;

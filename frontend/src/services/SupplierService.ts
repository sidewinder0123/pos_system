import AxiosInstance from "../AxiosInstance";

const SupplierService = {
  loadSuppliers: async () => {
    return AxiosInstance.get("/loadSuppliers")
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  storeSupplier: async (data: any) => {
    return AxiosInstance.post("/storeSupplier", data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  updateSupplier: async (supplierId: number, data: any) => {
    return AxiosInstance.put(`/updateSupplier/${supplierId}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  destroySupplier: async (supplierId: number) => {
    return AxiosInstance.delete(`/destroySupplier/${supplierId}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default SupplierService;

import { useState } from "react";
import AddSupplierModal from "../../components/modals/supplier/AddSupplierModal";
import MainLayout from "../layout/MainLayout";
import SupplierTables from "../../components/tables/supplier/SupplierTables";
import EditSupplierModal from "../../components/modals/supplier/EditSupplierModel";
import type { Suppliers } from "../../interfaces/Suppliers";
import DeleteSupplierModal from "../../components/modals/supplier/DeleteSupplierModal";

const SuppliersPage = () => {
  const [refreshSuppliers, setRefreshSuppliers] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Suppliers | null>(
    null
  );
  const [openAddSupplierModal, setOpenAddSupplierModal] = useState(false);
  const [openEditSupplierModal, setOpenEditSupplierModal] = useState(false);
  const [openDeleteSupplierModal, setOpenDeleteSupplierModal] = useState(false);

  const handleOpenEditSupplierModal = (supplier: Suppliers) => {
    setSelectedSupplier(supplier);
    setOpenEditSupplierModal(true);
  };

  const handleCloseEditSupplierModal = () => {
    setSelectedSupplier(null);
    setOpenEditSupplierModal(false);
  };

  const handleOpenDeleteSupplierModal = (supplier: Suppliers) => {
    setSelectedSupplier(supplier);
    setOpenDeleteSupplierModal(true);
  };

  const handleCloseDeleteSupplierModal = () => {
    setSelectedSupplier(null);
    setOpenDeleteSupplierModal(false);
  };

  const content = (
    <>
      <AddSupplierModal
        showModal={openAddSupplierModal}
        onRefreshSuppliers={() => setRefreshSuppliers(!refreshSuppliers)}
        onClose={() => setOpenAddSupplierModal(false)}
      />
      <EditSupplierModal
        showModal={openEditSupplierModal}
        supplier={selectedSupplier}
        onRefreshSuppliers={() => setRefreshSuppliers(!refreshSuppliers)}
        onClose={handleCloseEditSupplierModal}
      />
      <DeleteSupplierModal
        showModal={openDeleteSupplierModal}
        supplier={selectedSupplier}
        onRefreshSuppliers={() => setRefreshSuppliers(!refreshSuppliers)}
        onClose={handleCloseDeleteSupplierModal}
      />
      <div className="d-flex justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setOpenAddSupplierModal(true)}
        >
          Add Supplier
        </button>
      </div>
      <SupplierTables
        refreshSuppliers={refreshSuppliers}
        onEditSupplier={handleOpenEditSupplierModal}
        onDeleteSupplier={handleOpenDeleteSupplierModal}
      />
    </>
  );

  return <MainLayout content={content} />;
};

export default SuppliersPage;

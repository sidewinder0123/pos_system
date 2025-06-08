import { useEffect, useState } from "react";
import { Suppliers } from "../../../interfaces/Suppliers";
import SupplierService from "../../../services/SupplierService";
import ErrorHandler from "../../../handler/ErrorHandler";
import Spinner from "../../Spinner";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface SupplierTablesProps {
  refreshSuppliers: boolean;
  onEditSupplier: (supplier: Suppliers) => void;
  onDeleteSupplier: (supplier: Suppliers) => void;
}

const SupplierTables = ({
  refreshSuppliers,
  onEditSupplier,
  onDeleteSupplier,
}: SupplierTablesProps) => {
  const [state, setState] = useState({
    loadingSuppliers: true,
    suppliers: [] as Suppliers[],
  });

  const handleLoadSuppliers = () => {
    SupplierService.loadSuppliers()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            suppliers: res.data.suppliers,
          }));
        } else {
          console.error(
            "Unexpected status error while loading suppliers: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingSuppliers: false,
        }));
      });
  };

  useEffect(() => {
    handleLoadSuppliers();
  }, [refreshSuppliers]);

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col" style={{ width: "5%" }}>
              #
            </th>
            <th scope="col">Supplier Name</th>
            <th scope="col">Contact Person</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col" style={{ width: "15%" }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {state.loadingSuppliers ? (
            <tr>
              <td colSpan={7} className="text-center py-5">
                <Spinner />
              </td>
            </tr>
          ) : state.suppliers.length > 0 ? (
            state.suppliers.map((supplier, index) => (
              <tr
                key={supplier.supplier_id ?? index}
                className="cursor-pointer"
              >
                <td>{index + 1}</td>
                <td>{supplier.supplier_name}</td>
                <td>{supplier.contact_person}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td className="text-center">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Supplier actions"
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      title="Edit Supplier"
                      onClick={() => onEditSupplier(supplier)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      title="Delete Supplier"
                      onClick={() => onDeleteSupplier(supplier)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center py-4 text-muted fst-italic"
              >
                No Suppliers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTables;

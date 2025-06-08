import React, { FormEvent, useEffect, useRef, useState } from "react";
import SupplierService from "../../../services/SupplierService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Suppliers } from "../../../interfaces/Suppliers";

interface DeleteSupplierFormProps {
  supplier: Suppliers | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingDestroy: (loading: boolean) => void;
  onDeletedSupplier: (message: string) => void;
}

const DeleteSupplierForm = ({
  supplier,
  setSubmitForm,
  setLoadingDestroy,
  onDeletedSupplier,
}: DeleteSupplierFormProps) => {
  const [state, setState] = useState({
    supplier_id: 0,
    supplier_name: "",
  });

  const handleDestroySupplier = (e: FormEvent) => {
    e.preventDefault();

    setLoadingDestroy(true);

    SupplierService.destroySupplier(state.supplier_id)
      .then((res) => {
        if (res.status === 200) {
          onDeletedSupplier(res.data.message);
        } else {
          console.error(
            "Unexpected status error while destroying supplier: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setLoadingDestroy(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (supplier) {
      setState((prevState) => ({
        ...prevState,
        supplier_id: supplier.supplier_id,
        supplier_name: supplier.supplier_name,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        supplier_id: 0,
        supplier_name: "",
      }));
    }

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [supplier, setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleDestroySupplier}>
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="supplier_name">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="supplier_name"
                  id="supplier_name"
                  value={state.supplier_name}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeleteSupplierForm;

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import SupplierService from "../../../services/SupplierService";
import { SupplierFieldErrors } from "../../../interfaces/SupplierFieldErrors";

interface AddSupplierFormProps {
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingStore: (loading: boolean) => void;
  onSupplierAdded: (message: string) => void;
}

const AddSupplierForm = ({
  setSubmitForm,
  setLoadingStore,
  onSupplierAdded,
}: AddSupplierFormProps) => {
  const [state, setState] = useState({
    supplier_id: 0,
    supplier_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    errors: {} as SupplierFieldErrors,
  });

  const handleResetNecessaryFields = () => {
    setState((prevState) => ({
      ...prevState,
      supplier_name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
      errors: {} as SupplierFieldErrors,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStoreSupplier = (e: FormEvent) => {
    e.preventDefault();

    setLoadingStore(true);

    SupplierService.storeSupplier(state)
      .then((res) => {
        if (res.status === 200) {
          handleResetNecessaryFields();
          onSupplierAdded(res.data.message);
        } else {
          console.error(
            "Unexpected status error while storing supplier: ",
            res.status
          );
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setLoadingStore(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleStoreSupplier}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="supplier_name">Supplier Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.supplier_name ? "is-invalid" : ""
                }`}
                name="supplier_name"
                id="supplier_name"
                value={state.supplier_name}
                onChange={handleInputChange}
              />
              {state.errors.supplier_name && (
                <span className="text-danger">
                  {state.errors.supplier_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contact_person">Contact Person</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.contact_person ? "is-invalid" : ""
                }`}
                name="contact_person"
                id="contact_person"
                value={state.contact_person}
                onChange={handleInputChange}
              />
              {state.errors.contact_person && (
                <span className="text-danger">
                  {state.errors.contact_person[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control ${
                  state.errors.email ? "is-invalid" : ""
                }`}
                name="email"
                id="email"
                value={state.email}
                onChange={handleInputChange}
              />
              {state.errors.email && (
                <span className="text-danger">{state.errors.email[0]}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.phone ? "is-invalid" : ""
                }`}
                name="phone"
                id="phone"
                value={state.phone}
                onChange={handleInputChange}
              />
              {state.errors.phone && (
                <span className="text-danger">{state.errors.phone[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <textarea
                className={`form-control ${
                  state.errors.address ? "is-invalid" : ""
                }`}
                name="address"
                id="address"
                value={state.address}
                onChange={handleInputChange}
                rows={3}
              />
              {state.errors.address && (
                <span className="text-danger">{state.errors.address[0]}</span>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddSupplierForm;

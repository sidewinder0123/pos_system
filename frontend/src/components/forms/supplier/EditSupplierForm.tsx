import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SupplierFieldErrors } from "../../../interfaces/SupplierFieldErrors";
import SupplierService from "../../../services/SupplierService";
import ErrorHandler from "../../../handler/ErrorHandler";
import { Suppliers } from "../../../interfaces/Suppliers";

interface EditSupplierFormProps {
  supplier: Suppliers | null;
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingUpdate: (loading: boolean) => void;
  onSupplierUpdated: (message: string) => void;
}

const EditSupplierForm = ({
  supplier,
  setSubmitForm,
  setLoadingUpdate,
  onSupplierUpdated,
}: EditSupplierFormProps) => {
  const [state, setState] = useState({
    supplier_id: 0,
    supplier_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    errors: {} as SupplierFieldErrors,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateSupplier = (e: FormEvent) => {
    e.preventDefault();

    setLoadingUpdate(true);

    SupplierService.updateSupplier(state.supplier_id, state)
      .then((res) => {
        if (res.status === 200) {
          onSupplierUpdated(res.data.message);
        } else {
          console.error(
            "Unexpected status error while updating supplier: ",
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
        setLoadingUpdate(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (supplier) {
      setState((prevState) => ({
        ...prevState,
        supplier_id: supplier.supplier_id,
        supplier_name: supplier.supplier_name,
        contact_person: supplier.contact_person,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        errors: {} as SupplierFieldErrors,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        supplier_id: 0,
        supplier_name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
        errors: {} as SupplierFieldErrors,
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
      <form ref={formRef} onSubmit={handleUpdateSupplier}>
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

export default EditSupplierForm;
